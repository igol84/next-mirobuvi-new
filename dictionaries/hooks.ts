'use client'
import {useContext} from "react";
import {dictContext} from "@/dictionaries/DictProvider";
import {Dictionary} from "@/dictionaries/interface";



export const useDictionaryTranslate = (page: string) => (title: string) => {
  const dictionary: Dictionary  = useContext(dictContext)
  const dictionaryPage = dictionary[page]
  return dictionaryPage[title] ?? title
}