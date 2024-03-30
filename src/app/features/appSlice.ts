// Third party
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ready: false,
};

export const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    appReady: (state) => {
      state.ready = true;
    },
  },
});

export const { appReady } = slice.actions;

export default slice.reducer;
