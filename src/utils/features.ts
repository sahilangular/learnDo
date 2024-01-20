import axios from "axios";
import { generate } from "random-words";
import _ from "lodash";

const key = import.meta.env.VITE_RAPID_API_KEY as string


const generateMCQ = (
  meaning: {
    Text: string;
  }[],
  index: number
): string[] => {
  const correctAnswer: string = meaning[index].Text;

  const allMeaningExceptcorrect = meaning.filter(
    (i) => i.Text !== correctAnswer
  );

  const incurrectOptions: string[] = _.sampleSize(
    allMeaningExceptcorrect,
    3
  ).map((i) => i.Text);

  const msqOptions = _.shuffle([...incurrectOptions, correctAnswer]);

  return msqOptions;
};

export const translateWords = async (params: langType) => {

  try {
    const words = generate(8).map((i) => ({
      Text: i,
    }));

    const response = await axios.post(
      "https://microsoft-translator-text.p.rapidapi.com/translate",
      words,
      {
        params: {
          "to[0]": params,
          "api-version": "3.0",
          profanityAction: "NoAction",
          textType: "plain",
        },
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":key,
          "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
        },
      }
    );

    const receiveData: fetchDataType[] = response.data;

    const arr: wordType[] = receiveData.map((i, index) => {
      const option: string[] = generateMCQ(words, index);
      return {
        word: i.translations[0].text,
        meaning: words[index].Text,
        option,
      };
    });

    return arr;
  } catch (error) {
    throw new Error("something wents wrong!");
  }
};

export const countMatchingElements = (arr1: string[], arr2: string[]) => {
  if (arr1.length !== arr2.length) throw new Error("Arrays not matched");

  let matchedCount = 0;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] === arr2[i]) matchedCount++;
  }

  return matchedCount;
};

export const fetchAudio = async (
  text: string,
  lang: langType
): Promise<string> => {
  const speechKey = import.meta.env.VITE_RAPID_SPEECH_KEY as string
  const encodedParams = new URLSearchParams({
    src: text,
    r: "0",
    c: "mp3",
    f: "8khz_8bit_mono",
    'b64':'true'
  });

  if (lang === "ja") encodedParams.set("hl", "ja-jp");
  else if (lang === "es") encodedParams.set("hl", "es-es");
  else if (lang === "Fr") encodedParams.set("hl", "fr-fr");
  else encodedParams.set("hl", "hi-in");

 const {data}:{data:string}= await axios.post("https://voicerss-text-to-speech.p.rapidapi.com/", encodedParams, {
    params: { key:speechKey  },
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": key,
      "X-RapidAPI-Host": "voicerss-text-to-speech.p.rapidapi.com",
    },
  });

  return data;
};
