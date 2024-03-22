import CustomBreadcrumbs, { CustomBreadcrumbsProps } from "@/Core/CustomBreadCrumbs";
import { useSettingsContext } from "@/Core/settings";
import { Container, ContainerProps, Stack, Typography, useTheme } from "@mui/material";

const Page: React.FC<
  ContainerProps & {
    breadcrumbs?: CustomBreadcrumbsProps;
    pageTitle?: string;
    rightButton?: React.ReactNode;
  }
> = ({ children, breadcrumbs,pageTitle,rightButton, ...props }) => {
  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"} {...props}>
      {
        pageTitle && (
          <Typography variant="h4">{pageTitle}</Typography>
        )
      }
      {!!breadcrumbs && <Stack direction="row" justifyContent={"space-between"} alignItems={"center"} sx={{ mb: 4,mt:2 }}><CustomBreadcrumbs {...breadcrumbs} /> {rightButton}</Stack>}
      {children}
    </Container>
  );
};

export default Page;
