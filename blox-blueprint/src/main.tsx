import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ExperienceProvider } from "./context/ExperienceContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ExperienceProvider>
          <App />
        </ExperienceProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
