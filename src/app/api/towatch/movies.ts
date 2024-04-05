// Local
import { apiSlice } from "./";
const movieApiUrl = import.meta.env.VITE_APP_OMDB_API_URL;
const apikey = import.meta.env.VITE_APP_OMDB_API_KEY;
const apiUrl = import.meta.env.VITE_APP_API_URL;

export const movieSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    saveMovie: builder.mutation({
      query: (movie) => {
        const posterUrl = movie.Poster.slice(0, movie.Poster.length - 7);

        return {
          url: `${apiUrl}/movie-collections`,
          method: "POST",
          body: {
            ...movie,
            Poster: posterUrl + "210.jpg",
            PosterXL: posterUrl + "720.jpg",
          },
        };
      },
    }),
    deleteMovieFromCollection: builder.mutation({
      query: (id: string) => ({
        url: `${apiUrl}/movie-collections/${id}`,
        method: "DELETE",
      }),
    }),
    findMovies: builder.mutation({
      query: (movie) => ({
        url: movieApiUrl,
        params: {
          apikey,
          plot: "full",
          t: movie.split(",")[0],
          y: movie.split(",")[1],
        },
      }),
    }),
  }),
});

export const {
  useFetchMoviesQuery,
  useFindMoviesMutation,
  useSaveMovieMutation,
  useDeleteMovieFromCollectionMutation,
} = movieSlice;
