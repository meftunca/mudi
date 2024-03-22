import { createContext, useContext, useState } from "react";

export type NavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  info?: JSX.Element;
  disabled?: boolean;
  caption?: string;
  children?: Omit<NavItem,"icon">[];
  roles?: string[];
};

export type NavigationSystem = {
  subheader: string;
  items: NavItem[];
};
export type ContextType = {
  items: NavigationSystem[];
  append: (navigationSystem: NavigationSystem) => void;
  prepend: (navigationSystem: NavigationSystem) => void;
  sortAZ: (az: boolean) => void;
};
const defaultNavigationSystem: NavigationSystem[] = [];

const InitialContext = {
  items: defaultNavigationSystem,
  append: (navigationSystem: NavigationSystem) => {},
  prepend: (navigationSystem: NavigationSystem) => {},
  sortAZ: (az: boolean) => {},
};
const context = createContext<ContextType>(InitialContext);

export const NavigationProvider = ({
  children,
  defaultValue = [],
}: {
  children: React.ReactNode;
  defaultValue: NavigationSystem[];
}) => {
  const [routes, setRoutes] = useState<NavigationSystem[]>(defaultValue);
  const navigationSystem = {
    items: routes,
    append: (navigationSystem: NavigationSystem) => {
      setRoutes((routes) => [...routes, navigationSystem]);
    },
    prepend: (navigationSystem: NavigationSystem) => {
      setRoutes((routes) => [navigationSystem, ...routes]);
    },
    sortAZ: (az: boolean) => {
      setRoutes((routes) => {
        const newRoutes = [...routes];
        newRoutes.sort((a, b) => {
          if (a.subheader < b.subheader) {
            return az ? -1 : 1;
          }
          if (a.subheader > b.subheader) {
            return az ? 1 : -1;
          }
          return 0;
        });
        return newRoutes;
      });
    },
  };
  return (
    <context.Provider value={navigationSystem}>{children}</context.Provider>
  );
};

export const useNavigationContext = () => {
  const navigationContext = useContext(context);
  return navigationContext;
};

export const useNavData = () => {
  const { items } = useNavigationContext();
  return items;
};

export default NavigationProvider;
