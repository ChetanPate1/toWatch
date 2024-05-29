// Core
import { useEffect, useRef, useState } from 'react';
// Local
import TwCircleButton from '@/components/base/TwCircleButton';
import TwCard from '@/components/base/TwCard';
import TwEpisodeListItem from '@/components/watching/TwEpisodeListItem';
import TwSeriesButtonSelect from '@/components/watching/TwSeriesButtonSelect';
import TwPageLoader from '@/components/page-loader';
import TwBadge from '@/components/base/TwBadge';
import { useFetchShowDetailsMutation, useToggleWatchingShowEpisodeMutation } from "@/app/api/watching";
import { useFetchEpisodesForSeasonMutation } from '@/app/api/lookups';

type Props = {
   onBack: () => void;
   watchingId: string;
};

const WatchingDetail = (props: Props) => {
   const [episodes, setEpisodes] = useState([]);
   const activeEpisode = useRef({ _id: '', number: 1, season: { _id: 1 } });
   const [activeSeason, setActiveSeason] = useState({ _id: '', number: 1 });
   const [fetchShowDetails, { isLoading: isFetching, data }] = useFetchShowDetailsMutation();
   const [fetchEpisodesForSeason] = useFetchEpisodesForSeasonMutation();
   const [toggleWatchingShowEpisode] = useToggleWatchingShowEpisodeMutation();

   useEffect(() => {
      fetchShowDetails(props.watchingId)
         .unwrap()
         .then((data) => {
            activeEpisode.current = data.episode;
            onSeasonChange(data.episode.season);
         })
         .catch((err) => {
            console.error(err);
         });
   }, []);

   const onSeasonChange = (season) => {
      setActiveSeason(season);

      fetchEpisodesForSeason(season._id)
         .unwrap()
         .then((data) => {
            setEpisodes(markAsWatched(data, activeEpisode.current));
         });
   };

   const onToggleWatchingShowEpisode = (episode) => {
      toggleWatchingShowEpisode({ watchingId: props.watchingId, episodeId: episode._id })
         .unwrap()
         .then((data) => {
            activeEpisode.current = data.episode;

            setEpisodes(markAsWatched(episodes, data.episode));
         });
   };

   const renderGenres = () => {
      if (data.show.genres) {
         return data.show.genres.map((genre: string) => (
            <TwBadge key={genre} className="ml-1">{genre}</TwBadge>
         ));
      }

      return null;
   };

   const renderEpisodeList = () => {
      return episodes.map((item) => (
         <TwEpisodeListItem
            key={item.id}
            episode={item.number}
            title={item.name}
            watched={item.watched}
            onToggle={() => onToggleWatchingShowEpisode(item)}
         />
      ));
   };

   const markAsWatched = (episodes, on) => {
      return episodes.map((item) => ({
         ...item,
         watched: item.season == on.season._id && item.number <= on.number
      }));
   };

   if (isFetching) {
      return <TwPageLoader />;
   }

   if (!data) return null;

   return (
      <div className="flex">
         <div className="flex justify-center items-center relative h-screen w-1/2 overflow-hidden" style={{ backgroundImage: `url(${data?.show?.image.original})`, backgroundPosition: '50% 50%', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <img
               src={data?.show?.image.original}
               alt={data?.show?.name}
               className="max-w-lg rounded-3xl absolute z-20"
            />
            <div className="absolute top-0 left-0 w-[99.2%] h-full bg-neutral-900 opacity-90 z-10"></div>
         </div>

         <div className="flex items-center px-20 max-w-[750px]">
            <div className="text-left w-full">
               <h1 className="text-3xl font-bold text-white mt-2 relative pl-16">
                  <TwCircleButton className="absolute left-0 -top-2" type="backward" onClick={props.onBack} />

                  {data?.show?.name} <span className="text-sm text-slate-500">{data.show.premiered.split('-')[0]}</span>
               </h1>

               <div className="text-sm text-slate-300 mt-5 mb-7">
                  {data.show.runtime} mins {renderGenres()}
               </div>

               <TwCard className="grid grid-flow-col rounded-full py-0 px-6 mb-2 w-full overflow-x-auto scrollbar-none">
                  <TwSeriesButtonSelect
                     buttonPrefix="S"
                     list={data?.show?.seasons}
                     active={activeSeason.number}
                     onChange={(s) => onSeasonChange(s)}
                  />
               </TwCard>

               <TwCard className="min-h-96 w-full max-h-[444px] overflow-y-auto scrollbar-none py-1">
                  {renderEpisodeList()}
               </TwCard>
            </div>
         </div>
      </div>
   );
};

export default WatchingDetail;