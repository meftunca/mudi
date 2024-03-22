import { AppBar, Button, Toolbar, Box, Paper, Stack, Typography } from "@mui/material";
import * as React from "react";
import { listen } from "@tauri-apps/api/event";
import { readTextFile, readDir } from "@tauri-apps/api/fs";
import LocalizationTreeSidebar from "./TreeViews";
import SupportedLanguages from "./SupportedLanguages";
import LocalizationEditor from "./Editor";
import { useLocalizationStore } from "./state";
import {
  BaseDirectory,
  createDir,
  exists,
  writeTextFile,
} from "@tauri-apps/api/fs";
type anyObject = { [key: string]: any };
// Deep merge of two objects.
// https://stackoverflow.com/a/34749873
const mergeDeep = (target: anyObject, source: anyObject) => {
  if (typeof target !== "object" || typeof source !== "object") {
    return source;
  }
  for (const key in source) {
    if (source[key] === null) {
      target[key] = source[key];
    } else if (typeof source[key] === "object") {
      if (!target[key]) {
        Object.assign(target, { [key]: {} });
      }
      mergeDeep(target[key], source[key]);
    } else {
      Object.assign(target, { [key]: source[key] });
    }
  }
  return target;
};
// get all keys from an object [string...]|[string,[string...]]
const getAllKeys = (obj: anyObject) => {
  const keys = [];
  for (const key of Object.keys(obj)) {
    if (typeof obj[key] === "object") {
      keys.push({ [key]: getAllKeys(obj[key]) });
    } else {
      keys.push(key);
    }
  }
  return keys;
};

const LocalizationServices = () => {
  const { languageFileContents } = useLocalizationStore();
  const { setLanguageFileContents, setLanguageList, setListOfAllKeys } =
    useLocalizationStore();
  React.useEffect(() => {
    const unlisten = listenFiles();
    return () => {
      unlisten.then((unlisten) => null).catch((err) => console.error(err));
    };
  }, []);
  const listenFiles = async () => {
    return await listen("tauri://file-drop", async (event) => {
      if (Array.isArray(event.payload)) {
        const langList = event.payload.map(
          (i) => i.split("/").pop().split(".")[0]
        );
        Promise.all(
          event.payload.map(async (file) => {
            return [
              file.split("/").pop().split(".")[0] as string,
              await readTextFile(file),
            ];
          })
        ).then((values) => {
          let allKeys: null | anyObject = null;
          let languagesFilesContents: anyObject = {};
          values.forEach(([lang, value]) => {
            let val = JSON.parse(value);
            languagesFilesContents[lang] = val;
            if (allKeys === null) {
              allKeys = val;
            } else {
              allKeys = mergeDeep(allKeys, val);
            }
          });
          if (allKeys === null) {
            return;
          }
          // setData([...getAllKeys(allKeys)]);
          setLanguageList(langList);
          setLanguageFileContents(languagesFilesContents);
          setListOfAllKeys(getAllKeys(allKeys));
        });
      }
    });
  };
  const onExport = async () => {
    if (
      !(await exists("mudi/localization", {
        dir: BaseDirectory.Document,
      }))
    ) {
      await createDir("mudi/localization", {
        dir: BaseDirectory.Document,
        recursive: true,
      });
    }
    Object.entries(languageFileContents).forEach(
      async ([lang, _]) => {
        writeTextFile(
          "mudi/localization/" + lang + ".json",
          JSON.stringify(languageFileContents[lang], null, 2),
          {
            dir: BaseDirectory.Document,
            append: true,
          }
        );
      }
    );
  }
  return (
    <Box>
        <Toolbar>
          <Typography flexGrow={1}>Localization Editor</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={onExport}
          >
            Export
          </Button>
        </Toolbar>
      <Stack direction={"row"} gap={3}>
        <LocalizationTreeSidebar />
        <div>
          <SupportedLanguages />
          <LocalizationEditor />
        </div>
      </Stack>
    </Box>
  );
};

export default LocalizationServices;
