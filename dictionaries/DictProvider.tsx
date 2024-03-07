import React, {createContext, ReactNode} from 'react';
import data from './ua.json'
import {Dictionary} from "@/dictionaries/interface";



export const dictContext = createContext<Dictionary>(data)
const DictProvider = ({dict, children}: {dict: Dictionary, children: ReactNode}) => {
  return (
    <dictContext.Provider value={dict}>
      {children}
    </dictContext.Provider>
  );
};

export default DictProvider;