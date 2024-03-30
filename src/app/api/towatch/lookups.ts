// Local
import { apiSlice } from "./";

const apiUrl = import.meta.env.VITE_APP_API_URL;

export const lookupsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchEpisodesForSeason: builder.mutation({
      query: (seasonId) => ({
        method: "GET",
        url: `${apiUrl}/episodes/${seasonId}`,
      }),
    }),
    fetchEpisodeTags: builder.query({
      query: (params) => ({
        url: `${apiUrl}/episode-tags`,
        params,
      }),
      transformResponse: (response) => response.data,
    }),
    fetchShowTypes: builder.query({
      query: () => `${apiUrl}/show-types`,
    }),
  }),
});

export const {
  useFetchEpisodesForSeasonMutation,
  useFetchEpisodeTagsQuery,
  useFetchShowTypesQuery,
} = lookupsApi;
