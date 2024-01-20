import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: stateType = {
  loading: false,
  result: [],
  words: [],
};

const rootSlice = createSlice({
  name: "Root",
  initialState: initialState,
  reducers: {
    getWordsRequest: (state) => {
      state.loading = true;
    },
    getWordsSuccess: (state, action: PayloadAction<wordType[]>) => {
      state.loading = false;
      state.words = action.payload;
    },
    getWordsFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    saveResults: (state, action: PayloadAction<string[]>) => {
      state.loading = false;
      state.result = action.payload;
    },
    clearState: (state) => {
      state.loading = false;
      state.result = [];
      state.words = [];
      state.error = undefined;
    },
  },
});

export const {getWordsRequest,getWordsSuccess,getWordsFail,saveResults,clearState} = rootSlice.actions

export default rootSlice.reducer;
