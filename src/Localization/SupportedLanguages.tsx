import { Chip, Stack, Typography } from "@mui/material";
import { useLocalizationStore } from "./state";

const SupportedLanguages = () => {
  const supportedLanguages = useLocalizationStore((state) => state.languageList);
  return (
    <Stack direction="row" alignItems={"center"} p={4} gap={8}>
      <Typography variant="body1">Supported Languages</Typography>
      <Stack direction={"row"} gap={3}>
        {supportedLanguages.map((lang, index) => (
          <Chip key={index} label={lang}/>
        ))}
      </Stack>
    </Stack>
  )
}
 
export default SupportedLanguages;