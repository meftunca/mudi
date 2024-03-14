import { Alert, Box, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import { countries } from "./countries";
import { useLocalizationStore } from "./state";
import React, { useMemo } from "react";
import * as immutable from 'object-path-immutable'
import { useAutoAnimate } from "@formkit/auto-animate/react";
function LangInputs({ lang }: { lang: string }) {
  const {workingOnPath,languageFileContents,setLanguageFileContents} = useLocalizationStore(
  );
    const pathWithDot = workingOnPath.join(".");
  const memoizedValue = React.useMemo(() => {
    const langValues =  languageFileContents[lang];
    const value = immutable.get(langValues, pathWithDot);
    return value;
  }, [languageFileContents, lang, pathWithDot]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLanguageFileContents((before:Record<string,any>)=>{
      const newVal = immutable.wrap(before).set( lang+"."+pathWithDot, value).value();
      // console.log(immutable.get(newVal, lang+"."+workingOnPath));
      return {...newVal};
    });
  }
  if(typeof memoizedValue === "object"){
    return null;
  }
  return (
    <Stack
      direction={"row"}
      gap={3}
      alignItems="center"
      component={Grid}
      item
      md={6}
    >
      <CountryFlagRenderer country={lang} />
      <TextField label="Value" fullWidth multiline defaultValue={memoizedValue} onChange={onChange} />
    </Stack>
  );
}

const LocalizationEditor = () => {
  const [supportedLanguages,workingOnPath,listOfAllKeys] = useLocalizationStore(
    (state) => [state.languageList,state.workingOnPath,state.listOfAllKeys]
  );
    const [parentRef] = useAutoAnimate()
  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" mb={4}>
        Localization Editor
      </Typography>
      <Grid container spacing={4} ref={parentRef}>
        {supportedLanguages.map((lang, index) => (
          <LangInputs key={index+workingOnPath} lang={lang}></LangInputs>
        ))}
      </Grid>
    </Paper>
  );
};

const CountryFlagRenderer = ({ country }: { country: string }) => {
  country = country === "en" ? "gb" : country;
  return (
    <Stack direction="row" gap={2} alignItems={"center"} width={120}>
      <img
        loading="lazy"
        width="20"
        srcSet={`https://flagcdn.com/w40/${country.toLowerCase()}.png 2x`}
        src={`https://flagcdn.com/w20/${country.toLowerCase()}.png`}
        alt=""
      />
      <Typography>
        {countries.find((a) => a.code.toLowerCase() === country)?.label ||
          country}
      </Typography>
    </Stack>
  );
};

export default LocalizationEditor;
