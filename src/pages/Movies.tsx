// Core
import { useEffect, useRef, useState } from 'react';
// Local
import TwContainer from '../components/base/TwContainer';
import TwShowMovieCard from '../components/TwShowMovieCard';
import Confirm from '../components/modals/Confirm';
import Empty from '../components/empty';
import TwReachedEnd from '../components/reached-end';
import TwSearchMovieNavigation from '../components/search/TwSearchMovieNavigation';
import TwPageLoader from '../components/page-loader';
import { useDeleteMovieFromCollectionMutation } from '../app/api/towatch/movies';
import { fetchMovieCollection, fetchMovieCollectionPagination } from '../app/features/movieSlice';
import { useAppDispatch, useAppSelector } from '../app/store';
import FullScreen from '../components/modals/FullScreen';
import MovieDetail from './MovieDetail';


const Movies = () => {
   const confirmModal = useRef({});
   const selectedMovie = useRef();
   const movieDetail = useRef({});
   const searchMovie = useRef({});
   const [movieId, setMovieId] = useState('');
   const dispatch = useAppDispatch();
   const { list, currentPage, totalPages, isFetching } = useAppSelector((state) => state.movie);
   const [deleteMovieFromCollection] = useDeleteMovieFromCollectionMutation();

   useEffect(() => {
      dispatch(fetchMovieCollection());

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;

      dispatch(fetchMovieCollectionPagination());
   };

   const onConfirmDelete = (movie) => {
      deleteMovieFromCollection(movie._id)
         .then(() => refetch());
   };

   const onMovieDetail = (movieId: string) => {
      setMovieId(movieId);
      movieDetail.current.open();
   };

   const renderContent = () => {
      if (isFetching) {
         return <TwPageLoader />;
      }

      if (list.length > 0) {
         return (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 justify-items-center gap-4">
               {list.map((item) => (
                  <a className="w-full hover:cursor-pointer" key={item._id} onClick={() => onMovieDetail(item.movie._id)}>
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
                  </a>
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

   const renderListEnd = () => {
      if (currentPage == totalPages && list.length > 0 && !isFetching) {
         return <TwReachedEnd />;
      }

      return null;
   };

   return (
      <TwContainer className="mt-24">
         <TwSearchMovieNavigation reference={searchMovie} onAddMovie={(movie) => { }} />
         <h1 className="sr-only">Movies</h1>

         {renderContent()}
         {renderListEnd()}

         <Confirm
            reference={confirmModal}
            text="Are you sure you want to delete this movie from your movie list?"
            onConfirm={() => onConfirmDelete(selectedMovie.current)}
         />

         <FullScreen reference={movieDetail}>
            <MovieDetail movieId={movieId} onBack={movieDetail.current.close} />
         </FullScreen>
      </TwContainer>
   );
};

export default Movies;