// Core
import { useEffect, useRef, useState } from 'react';
// Thirty Party
import { useParams } from 'react-router-dom';
// Local
import TwContainer from '../components/base/TwContainer';
import TwShowMovieCard from '../components/TwShowMovieCard';
import Confirm from '../components/modals/Confirm';
import TwSearchShowNavigation from '../components/search/TwSearchShowNavigation';
import Empty from '../components/empty';
import TwPageLoader from '../components/page-loader';
import TwReachedEnd from '../components/reached-end';
import FullScreen from '../components/modals/FullScreen';
import WatchingDetail from './WatchingDetail';

import { useAppDispatch, useAppSelector } from '../app/store';
import { useDeleteShowFromWatchingMutation } from "../app/api/towatch/watching";
import { useFetchShowTypesQuery } from '../app/api/towatch/lookups';
import { fetchWatching, fetchWatchingPagination } from '../app/features/watchingSlice';
import { useUpdateShowMutation } from '../app/api/towatch/shows';

const Watching = () => {
   const dispatch = useAppDispatch();
   const route = useParams();
   const { list, isFetching, currentPage, totalPages } = useAppSelector((state) => state.watching);
   const confirmModal = useRef({});
   const selectedShow = useRef();
   const searchShow = useRef({});
   const watchingDetail = useRef({});
   const [watchingId, setWatchingId] = useState('');
   const [updateShow] = useUpdateShowMutation();
   const { data: showTypes } = useFetchShowTypesQuery(null);
   const [deleteShowFromWatching] = useDeleteShowFromWatchingMutation();

   useEffect(() => {
      dispatch(fetchWatching());

      if (route.id) {
         onWatchingDetail(route.id);
      }

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
         .then(() => dispatch(fetchWatching()));
   };

   const onWatchingDetail = (watchingId: string) => {
      setWatchingId(watchingId);
      watchingDetail.current.open();
   };

   const onRefresh = (showId: string) => {
      dispatch(updateShow(showId));
   };

   const onAddShow = (watchingId: string) => {
      dispatch(fetchWatching());
      onWatchingDetail(watchingId);
   };

   const renderContent = () => {
      if (isFetching) {
         return <TwPageLoader />;
      }

      if (list.length > 0) {
         return (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 justify-items-center gap-4">
               {list.map((item) => (
                  <a className="w-full hover:cursor-pointer"
                     key={item._id}
                     onClick={(e) => { e.preventDefault(); e.stopPropagation(); onWatchingDetail(item._id) }}>
                     <TwShowMovieCard
                        key={item._id}
                        name={item.show.name}
                        image={item.show.image.medium}
                        onDelete={() => {
                           confirmModal.current.open();
                           selectedShow.current = item;
                        }}
                        onRefresh={() => onRefresh(item.show._id)}
                        deleteable
                     />
                  </a>
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
      <TwContainer className="mt-24">
         <TwSearchShowNavigation reference={searchShow} onAddShow={onAddShow} />

         <h1 className="sr-only">Watching</h1>

         {renderContent()}
         {renderListEnd()}

         <Confirm
            reference={confirmModal}
            text="Are you sure you want to delete this show from your watching list?"
            onConfirm={() => onConfirmDelete(selectedShow.current)}
         />

         <FullScreen reference={watchingDetail}>
            <WatchingDetail watchingId={watchingId} onBack={watchingDetail.current.close} />
         </FullScreen>
      </TwContainer>
   );
};

export default Watching;