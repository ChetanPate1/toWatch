// Local
import { apiSlice } from "./";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export const watchedShowsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
  useDeleteWatchedShowMutation,
  useContinueWatchingShowMutation,
  useRewatchShowMutation,
} = watchedShowsApi;
