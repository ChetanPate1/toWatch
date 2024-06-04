// Core
import { useEffect, useRef, useState } from 'react';
// Local
import { CircleIconButton } from '@/components/ui/circle-icon-button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TwEpisodeListItem from '@/components/watching/TwEpisodeListItem';
import TwPageLoader from '@/components/page-loader';
import { useFetchShowDetailsQuery, useToggleWatchingShowEpisodeMutation } from "@/app/api/watching";
import { useFetchEpisodesForSeasonMutation } from '@/app/api/lookups';

type Props = {
   onBack: () => void;
   watchingId: string;
};

const WatchingDetail = (props: Props) => {
   const [episodes, setEpisodes] = useState([]);
   const activeEpisode = useRef({ _id: '', number: 1, season: { _id: 1 } });
   const [activeSeason, setActiveSeason] = useState({ _id: '', number: 1 });
   const { data: showDetails, isLoading } = useFetchShowDetailsQuery(props.watchingId);
   const [fetchEpisodesForSeason] = useFetchEpisodesForSeasonMutation();
   const [toggleWatchingShowEpisode] = useToggleWatchingShowEpisodeMutation();

   useEffect(() => {
      if (showDetails) {
         onSeasonChange(showDetails.episode.season._id);
         activeEpisode.current = showDetails.episode;
      }
   }, [showDetails]);

   const onSeasonChange = (seasonId: string) => {
      const season = findSeason(seasonId);

      if (season) {
         setActiveSeason(season);
      }

      fetchEpisodesForSeason(seasonId)
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
      if (showDetails.show.genres) {
         return showDetails.show.genres.map((genre: string) => (
            <Badge key={genre} className="ml-1">{genre}</Badge>
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

   const findSeason = (seasonId: string) => {
      if (showDetails) {
         return showDetails.show.seasons.find((s) => s._id == seasonId);
      }

      return null;
   };

   const markAsWatched = (episodes, on) => {
      return episodes.map((item) => ({
         ...item,
         watched: item.season == on.season._id && item.number <= on.number
      }));
   };

   if (isLoading) {
      return <TwPageLoader />;
   }

   if (!showDetails) return null;

   return (
      <div className="flex">
         <div className="flex justify-center items-center relative h-screen max-h-[900px] w-1/2 overflow-hidden" style={{ backgroundImage: `url(${showDetails.show?.image.original})`, backgroundPosition: '50% 50%', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <img
               src={showDetails.show?.image.original}
               alt={showDetails.show?.name}
               className="max-w-lg rounded-3xl absolute z-20"
            />
            <div className="absolute top-0 left-0 w-[99.2%] h-full bg-neutral-900 opacity-90 z-10"></div>
         </div>

         <div className="flex items-center px-20 w-full max-w-[750px]">
            <div className="text-left w-full">
               <h1 className="text-3xl font-bold mt-2 relative pl-16 text-white">
                  <CircleIconButton className="absolute left-0 top-0" iconname="rewind" onClick={props.onBack} />

                  {showDetails.show?.name} <span className="text-sm text-slate-500">{showDetails.show.premiered.split('-')[0]}</span>
               </h1>

               <div className="text-sm text-slate-300 mt-5 mb-7">
                  {showDetails.show.runtime ? `${showDetails.show.runtime} mins` : null} {renderGenres()}
               </div>

               <Card className="grid grid-flow-col rounded-full py-0 px-6 mb-2 w-full overflow-x-auto scrollbar-none">
                  <Tabs defaultValue={activeSeason._id} value={activeSeason._id} onValueChange={(seasonId) => onSeasonChange(seasonId)} className="w-[550px]">
                     <TabsList>
                        {showDetails.show?.seasons.map((s) => (
                           <TabsTrigger key={s._id} value={s._id} className="relative py-4 w-20">
                              S{s.number < 10 ? `0${s.number}` : s.number}
                           </TabsTrigger>
                        ))}
                     </TabsList>
                  </Tabs>
               </Card>

               <Card className="min-h-96 w-full max-h-[444px] overflow-y-auto scrollbar-none py-1">
                  {renderEpisodeList()}
               </Card>
            </div>
         </div>
      </div>
   );
};

export default WatchingDetail;