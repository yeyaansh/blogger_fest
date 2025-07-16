import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import stores from "../redux/stores.js";
import { Provider} from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={stores}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<App></App>} />
          </Routes>
        </BrowserRouter>
    </Provider>
  </StrictMode>
);
