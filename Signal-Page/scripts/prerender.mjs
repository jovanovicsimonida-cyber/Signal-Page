import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p) => path.resolve(__dirname, "..", p);

const routes = ["/", "/about", "/privacy", "/terms"];

async function prerender() {
  // Read the client-built HTML template
  const template = fs.readFileSync(resolve("dist/public/index.html"), "utf-8");

  // Import the SSR-built render function
  const { render } = await import(resolve("dist/server/entry-server.js"));

  for (const url of routes) {
    const appHtml = render(url);

    // Inject prerendered HTML into the template
    const html = template.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    );

    // Write to the correct path
    if (url === "/") {
      fs.writeFileSync(resolve("dist/public/index.html"), html);
    } else {
      const dir = resolve(`dist/public${url}`);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, "index.html"), html);
    }

    console.log(`Prerendered: ${url}`);
  }

  console.log("Prerendering complete.");
}

prerender().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
