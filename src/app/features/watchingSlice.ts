// Third party
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Local
import { RootState } from "../store";
const apiUrl = import.meta.env.VITE_APP_API_URL;

const initialState = {
  list: [],
  currentPage: 1,
  totalPages: 3,
  pageSize: 15,
  isFetching: false,
};

export const fetchWatching = createAsyncThunk(
  "watching/fetch",
  async (_, { getState }) => {
    const { token } = (getState() as RootState).storage;

    const response = await fetch(`${apiUrl}/watchings?currentPage=1`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  }
);

export const fetchWatchingPagination = createAsyncThunk(
  "watchingPagination/fetch",
  async (_, { getState }) => {
    const { token } = (getState() as RootState).storage;
    const { isFetching, currentPage, totalPages, pageSize } = (
      getState() as RootState
    ).watchedShow;

    if (isFetching || currentPage >= totalPages) {
      return {
        watching: [],
        currentPage,
        totalPages,
        pageSize,
      };
    }

    const response = await fetch(
      `${apiUrl}/watchings?currentPage=${currentPage + 1}`,
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
  name: "watching",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWatching.fulfilled, (state, action) => {
        state.isFetching = false;
        state.list = action.payload.watching;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.pageSize = action.payload.pageSize;
      })
      .addCase(fetchWatching.rejected, (state, action) => {
        state.isFetching = false;
      })
      .addCase(fetchWatching.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(fetchWatchingPagination.fulfilled, (state, action) => {
        state.isFetching = false;
        state.list = [...state.list, ...action.payload.watching];

        if (action.payload.watching.length > 0) {
          state.currentPage = action.payload.currentPage;
        }

        state.totalPages = action.payload.totalPages;
        state.pageSize = action.payload.pageSize;
      });
  },
});

export default slice.reducer;
