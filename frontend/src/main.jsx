import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import stores from "../redux/stores.js";
import { Provider } from "react-redux";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter, Route, Routes } from "react-router";
import NoPage from "./components/pages/NoPage.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={stores}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<App></App>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
