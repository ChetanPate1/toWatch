// Core
import { useEffect, useRef } from 'react';
// Third Party
import { Link } from 'react-router-dom';
// Local
import TwContainer from '../components/base/TwContainer';
import TwShowMovieCard from '../components/TwShowMovieCard';
import Confirm from '../components/modals/Confirm';
import TwSearchShowNavigation from '../components/search/TwSearchShowNavigation';
import Empty from '../components/empty';
import TwPageLoader from '../components/page-loader';
import TwReachedEnd from '../components/reached-end';

import { useAppDispatch, useAppSelector } from '../app/store';
import { useDeleteShowFromWatchingMutation } from "../app/api/towatch/watching";
import { useFetchShowTypesQuery } from '../app/api/towatch/lookups';
import { fetchWatching, fetchWatchingPagination } from '../app/features/watchingSlice';

const Watching = () => {
   const dispatch = useAppDispatch();
   const { list, isFetching, currentPage, totalPages } = useAppSelector((state) => state.watching);
   const confirmModal = useRef({});
   const selectedShow = useRef();
   const searchShow = useRef({});

   const { data: showTypes } = useFetchShowTypesQuery(null);
   const [deleteShowFromWatching] = useDeleteShowFromWatchingMutation();

   useEffect(() => {
      dispatch(fetchWatching());

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;

      dispatch(fetchWatchingPagination());
   };

   const onConfirmDelete = (watching) => {
      const collection = showTypes?.find(({ label }) => label === "Collection");

      deleteShowFromWatching({ id: watching._id, showTypeId: collection.id })
         .then(() => refetch());
   };

   const renderContent = () => {
      if (isFetching) {
         return <TwPageLoader />;
      }

      if (list.length > 0) {
         return (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 justify-items-center gap-4">
               {list.map((item) => (
                  <Link className="w-full" to={`/watching/${item._id}`} key={item._id}>
                     <TwShowMovieCard
                        name={item.show.name}
                        image={item.show.image.medium}
                        onDelete={() => {
                           confirmModal.current.open();
                           selectedShow.current = item;
                        }}
                        onWatched={() => console.log("watched")}
                        deleteable
                     />
                  </Link>
               ))}
            </div>
         );
      }

      return (
         <Empty
            buttonName="Search for a show"
            message="You haven't watched anything!"
            onClick={searchShow.current.openAddShowModal}
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
      <TwContainer className="mt-9">
         <TwSearchShowNavigation reference={searchShow} />

         <h1 className="text-2xl font-bold text-white mb-5">Watching</h1>

         {renderContent()}
         {renderListEnd()}

         <Confirm
            reference={confirmModal}
            text="Are you sure you want to delete this show from your watching list?"
            onConfirm={() => onConfirmDelete(selectedShow.current)}
         />
      </TwContainer>
   );
};

export default Watching;