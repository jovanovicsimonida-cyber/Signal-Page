import { hydrateRoot, createRoot } from "react-dom/client";
import { PostHogProvider } from "@posthog/react";
import App from "./App";
import "./index.css";

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: "2026-01-30",
} as const;

const root = document.getElementById("root")!;
const posthogToken = import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN;

const app = posthogToken ? (
  <PostHogProvider apiKey={posthogToken} options={options}>
    <App />
  </PostHogProvider>
) : (
  <App />
);

// If the page was prerendered (has child content), hydrate to preserve
// the existing DOM and attach event listeners. Otherwise, render fresh.
if (root.children.length > 0) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
