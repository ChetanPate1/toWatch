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

export const fetchMovieCollection = createAsyncThunk(
  "movieCollection/fetch",
  async (_, { getState }) => {
    const { token } = (getState() as RootState).storage;

    const response = await fetch(`${apiUrl}/movie-collections?currentPage=1`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  }
);

export const fetchMovieCollectionPagination = createAsyncThunk(
  "movieCollectionPagination/fetch",
  async (_, { getState }) => {
    const { token } = (getState() as RootState).storage;
    const { isFetching, currentPage, totalPages, pageSize } = (
      getState() as RootState
    ).movie;

    if (isFetching || currentPage >= totalPages) {
      return {
        list: [],
        currentPage,
        totalPages,
        pageSize,
      };
    }

    const response = await fetch(
      `${apiUrl}/movie-collections?currentPage=${currentPage + 1}`,
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
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieCollection.fulfilled, (state, action) => {
        state.isFetching = false;
        state.list = action.payload.collection;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.pageSize = action.payload.pageSize;
      })
      .addCase(fetchMovieCollection.rejected, (state, action) => {
        state.isFetching = false;
      })
      .addCase(fetchMovieCollection.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(fetchMovieCollectionPagination.fulfilled, (state, action) => {
        state.isFetching = false;
        state.list = [...state.list, ...action.payload.collection];

        if (action.payload.collection.length > 0) {
          state.currentPage = action.payload.currentPage;
        }

        state.totalPages = action.payload.totalPages;
        state.pageSize = action.payload.pageSize;
      });
  },
});

export default slice.reducer;
