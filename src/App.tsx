import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Command } from '@tauri-apps/api/shell';
import LocalizationServices from './Localization';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { open } from '@tauri-apps/api/dialog';
import { useLocalizationStore } from './Localization/state';
import { BaseDirectory, createDir, exists, writeTextFile } from '@tauri-apps/api/fs';
// Open a selection dialog for directories

function App() {
  const {languageFileContents} = useLocalizationStore();

  return (
    <>
    <AppBar variant="outlined" elevation={0} position='sticky'>
      <Toolbar>
      <Typography flexGrow={1}>Localization Editor</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          if(!(await exists('localization', { dir: BaseDirectory.Document }))){
          await createDir('localization', { dir: BaseDirectory.Document });
          }
          Object.entries(languageFileContents).forEach(async ([lang, _]) => {
            writeTextFile('localization/'+lang + '.json', JSON.stringify(languageFileContents[lang], null, 2),{
              dir:BaseDirectory.Document ,
              append:true
            });
          }
          );
        }}
      >
        Export
      </Button>
      </Toolbar>
    </AppBar>
     <LocalizationServices />
    </>
  )
}

export default App
