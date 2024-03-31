// Core
import { useRef } from 'react';
// Third Party
import { Link } from 'react-router-dom';
// Local
import TwContainer from '../components/base/TwContainer';
import TwShowMovieCard from '../components/TwShowMovieCard';
import Confirm from '../components/modals/Confirm';


import { useDeleteShowFromWatchingMutation, useFetchWatchingQuery } from "../app/api/towatch/watching";
import { useFetchShowTypesQuery } from '../app/api/towatch/lookups';
import TwSearchShowNavigation from '../components/search/TwSearchShowNavigation';
import Empty from '../components/empty';
import TwPageLoader from '../components/page-loader';

const Watching = () => {
   const confirmModal = useRef({});
   const selectedShow = useRef();
   const searchShow = useRef({});
   const { data, isFetching, refetch } = useFetchWatchingQuery({ currentPage: 1 });
   const { data: showTypes } = useFetchShowTypesQuery(null);
   const [deleteShowFromWatching] = useDeleteShowFromWatchingMutation();

   const onConfirmDelete = (watching) => {
      const collection = showTypes?.find(({ label }) => label === "Collection");

      deleteShowFromWatching({ id: watching._id, showTypeId: collection.id })
         .then(() => refetch());
   };

   const renderContent = () => {
      if (isFetching) {
         return <TwPageLoader />;
      }

      if (data?.watching.length > 0) {
         return (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 justify-items-center gap-4">
               {data?.watching?.map((item) => (
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

   return (
      <TwContainer className="mt-9">
         <TwSearchShowNavigation reference={searchShow} />

         <h1 className="text-2xl font-bold text-white mb-5">Watching</h1>

         {renderContent()}

         <Confirm
            reference={confirmModal}
            text="Are you sure you want to delete this show from your watching list?"
            onConfirm={() => onConfirmDelete(selectedShow.current)}
         />
      </TwContainer>
   );
};

export default Watching;