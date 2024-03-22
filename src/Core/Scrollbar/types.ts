// @mui
import { BoxProps } from '@mui/material';
import { Theme, SxProps } from '@mui/material/styles';

// ----------------------------------------------------------------------

export interface ScrollbarProps extends BoxProps {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}
