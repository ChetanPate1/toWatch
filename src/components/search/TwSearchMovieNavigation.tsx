// Core
import { useImperativeHandle, useRef } from "react";
// Thirt Party
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
// Local
import TwContainer from "../base/TwContainer";
import TwFormField from "../base/TwFormField";
import TwLoader from "../base/TwLoader";
import TwSearchResultItem from "./TwSearchResultItem";
import Base from "../modals/Base";

import { useFindMoviesMutation, useSaveMovieMutation } from "../../app/api/towatch/movies";

type Props = {
  reference: any;
  onAddMovie: (movie: any) => void;
};

const TwSearchMovieNavigation = (props: Props) => {
  const addMovieModal = useRef({});
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [findMovies, { data: movie, isLoading }] = useFindMoviesMutation();
  const [saveMovie] = useSaveMovieMutation();

  useImperativeHandle(props.reference, () => ({
    openAddMovieModal: () => addMovieModal.current.open()
  }));

  const debounce = (func: () => void, delay: number) => {
    return function (...args: []) {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

      debounceTimeout.current = setTimeout(() => {
        func(...args);
        debounceTimeout.current = null;
      }, delay);
    }
  };

  const onChangeSearchText = (value: string) => {
    if (!isLoading) {
      findMovies(value);
    }
  };

  const onSaveMovie = (movie) => {
    saveMovie(movie).unwrap()
      .then((data) => {
        console.log(data);

        props.onAddMovie(data.movie);
        addMovieModal.current.close()
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const debouncedOnChange = debounce(onChangeSearchText, 1000);

  const formatGenre = (genres: string) => {
    if (genres) {
      return genres.split(', ');
    }

    return [];
  };

  const renderMovie = () => {
    if (isLoading) {
      return (
        <div className="mt-2 flex justify-center">
          <TwLoader show />
        </div>
      );
    }

    if (movie) {
      return (
        <TwSearchResultItem
          key={movie.imdbID}
          name={movie.Title}
          image={movie.Poster}
          released={movie.Year}
          genres={formatGenre(movie.Genre)}
          summary={movie.Plot}
          onAdd={() => onSaveMovie(movie)}
          disabled={isLoading}
        />
      );
    }

    return null;
  };

  return (
    <div className="fixed top-0 left-0 w-full py-3 bg-neutral-900 z-[45]">
      <TwContainer className="flex flex-row justify-center !mb-0">
        <div className="flex flex-row items-center">
          <MagnifyingGlassIcon className="h-4 w-4 text-zinc-500" aria-hidden="true" />
          <button type="button" className="rounded-md px-3 py-5 sm:text-sm text-gray-500" onClick={addMovieModal.current.open}>
            Search for a movie
          </button>
        </div>
      </TwContainer>

      <Base reference={addMovieModal}>
        <h3 className="text-lg font-semibold leading-6 text-gray-400 mb-2">Add a movie</h3>
        <TwFormField
          className="placeholder-gray-600 text-gray-200 bg-transparent !text-xl !p-0 border-none"
          id="searchShow"
          type="text"
          placeholder="Search for a movie (Movie, Year)"
          onChange={debouncedOnChange}
        />

        <div className="mt-3 max-h-[700px] overflow-y-auto">
          {renderMovie()}
        </div>
      </Base>
    </div>
  );
};

export default TwSearchMovieNavigation;