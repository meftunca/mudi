import { useEffect } from "react";
// @mui
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
// hooks
import { useBoolean } from "@/Core/hooks/use-boolean";
// routes
import { usePathname } from "@/Core/hooks/use-pathname";
// components
// import Logo from "@/Core/Logo";
import SvgColor from "@/Core/SvgColor";
import Scrollbar from "@/Core/Scrollbar";
//
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { NavProps } from "../types";
import NavList from "./nav-list";
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

export default function NavMobile({ offsetTop, data }: NavProps) {
  const pathname = usePathname();

  const nav = useBoolean();

  useEffect(() => {
    if (nav.value) {
      nav.onFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <IconButton
        onClick={nav.onTrue}
        sx={{
          ml: 1,
          ...(offsetTop && {
            color: "text.primary",
          }),
        }}
      >
        {/* <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" /> */}
        <MenuOutlinedIcon />
      </IconButton>

      <Drawer
        open={nav.value}
        onClose={nav.onFalse}
        PaperProps={{
          sx: {
            pb: 5,
            width: 260,
          },
        }}
      >
        <Scrollbar>
          <Box component="img" sx={{ mx: 2.5, my: 3,width:64,height:"auto" }} />

          <List component="nav" disablePadding>
            {data.map((link) => (
              <NavList key={link.title} item={link} />
            ))}
          </List>
        </Scrollbar>
      </Drawer>
    </>
  );
}
