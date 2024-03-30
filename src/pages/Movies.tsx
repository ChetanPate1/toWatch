// Core
import { useRef } from 'react';
// Third Party
import { Link } from 'react-router-dom';
// Local
import TwContainer from '../components/base/TwContainer';
import TwShowMovieCard from '../components/TwShowMovieCard';
import Confirm from '../components/modals/Confirm';
import Empty from '../components/empty';
import { useDeleteMovieFromCollectionMutation, useFetchMoviesQuery } from '../app/api/towatch/movies';
import TwSearchMovieNavigation from '../components/search/TwSearchMovieNavigation';

const Movies = () => {
   const confirmModal = useRef({});
   const selectedMovie = useRef();
   const searchMovie = useRef({});
   const { data, refetch } = useFetchMoviesQuery({ currentPage: 1 });
   const [deleteMovieFromCollection] = useDeleteMovieFromCollectionMutation();

   const onConfirmDelete = (movie) => {
      deleteMovieFromCollection(movie._id)
         .then(() => refetch());
   };

   const renderContent = () => {
      if (data?.collection.length > 0) {
         return (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 justify-items-center gap-4">
               {data?.collection?.map((item) => (
                  <Link className="w-full" to={`/movies/${item._id}`} key={item._id}>
                     <TwShowMovieCard
                        key={item.movie._id}
                        name={item.movie.title}
                        image={item.movie.poster}
                        onDelete={() => {
                           confirmModal.current.open();
                           selectedMovie.current = item;
                        }}
                        deleteable
                     />
                  </Link>
               ))}
            </div>
         );
      }

      return (
         <Empty
            buttonName="Search for a movie"
            message="You have no movies in your collection!"
            onClick={searchMovie.current.openAddMovieModal}
         />
      );
   };

   return (
      <TwContainer className="mt-9">
         <TwSearchMovieNavigation reference={searchMovie} />
         <h1 className="text-2xl font-bold text-white mb-5">Movies</h1>

         {renderContent()}

         <Confirm
            reference={confirmModal}
            text="Are you sure you want to delete this movie from your movie list?"
            onConfirm={() => onConfirmDelete(selectedMovie.current)}
         />
      </TwContainer>
   );
};

export default Movies;