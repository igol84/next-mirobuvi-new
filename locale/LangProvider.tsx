import React, {createContext, ReactNode} from 'react';
import {Lang} from "@/dictionaries/get-dictionary";
import {defaultLanguage} from "@/locale/settings";


export const LangContext = createContext(defaultLanguage)
const LangProvider = ({lang, children}: {lang: Lang, children: ReactNode}) => {
  return (
    <LangContext.Provider value={lang}>
      {children}
    </LangContext.Provider>
  );
};

export default LangProvider;