import { hydrateRoot, createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = document.getElementById("root")!;

// If the page was prerendered (has child content), hydrate to preserve
// the existing DOM and attach event listeners. Otherwise, render fresh.
if (root.children.length > 0) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
