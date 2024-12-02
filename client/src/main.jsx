import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { ThemePanel } from "@radix-ui/themes";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Theme accentColor="plum" appearance="dark">
        <App />
        {/* <ThemePanel /> */}
      </Theme>
    </BrowserRouter>
  </StrictMode>
);
