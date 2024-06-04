// Core
import { useState } from 'react';
// Local
import TwContainer from '@/components/base/TwContainer';
import TwShowMovieCard from '@/components/TwShowMovieCard';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { fetchMostPopular } from '@/app/features/mostPopularSlice';

const MostPopular = () => {
   const dispatch = useAppDispatch();
   const { shows } = useAppSelector((state) => state.mostPopular);

   useState(() => {
      dispatch(fetchMostPopular());
   }, []);

   return (
      <TwContainer>
         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 justify-items-center gap-4">
            {shows.map((show) => (
               <TwShowMovieCard
                  key={show.id}
                  name={show.name}
                  image={show.image_thumbnail_path}
                  onDelete={() => { }}
                  deleteable={false}
               />
            ))}
         </div>
      </TwContainer>
   );
};

export default MostPopular;