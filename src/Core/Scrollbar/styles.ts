// @mui
import { alpha, styled } from "@mui/material/styles";
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

export const StyledScrollbar = styled(Box)(({ theme }) => ({
  maxHeight: "100%",
  overflow: "auto",
 

  // '& .simplebar-scrollbar': {
  //   '&:before': {
  //     backgroundColor: alpha(theme.palette.grey[600], 0.48),
  //   },
  //   '&.simplebar-visible:before': {
  //     opacity: 1,
  //   },
  // },
  // '& .simplebar-mask': {
  //   zIndex: 'inherit',
  // },
}));
