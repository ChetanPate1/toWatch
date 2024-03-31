// Core
import { useRef } from 'react';
// Third Party
import { useNavigate } from 'react-router-dom';
// Local
import TwContainer from '../components/base/TwContainer';
import TwWatchedCard from '../components/TwWatchedCard';
import Confirm from '../components/modals/Confirm';
import Empty from '../components/empty';
import TwPageLoader from '../components/page-loader';
import {
   useContinueWatchingShowMutation,
   useDeleteWatchedShowMutation,
   useFetchWatchedShowsQuery,
   useRewatchShowMutation
} from '../app/api/towatch/watched-shows';
import TwSearchShowNavigation from '../components/search/TwSearchShowNavigation';

const Watched = () => {
   const navigate = useNavigate();
   const confirmModal = useRef({});
   const selectedShow = useRef();
   const searchShow = useRef({});
   const { data, isFetching, refetch } = useFetchWatchedShowsQuery({ currentPage: 1, showType: "Collection" });
   const [deleteWatchedShow] = useDeleteWatchedShowMutation();
   const [continueWatchingShow] = useContinueWatchingShowMutation();
   const [rewatchShow] = useRewatchShowMutation();

   const onConfirmDelete = (watched) => {
      deleteWatchedShow(watched.showId).then(() => refetch());
   };

   const handleContinue = (watched) => {
      continueWatchingShow(watched.showId).unwrap()
         .then(({ _id }) => navigate(`/watching/${_id}`))
         .catch(({ data }) => navigate(`/watching/${data._id}`));
   };

   const handleRewatch = (watched) => {
      rewatchShow(watched.showId).unwrap()
         .then(({ _id }) => navigate(`/watching/${_id}`))
         .catch(({ data }) => navigate(`/watching/${data._id}`));
   };

   const renderContent = () => {
      if (isFetching) {
         return <TwPageLoader />;
      }

      if (data?.watchedShows.length > 0) {
         return (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 justify-items-center gap-4">
               {data?.watchedShows?.map((item) => (
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

   return (
      <TwContainer className="mt-9">
         <TwSearchShowNavigation reference={searchShow} />

         <h1 className="text-2xl font-bold text-white mb-5">Watched</h1>

         {renderContent()}

         <Confirm
            reference={confirmModal}
            text="Are you sure you want to delete this show from your watching list?"
            onConfirm={() => onConfirmDelete(selectedShow.current)}
         />
      </TwContainer>
   );
};

export default Watched;