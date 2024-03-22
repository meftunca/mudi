import merge from "lodash/merge";
import { useMemo } from "react";
// @mui
import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  ThemeOptions,
} from "@mui/material/styles";
// locales
import { useLocales } from "../locales";
// components
import { useSettingsContext } from "../settings";
// system
import { customShadows } from "./custom-shadows";
import { componentsOverrides } from "./overrides";
import { palette } from "./palette";
import { shadows } from "./shadows";
import { typography } from "./typography";
// options
import { GlobalStyles } from "@mui/material";
import { contrast } from "./options/contrast";
import { darkMode } from "./options/dark-mode";
import { presets } from "./options/presets";
import RTL, { direction } from "./options/right-to-left";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const { currentLang } = useLocales();

  const settings = useSettingsContext();
  const darkModeOption = darkMode(settings.themeMode);

  const presetsOption = presets(settings.themeColorPresets || "default");

  const contrastOption = contrast(
    settings.themeContrast === "bold",
    settings.themeMode
  );

  const directionOption = direction(settings.themeDirection);

  const baseOption = useMemo(
    () => ({
      palette: palette("light"),
      shadows: shadows("light"),
      customShadows: customShadows("light"),
      typography,
      shape: { borderRadius: 8 },
    }),
    []
  );

  const memoizedValue = useMemo(
    () =>
      merge(
        // Base
        baseOption,
        // Direction: remove if not in use
        directionOption,
        // Dark mode: remove if not in use
        darkModeOption,
        // Presets: remove if not in use
        presetsOption,
        // Contrast: remove if not in use
        contrastOption.theme
      ),
    [
      baseOption,
      directionOption,
      darkModeOption,
      presetsOption,
      contrastOption.theme,
    ]
  );

  const theme = createTheme(memoizedValue as ThemeOptions);

  theme.components = merge(
    componentsOverrides(theme),
    contrastOption.components
  );

  const themeWithLocale = useMemo(
    () => createTheme(theme, currentLang.systemValue),
    [currentLang.systemValue, theme]
  );

  return (
    <MuiThemeProvider theme={themeWithLocale}>
      <RTL themeDirection={settings.themeDirection}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            "*": {
              "::-webkit-scrollbar": {
                width: "6px",
                height: "8px",
              },
              "::-webkit-scrollbar-track": {
                boxShadow: "inset 0 0 6px grey",
                borderRadius: "5px",
              },
              "::-webkit-scrollbar-thumb": {
                background:
                  themeWithLocale.palette.primary[
                    themeWithLocale.palette.mode === "light" ? "dark" : "light"
                  ],
                borderRadius: "15px",
                height: "2px",
              },
              "::-webkit-scrollbar-thumb:hover": {
                background:
                  themeWithLocale.palette.primary[
                    themeWithLocale.palette.mode === "light"
                      ? "darker"
                      : "lighter"
                  ],
                maxHeight: "10px",
              },
              "::-webkit-scrollbar-button:vertical:start:decrement": {
                display: "block",
                backgroundSize: "10px",
              },
              "::-webkit-scrollbar-button:vertical:end:increment": {
                display: "block",
                backgroundSize: "10px",
              },
            },
          }}
        />
        {children}
      </RTL>
    </MuiThemeProvider>
  );
}
