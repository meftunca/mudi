import Page from "@/Core/Page";
import RouterProvider from "@/Core/RouterProvider";
import DashboardLayout from "@/Core/layouts/dashboard/layout";
import SettingsDrawer from "@/Core/settings/drawer";
import { styled } from "@mui/material";
import MuiAppBar, { AppBarProps } from "@mui/material/AppBar";
import * as React from "react";
import { useRouteLinks } from "./RouteLinks";
import { usePageController } from "./pageController";

const drawerWidth = 280;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactNode;
  noPadding?: boolean;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop: string) => prop !== "open",
})<AppBarProps & { open: boolean }>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const PageWrapper: React.FC<Props> = (props) => {
  const [open, setOpen] = React.useState(true);
  const { title } = usePageController();
  const routeLinks = useRouteLinks();
  const handleDrawerToggle = () => {
    setOpen((f) => !f);
  };
  return (
    <RouterProvider defaultValue={routeLinks}>
      <SettingsDrawer />
      <DashboardLayout>
      {props.children}
      </DashboardLayout>
    </RouterProvider>
  );

};

export default PageWrapper;
