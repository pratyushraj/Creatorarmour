import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";

// Handle chunk loading errors by reloading the page
window.addEventListener('vite:preloadError', (event) => {
  console.error('Vite preload error detected, reloading page...', event);
  window.location.reload();
});

createRoot(document.getElementById("root")!).render(<App />);
