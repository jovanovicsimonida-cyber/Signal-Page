import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p) => path.resolve(__dirname, "..", p);

const routes = ["/", "/about", "/privacy", "/terms"];

async function prerender() {
  const templatePath = resolve("dist/public/index.html");
  console.log(`Reading template from: ${templatePath}`);
  console.log(`Template exists: ${fs.existsSync(templatePath)}`);

  const template = fs.readFileSync(templatePath, "utf-8");
  const hasPlaceholder = template.includes('<div id="root"></div>');
  console.log(`Template length: ${template.length}, has placeholder: ${hasPlaceholder}`);

  if (!hasPlaceholder) {
    throw new Error("Template missing <div id=\"root\"></div> placeholder");
  }

  const serverPath = resolve("dist/server/entry-server.js");
  console.log(`SSR bundle path: ${serverPath}`);
  console.log(`SSR bundle exists: ${fs.existsSync(serverPath)}`);

  const { render } = await import(serverPath);
  console.log(`render function loaded: ${typeof render}`);

  for (const url of routes) {
    const appHtml = render(url);
    console.log(`Rendered ${url}: ${appHtml.length} chars`);

    if (appHtml.length === 0) {
      console.warn(`WARNING: Empty render for ${url}`);
      continue;
    }

    const html = template.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    );

    if (url === "/") {
      fs.writeFileSync(templatePath, html);
      console.log(`Wrote ${html.length} chars to ${templatePath}`);
    } else {
      const dir = resolve(`dist/public${url}`);
      fs.mkdirSync(dir, { recursive: true });
      const filePath = path.join(dir, "index.html");
      fs.writeFileSync(filePath, html);
      console.log(`Wrote ${html.length} chars to ${filePath}`);
    }

    console.log(`Prerendered: ${url}`);
  }

  // Verify the homepage was actually modified
  const finalHtml = fs.readFileSync(templatePath, "utf-8");
  const stillEmpty = finalHtml.includes('<div id="root"></div>');
  console.log(`Final index.html length: ${finalHtml.length}, still empty root: ${stillEmpty}`);

  console.log("Prerendering complete.");
}

prerender().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
