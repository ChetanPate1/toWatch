// Local
import { apiSlice } from "./";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export const watchingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchWatching: builder.query({
      query: (params = { currentPage: 1 }) => ({
        url: `${apiUrl}/watchings`,
        params,
      }),
    }),
    fetchShowDetails: builder.query({
      query: (watchingId) => ({
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
  useFetchWatchingQuery,
  useFetchShowDetailsQuery,
  useAddShowToWatchingMutation,
  useDeleteShowFromWatchingMutation,
  useToggleWatchingShowEpisodeMutation,
  useFetchWatchingShowEpisodeTagsQuery,
  useToggleWatchingShowEpisodeTagMutation,
} = watchingApi;
