// Core
import { useEffect, useRef } from 'react';
// Third Party
import { useNavigate } from 'react-router-dom';
// Local
import TwContainer from '@/components/base/TwContainer';
import TwWatchedCard from '@/components/TwWatchedCard';
import Confirm from '@/components/modals/Confirm';
import Empty from '@/components/empty';
import TwPageLoader from '@/components/page-loader';
import TwSearchShowNavigation from '@/components/search/TwSearchShowNavigation';
import TwReachedEnd from '@/components/reached-end';
import {
   useContinueWatchingShowMutation,
   useDeleteWatchedShowMutation,
   useRewatchShowMutation
} from '@/app/api/watched-shows';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { fetchWatchedShows, fetchWatchedShowsPagination } from '@/app/features/watchedShowSlice';

const Watched = () => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const { list, isFetching, currentPage, totalPages } = useAppSelector((state) => state.watchedShow);
   const confirmModal = useRef({});
   const selectedShow = useRef();
   const searchShow = useRef({});

   const [deleteWatchedShow] = useDeleteWatchedShowMutation();
   const [continueWatchingShow] = useContinueWatchingShowMutation();
   const [rewatchShow] = useRewatchShowMutation();

   useEffect(() => {
      dispatch(fetchWatchedShows());

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;

      if (!isFetching) {
         dispatch(fetchWatchedShowsPagination());
      }
   };

   const onConfirmDelete = (watched) => {
      deleteWatchedShow(watched.showId).then(() => dispatch(fetchWatchedShows()));
   };

   const handleContinue = (watched) => {
      continueWatchingShow(watched.showId).unwrap()
         .then((data) => navigate(`/watching/${data._id}`))
         .catch(({ data }) => navigate(`/watching/${data._id}`));
   };

   const handleRewatch = (watched) => {
      rewatchShow(watched.showId).unwrap()
         .then((data) => navigate(`/watching/${data._id}`))
         .catch(({ data }) => navigate(`/watching/${data._id}`));
   };

   const renderContent = () => {
      if (isFetching) {
         return <TwPageLoader />;
      }

      if (list.length > 0) {
         return (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 justify-items-center gap-4">
               {list.map((item) => (
                  <TwWatchedCard
                     key={item._id}
                     name={item.name}
                     image={item.poster}
                     on={item.on}
                     status={item.status}
                     percentage={item.percentage}
                     onContinue={() => handleContinue(item)}
                     onRewatch={() => handleRewatch(item)}
                     onDelete={() => {
                        confirmModal.current.open();
                        selectedShow.current = item;
                     }}
                  />
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
         <TwSearchShowNavigation reference={searchShow} onAddShow={() => { }} />

         <h1 className="sr-only">Watched</h1>

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

export default Watched;