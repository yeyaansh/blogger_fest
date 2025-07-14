import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter, Route, Routes } from "react-router";
import NoPage from "./components/pages/NoPage.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>

          <Route path="*" element={<App></App>}/>
          
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
