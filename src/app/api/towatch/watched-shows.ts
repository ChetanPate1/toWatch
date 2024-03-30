// Local
import { apiSlice } from "./";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export const watchedShowsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchWatchedShows: builder.query({
      query: (params = { currentPage: 1, showType: "Collection" }) => ({
        url: `${apiUrl}/watched-shows`,
        params,
      }),
    }),
    deleteWatchedShow: builder.mutation({
      query: (showId: string) => ({
        url: `${apiUrl}/watched-shows/${showId}`,
        method: "DELETE",
      }),
    }),
    continueWatchingShow: builder.mutation({
      query: (id: string) => ({
        url: `${apiUrl}/watched-shows/${id}/continue`,
        method: "POST",
      }),
    }),
    rewatchShow: builder.mutation({
      query: (id: string) => ({
        url: `${apiUrl}/watched-shows/${id}/rewatch`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useFetchWatchedShowsQuery,
  useDeleteWatchedShowMutation,
  useContinueWatchingShowMutation,
  useRewatchShowMutation,
} = watchedShowsApi;