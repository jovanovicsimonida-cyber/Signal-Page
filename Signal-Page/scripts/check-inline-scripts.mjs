import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p) => path.resolve(__dirname, "..", p);

// Files under client/public are copied to the output byte for byte. Nothing
// parses them: tsconfig only includes client/src and api, Vite does not touch
// public assets, and a syntax error in an inline script is discarded silently
// by the browser, taking every function in that block with it. The page still
// renders, so a dead tool looks identical to a working one and deploys green.
//
// This happened. c7a7307, 23 March 2026: a quoted font name inside a
// single-quoted w.document.write() string ended the string early and killed
// option selection on the live leak finder. The response then was a rule in
// CLAUDE.md asking future sessions to be careful, which only works when
// everyone remembers. This checks it instead.
//
// Runs over the built output rather than the sources, so it also covers the
// JSON-LD that react-helmet-async injects during prerender.
const ROOT = resolve("dist/public");

// Mirrors how a browser finds the end of a block: an escaped <\/script> does
// not close it, which is exactly why the leak finder writes it that way.
const SCRIPT_RE = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
const SRC_RE = /\bsrc\s*=/i;
const TYPE_RE = /\btype\s*=\s*["']([^"']+)["']/i;

const JS_TYPES = new Set(["", "module", "text/javascript", "application/javascript"]);

function htmlFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...htmlFiles(full));
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

function lineOf(text, index) {
  let line = 1;
  for (let i = 0; i < index; i++) if (text[i] === "\n") line++;
  return line;
}

function checkFile(file) {
  const html = fs.readFileSync(file, "utf-8");
  const rel = path.relative(resolve("."), file);
  const failures = [];
  let checked = 0;

  for (const match of html.matchAll(SCRIPT_RE)) {
    const [, attrs, body] = match;
    // External scripts have nothing inline to parse.
    if (SRC_RE.test(attrs)) continue;
    if (!body.trim()) continue;

    const type = (attrs.match(TYPE_RE)?.[1] || "").toLowerCase();
    const line = lineOf(html, match.index);
    checked++;

    if (type === "application/ld+json") {
      try {
        JSON.parse(body);
      } catch (err) {
        failures.push({ line, kind: "JSON-LD", message: err.message });
      }
      continue;
    }

    if (!JS_TYPES.has(type)) continue;

    try {
      // Compiles without running, so a syntax error throws while none of the
      // page's own side effects happen here.
      new vm.Script(body, { filename: `${rel}:${line}` });
    } catch (err) {
      failures.push({ line, kind: "inline script", message: err.message });
    }
  }

  return { rel, checked, failures };
}

if (!fs.existsSync(ROOT)) {
  console.error(`No build output at ${ROOT}. Run the build first.`);
  process.exit(1);
}

const results = htmlFiles(ROOT).map(checkFile);
const broken = results.filter((r) => r.failures.length > 0);
const blocks = results.reduce((n, r) => n + r.checked, 0);

if (broken.length === 0) {
  console.log(`Inline scripts OK: ${blocks} blocks across ${results.length} HTML files.`);
  process.exit(0);
}

console.error(`\nInline script check FAILED\n`);
for (const { rel, failures } of broken) {
  for (const f of failures) {
    console.error(`  ${rel}`);
    console.error(`    ${f.kind} starting at line ${f.line}`);
    console.error(`    ${f.message}\n`);
  }
}
const kinds = new Set(broken.flatMap((r) => r.failures.map((f) => f.kind)));
if (kinds.has("inline script")) {
  console.error(
    "A script block that does not parse is dropped whole by the browser, so\n" +
    "every function it defines goes missing while the page still renders and\n" +
    "looks fine. Check for an unescaped quote inside a same-quoted string.\n"
  );
}
if (kinds.has("JSON-LD")) {
  console.error(
    "Invalid JSON-LD is ignored by crawlers, so the page keeps working and\n" +
    "silently loses its structured data. Check for a trailing comma.\n"
  );
}
process.exit(1);
