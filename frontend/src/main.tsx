import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/global.css";
import { SidebarProvider } from "./context/SidebarContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SidebarProvider>
      <App />
    </SidebarProvider>
  </StrictMode>,
);
