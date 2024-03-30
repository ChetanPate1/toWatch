// Third party
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Local

const initialState = {
  shows: [],
};

export const fetchMostPopular = createAsyncThunk(
  "mostPopular/fetch",
  async () => {
    const response = await fetch(
      "https://www.episodate.com/api/most-popular?page=1"
    );
    return await response.json();
  }
);

export const slice = createSlice({
  name: "mostPopular",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMostPopular.fulfilled, (state, action) => {
      state.shows = action.payload.tv_shows;
    });
  },
});

export default slice.reducer;
