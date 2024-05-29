// Local
import { apiSlice } from "./";
const showApiUrl = import.meta.env.VITE_APP_TVMAZE_API_URL;
const apiUrl = import.meta.env.VITE_APP_API_URL;

export const showsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findShows: builder.mutation({
      query: (q) => ({
        method: "GET",
        url: `${showApiUrl}/search/shows`,
        params: { q },
      }),
    }),
    saveShow: builder.mutation({
      query: (show) => ({
        method: "POST",
        url: `${apiUrl}/shows`,
        body: show,
      }),
    }),
    updateShow: builder.mutation({
      query: (showId) => ({
        method: "POST",
        url: `${apiUrl}/shows/${showId}/update`,
      }),
    }),
    updateShows: builder.mutation({
      query: () => ({
        method: "POST",
        url: `${apiUrl}/shows/update`,
      }),
    }),
  }),
});

export const {
  useFindShowsMutation,
  useSaveShowMutation,
  useUpdateShowMutation,
  useUpdateShowsMutation,
} = showsApi;
