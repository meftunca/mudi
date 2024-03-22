import { useMemo } from 'react';
// @mui
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
// theme
import { paper } from '@/Core/theme/css';
//
// import Iconify from '../../Iconify';
import Scrollbar from '@/Core/Scrollbar';

import CloseRounded from '@mui/icons-material/CloseRounded';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import RestartAltRounded from '@mui/icons-material/RestartAltRounded';
import { useSettingsContext } from '../context';
import BaseOptions from './base-option';
import FullScreenOption from './fullscreen-option';
import LayoutOptions from './layout-options';
import PresetsOptions from './presets-options';
import StretchOptions from './stretch-options';

// ----------------------------------------------------------------------

export default function SettingsDrawer() {
  const theme = useTheme();

  const settings = useSettingsContext();
  const labelStyles = useMemo(
    () => ({
      mb: 1.5,
      color: 'text.disabled',
      fontWeight: 'fontWeightSemiBold',
    }),
    []
  );

  return (
    <Drawer
      anchor="right"
      open={settings.open}
      onClose={settings.onClose}
      slotProps={{
        backdrop: { invisible: true },
      }}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          ...paper({ theme, bgcolor: theme.palette.background.default }),
          width: 280,
        },
      }}
    >
      <RenderHead />
      <Divider sx={{ borderStyle: 'dashed' }} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3 }}>
          <RenderMode labelStyles={labelStyles} />
          <RenderContrast labelStyles={labelStyles} />
          <RenderDirection labelStyles={labelStyles} />
          <RenderLayout labelStyles={labelStyles} />
          <RenderStretch labelStyles={labelStyles} />
          <RenderPresets labelStyles={labelStyles} />
        </Stack>
      </Scrollbar>

      <FullScreenOption />
    </Drawer>
  );
}

function RenderHead() {
  const settings = useSettingsContext();
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 2, pr: 1, pl: 2.5 }}
    >
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Settings
      </Typography>

      <Tooltip title="Reset">
        <IconButton onClick={settings.onReset}>
          <Badge color="error" variant="dot" invisible={!settings.canReset}>
            {/* <Iconify icon="solar:restart-bold" /> */}
            <RestartAltRounded />
          </Badge>
        </IconButton>
      </Tooltip>

      <IconButton onClick={settings.onClose}>
        <CloseRounded />
      </IconButton>
    </Stack>
  );
}

function RenderMode({ labelStyles }) {
  const settings = useSettingsContext();
  return (
    <div>
      <Typography variant="caption" component="div" sx={{ ...labelStyles }}>
        Mode
      </Typography>

      <BaseOptions
        value={settings.themeMode}
        onChange={(newValue: string) =>
          settings.onUpdate('themeMode', newValue)
        }
        options={['light', 'dark']}
        icons={['sun', 'moon']}
      />
    </div>
  );
}

function RenderContrast({ labelStyles }) {
  const settings = useSettingsContext();
  return (
    <div>
      <Typography variant="caption" component="div" sx={{ ...labelStyles }}>
        Contrast
      </Typography>

      <BaseOptions
        value={settings.themeContrast}
        onChange={(newValue: string) =>
          settings.onUpdate('themeContrast', newValue)
        }
        options={['default', 'bold']}
        icons={['contrast', 'contrast_bold']}
      />
    </div>
  );
}

function RenderDirection({ labelStyles }) {
  const settings = useSettingsContext();
  return (
    <div>
      <Typography variant="caption" component="div" sx={{ ...labelStyles }}>
        Direction
      </Typography>

      <BaseOptions
        value={settings.themeDirection}
        onChange={(newValue: string) =>
          settings.onUpdate('themeDirection', newValue)
        }
        options={['ltr', 'rtl']}
        icons={['align_left', 'align_right']}
      />
    </div>
  );
}

function RenderLayout({ labelStyles }) {
  const settings = useSettingsContext();
  return (
    <div>
      <Typography variant="caption" component="div" sx={{ ...labelStyles }}>
        Layout
      </Typography>

      <LayoutOptions
        value={settings.themeLayout}
        onChange={(newValue: string) =>
          settings.onUpdate('themeLayout', newValue)
        }
        options={['vertical', 'horizontal', 'mini']}
      />
    </div>
  );
}

function RenderStretch({ labelStyles }) {
  const settings = useSettingsContext();
  return (
    <div>
      <Typography
        variant="caption"
        component="div"
        sx={{
          ...labelStyles,
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        Stretch
        <Tooltip title="Only available at large resolutions > 1600px (xl)">
          {/* <Iconify icon="eva:info-outline" width={16} sx={{ ml: 0.5 }} /> */}
          <InfoOutlined sx={{ ml: 0.5 }} />
        </Tooltip>
      </Typography>

      <StretchOptions
        value={settings.themeStretch}
        onChange={() =>
          settings.onUpdate('themeStretch', !settings.themeStretch)
        }
      />
    </div>
  );
}

function RenderPresets({ labelStyles }) {
  const settings = useSettingsContext();
  return (
    <div>
      <Typography variant="caption" component="div" sx={{ ...labelStyles }}>
        Presets
      </Typography>

      <PresetsOptions
        value={settings.themeColorPresets}
        onChange={(newValue: string) =>
          settings.onUpdate('themeColorPresets', newValue)
        }
      />
    </div>
  );
}
