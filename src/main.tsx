import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Box, CssBaseline, createTheme } from "@mui/material";
import ThemeProvider from "./Core/theme/index.tsx";
import { SettingsProvider } from "./Core/settings/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SettingsProvider
      defaultSettings={{
        themeMode: "dark", // 'light' | 'dark'
        themeDirection: "ltr", //  'rtl' | 'ltr'
        themeContrast: "default", // 'default' | 'bold'
        themeLayout: "vertical", // 'vertical' | 'horizontal' | 'mini'
        themeColorPresets: "default", // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
        themeStretch: true,
        themeCorner: "rounded", // 'rounded' | 'squared'
        themePaperVariant: "outlined",
        themeSpacing: "compact",
      }}
    >
      <ThemeProvider>
        <>
          <CssBaseline />
          <App />
        </>
      </ThemeProvider>
    </SettingsProvider>
  </React.StrictMode>
);
