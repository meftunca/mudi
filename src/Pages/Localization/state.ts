import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";

type LocalizationState = {
  languageFileContents: Record<string, Record<string, any>>;
  languageList: string[];
  workingOnPath: string[];
  listOfAllKeys: Record<string, string[]>[];
  setLanguageList: (list: string[]) => void;
  setLanguageFileContents: (
    contents: Record<string, Record<string, any>>
  ) => void;
  setListOfAllKeys: (list: Record<string, string[]>[]) => void;
  setWorkingOnPath: (path: string[]) => void;
};
const storage: PersistStorage<LocalizationState> = {
  getItem: (name) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    return JSON.parse(str);
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => localStorage.removeItem(name),
};
export const useLocalizationStore = create<LocalizationState>()(
  persist(
    (set) => ({
      languageFileContents: {},
      languageList: [],
      workingOnPath: [],
      listOfAllKeys: [],
      setLanguageList: (list: string[]) =>
        set((state) => ({ ...state, languageList: list })),
      setLanguageFileContents: (
        contents:
          | Record<string, Record<string, any>>
          | ((
              f: Record<string, Record<string, any>>
            ) => Record<string, Record<string, any>>)
      ) =>
        set((state) => ({
          ...state,
          languageFileContents:
            typeof contents === "function"
              ? contents(state.languageFileContents)
              : contents,
        })),
      setListOfAllKeys: (list: Record<string, string[]>[]) =>
        set((state) => ({ ...state, listOfAllKeys: list })),
      setWorkingOnPath: (path: string[]) =>
        set((state) => ({ ...state, workingOnPath: path })),
    }),
    {
      name: "localization-store",
      storage,
    }
  )
);
