/// <reference types="vite/client" />

type langType = "ja" | "Hi" | "es" | "Fr";

type wordType = {
  word: string;
  meaning: string;
  option: string[];
};

type stateType = {
  loading: boolean;
  result: string[];
  words: wordType[];
  error?: string;
};

type fetchDataType={
  translations:{
    text:string
  }[]
}