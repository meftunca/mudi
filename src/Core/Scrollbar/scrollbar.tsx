import { memo, forwardRef } from 'react';
// @mui
import Box from '@mui/material/Box';
//
import {  StyledScrollbar } from './styles';
import { ScrollbarProps } from './types';

// ----------------------------------------------------------------------

const Scrollbar = forwardRef<HTMLDivElement, ScrollbarProps>(({ children, sx, ...other }, ref) => {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  if (isMobile) {
    return (
      <Box ref={ref} sx={{ overflow: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
      <StyledScrollbar
        sx={sx}
        {...other}
      >
        {children}
      </StyledScrollbar>
  );
});

export default memo(Scrollbar);
