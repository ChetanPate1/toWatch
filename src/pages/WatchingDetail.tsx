// Core
import { useEffect, useState } from 'react';
// Third Party
import { Link, useParams } from 'react-router-dom';
// Local
import TwContainer from '../components/base/TwContainer';
import TwCircleButton from '../components/base/TwCircleButton';
import TwCard from '../components/base/TwCard';
import TwEpisodeListItem from '../components/watching/TwEpisodeListItem';
import TwSeriesButtonSelect from '../components/watching/TwSeriesButtonSelect';
import { useFetchShowDetailsQuery, useToggleWatchingShowEpisodeMutation } from "../app/api/towatch/watching";
import { useFetchEpisodesForSeasonMutation } from '../app/api/towatch/lookups';

const WatchingDetail = () => {
   const [episodes, setEpisodes] = useState([]);
   const [activeSeason, setActiveSeason] = useState({ _id: '', number: 1 });
   const { id } = useParams();
   const { data, refetch } = useFetchShowDetailsQuery(id);
   const [fetchEpisodesForSeason] = useFetchEpisodesForSeasonMutation();
   const [toggleWatchingShowEpisode] = useToggleWatchingShowEpisodeMutation();

   useEffect(() => {
      if (data?.episode?.season) {
         onSeasonChange(data.episode.season);
      }
   }, [data]);

   const onSeasonChange = (season) => {
      setActiveSeason(season);
      fetchEpisodesForSeason(season._id).then((res) => {
         setEpisodes(markAsWatched(res.data));
      });
   };

   const markAsWatched = (episodes) => {
      return episodes.map(item => ({
         ...item,
         watched: item.season == data.episode.season._id && item.number <= data?.episode.number
      }));
   };

   const renderEpisodeList = (item) => {
      return item.map((item) => (
         <TwEpisodeListItem
            key={item.id}
            episode={item.number}
            title={item.name}
            watched={item.watched}
            onToggle={() => {
               toggleWatchingShowEpisode({ watchingId: data._id, episodeId: item._id })
                  .unwrap()
                  .then(() => refetch());
            }}
         />
      ));
   };

   if (!data) return null;

   return (
      <TwContainer className="max-w-none">
         <div className="flex gap-16 justify-items-center pt-20">
            <div className="flex grow justify-center">
               <img
                  src={data?.show?.image.original}
                  alt={data?.show?.name}
                  className="max-w-lg self-center rounded-3xl shadow-[0_0_100px_5px_rgba(99,102,241,0.5)]"
               />
            </div>

            <div className="flex-1 max-w-[612px]">
               <h1 className="text-3xl font-bold text-white mt-2 relative">
                  <Link to="/watching" className="absolute -left-16 -top-2">
                     <TwCircleButton type="backward" />
                  </Link>

                  {data?.show?.name}
               </h1>
               <div className="relative mb-4">
                  <div className="text-slate-300 text-sm mt-5 pb-6 h-[100px] overflow-y-scroll" dangerouslySetInnerHTML={{ __html: data?.show?.summary }}></div>
                  <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-neutral-900 pointer-events-none"></div>
               </div>

               <TwCard className="grid grid-flow-col rounded-full py-0 px-6 mb-2 w-full  overflow-x-auto scrollbar-none max-w-[612px]">
                  <TwSeriesButtonSelect
                     buttonPrefix="S"
                     list={data?.show?.seasons}
                     active={activeSeason.number}
                     onChange={(s) => onSeasonChange(s)}
                  />
               </TwCard>

               <TwCard className="min-h-96 max-h-[470px] overflow-y-auto py-1">
                  {renderEpisodeList(episodes)}
               </TwCard>
            </div>
         </div>
      </TwContainer>
   );
};

export default WatchingDetail;