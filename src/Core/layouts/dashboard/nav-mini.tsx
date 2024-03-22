// @mui
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
// theme
import { hideScroll } from "@/Core/theme/css";
// hooks
// import { useUserController } from "@maple-tech/auth";
// components
// import Logo from "@/Core/Logo";
import { NavSectionMini } from "@/Core/nav-section";
//
import { NAV } from "../config-layout";
import { useNavData } from "@/Core/RouterProvider";
import { NavToggleButton } from "../_common";

// ----------------------------------------------------------------------

export default function NavMini() {
  // const { user } = useUserController();

  const navData = useNavData();

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_MINI },
      }}
    >
      <NavToggleButton
        sx={{
          top: 22,
          left: NAV.W_MINI - 12,
        }}
      />

      <Stack
        sx={{
          pb: 2,
          height: 1,
          position: "fixed",
          width: NAV.W_MINI,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...hideScroll.x,
        }}
      >
        <Box component="img" src="/mudi.png" sx={{ mt: 3, ml: 4, mb: 1,width:64,height:"auto"}} />

        <NavSectionMini
          data={navData}
          config={{
            // @ts-ignore
            currentRole:  "admin",
          }}
        />
      </Stack>
    </Box>
  );
}
