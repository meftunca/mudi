import isEqual from "lodash/isEqual";
import { useCallback, useEffect, useMemo, useState } from "react";
// hooks
import { useLocalStorage } from "../../hooks/use-local-storage";
// utils
//
import { SettingsValueProps } from "../types";
import { SettingsContext } from "./settings-context";

// ----------------------------------------------------------------------

type SettingsProviderProps = {
  children: React.ReactNode;
  defaultSettings: SettingsValueProps;
};

export const SettingsProvider = ({
  children,
  defaultSettings,
}: SettingsProviderProps) =>{
  const [openDrawer, setOpenDrawer] = useState(false);
  const [settings, setSettings] = useLocalStorage("settings", defaultSettings);

  // useEffect(() => {

  // }, []);
  const onUpdate = useCallback(
    (name: string, value: string | boolean) => {
      setSettings((prevState: SettingsValueProps) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [setSettings]
  );

  // Direction by lang
  const onChangeDirectionByLang = useCallback(
    (lang: string) => {
      onUpdate("themeDirection", lang === "ar" ? "rtl" : "ltr");
    },
    [onUpdate]
  );

  // Reset
  const onReset = useCallback(() => {
    setSettings(defaultSettings);
  }, [defaultSettings, setSettings]);

  // Drawer
  const onToggleDrawer = () => {
    setOpenDrawer((prev) => !prev);
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const canReset = !isEqual(settings, defaultSettings);
  const memoizedValue = useMemo(
    () => ({
      ...settings,
      onUpdate,
      // Direction
      onChangeDirectionByLang,
      // Reset
      canReset,
      onReset,
      // Drawer
      open: openDrawer,
      onToggle: onToggleDrawer,
      onClose: onCloseDrawer,
    }),
    [
      onReset,
      onUpdate,
      settings,
      canReset,
      openDrawer,
      onCloseDrawer,
      onToggleDrawer,
      onChangeDirectionByLang,
    ]
  );
  return (
    <SettingsContext.Provider value={memoizedValue}>
      {children}
    </SettingsContext.Provider>
  );
}
