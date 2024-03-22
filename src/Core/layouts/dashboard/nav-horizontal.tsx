import { memo } from 'react';
// @mui
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
// theme
import { bgBlur } from '@/Core/theme/css';
// hooks
 // components
import { NavSectionHorizontal } from '@/Core/nav-section';
// import { useUserController } from '@maple-tech/auth';
//
import { HeaderShadow } from '../_common';
import { HEADER } from '../config-layout';
import { useNavData } from '@/Core/RouterProvider';

// ----------------------------------------------------------------------

function NavHorizontal() {
  const theme = useTheme();

  // const { user } = useUserController();

  const navData = useNavData();

  return (
    <AppBar
      component="nav"
      sx={{
        top: HEADER.H_DESKTOP_OFFSET,
      }}
    >
      <Toolbar
        sx={{
          ...bgBlur({
            color: theme.palette.background.default,
          }),
        }}
      >
        <NavSectionHorizontal
          data={navData}
          config={{
            // @ts-ignore
            currentRole: user?.role || 'admin',
          }}
        />
      </Toolbar>

      <HeaderShadow />
    </AppBar>
  );
}

export default memo(NavHorizontal);
