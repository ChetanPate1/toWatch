// Local
import { apiSlice } from "./";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export const watchingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchShowDetails: builder.mutation({
      query: (watchingId) => ({
        method: "GET",
        url: `${apiUrl}/watchings/${watchingId}`,
      }),
    }),
    addShowToWatching: builder.mutation({
      query: ({ showId, episodeId }) => ({
        url: `${apiUrl}/watchings`,
        method: "POST",
        body: { showId, episodeId },
      }),
    }),
    deleteShowFromWatching: builder.mutation({
      query: ({ id, showTypeId }) => ({
        url: `${apiUrl}/watchings/${id}`,
        method: "DELETE",
        body: { showTypeId },
      }),
    }),
    toggleWatchingShowEpisode: builder.mutation({
      query: ({ watchingId, episodeId }) => ({
        url: `${apiUrl}/watchings/${watchingId}/watched/${episodeId}`,
        method: "POST",
      }),
    }),
    fetchWatchingShowEpisodeTags: builder.query({
      query: (episode) => ({
        url: `${apiUrl}/episode-tags/${episode._id}/tag`,
      }),
    }),
    toggleWatchingShowEpisodeTag: builder.mutation({
      query: ({ episodeId, tagId }) => ({
        url: `${apiUrl}/episode-tags/${episodeId}/tag/${tagId}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useFetchShowDetailsMutation,
  useAddShowToWatchingMutation,
  useDeleteShowFromWatchingMutation,
  useToggleWatchingShowEpisodeMutation,
  useFetchWatchingShowEpisodeTagsQuery,
  useToggleWatchingShowEpisodeTagMutation,
} = watchingApi;
