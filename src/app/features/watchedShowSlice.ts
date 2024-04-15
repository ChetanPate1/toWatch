// Third party
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Local
import { RootState } from "../store";
const apiUrl = import.meta.env.VITE_APP_API_URL;

const initialState = {
  list: [],
  currentPage: 1,
  showType: "Collection",
  totalPages: 3,
  pageSize: 15,
  isFetching: false,
};

export const fetchWatchedShows = createAsyncThunk(
  "watchedShows/fetch",
  async (_, { getState }) => {
    const { token } = (getState() as RootState).storage;

    const response = await fetch(
      `${apiUrl}/watched-shows?currentPage=1&showType=Collection`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return await response.json();
  }
);

export const fetchWatchedShowsPagination = createAsyncThunk(
  "watchedShowsPagination/fetch",
  async (_, { getState }) => {
    const { token } = (getState() as RootState).storage;
    const { isFetching, showType, currentPage, totalPages, pageSize } = (
      getState() as RootState
    ).watchedShow;

    if (isFetching || currentPage >= totalPages) {
      return {
        showType,
        watchedShows: [],
        currentPage,
        totalPages,
        pageSize,
      };
    }

    const response = await fetch(
      `${apiUrl}/watched-shows?currentPage=${
        currentPage + 1
      }&showType=${showType}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return await response.json();
  }
);

export const slice = createSlice({
  name: "watchedShow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWatchedShows.fulfilled, (state, action) => {
        state.isFetching = false;
        state.list = action.payload.watchedShows;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.pageSize = action.payload.pageSize;
      })
      .addCase(fetchWatchedShows.rejected, (state, action) => {
        state.isFetching = false;
      })
      .addCase(fetchWatchedShows.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(fetchWatchedShowsPagination.fulfilled, (state, action) => {
        state.isFetching = false;
        state.list = [...state.list, ...action.payload.watchedShows];

        if (action.payload.watchedShows.length > 0) {
          state.currentPage = action.payload.currentPage;
        }

        state.totalPages = action.payload.totalPages;
        state.pageSize = action.payload.pageSize;
      });
  },
});

export default slice.reducer;
