import { hydrateRoot, createRoot } from "react-dom/client";
import posthog from "posthog-js";
import App from "./App";
import "./index.css";

if (import.meta.env.VITE_POSTHOG_KEY) {
  posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_POSTHOG_HOST ?? "https://us.i.posthog.com",
    person_profiles: "identified_only",
  });
}

const root = document.getElementById("root")!;

// If the page was prerendered (has child content), hydrate to preserve
// the existing DOM and attach event listeners. Otherwise, render fresh.
if (root.children.length > 0) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
