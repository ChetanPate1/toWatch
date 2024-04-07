// Third Party
import { Link, useParams } from 'react-router-dom';
// Local
import TwContainer from '../components/base/TwContainer';
import TwPageLoader from '../components/page-loader';
import TwCircleButton from '../components/base/TwCircleButton';
import { useFetchMovieQuery } from '../app/api/towatch/movies';
import TwBadge from '../components/base/TwBadge';

const MovieDetail = () => {
   const { id } = useParams();
   const { data, isFetching } = useFetchMovieQuery(id);

   console.log({ data, id });

   const renderContent = () => {
      if (isFetching) {
         return <TwPageLoader />;
      }

      return (
         <div className="flex pt-20 justify-center">
            <div className="grid grid-cols-2 gap-16 content-center">
               <img
                  src={data.posterXL}
                  alt={data.title}
                  className="max-w-lg self-center rounded-3xl"
               />

               <div className="max-w-[555px]">
                  <h1 className="text-3xl font-bold text-white mt-2 relative">
                     <Link to="/watching" className="absolute -left-16 -top-2">
                        <TwCircleButton type="backward" />
                     </Link>

                     {data.title} <span className="text-sm text-slate-500">{data.year}</span>
                     <div>
                        {data.genre.split(', ').map((genre) => <TwBadge className="mr-1">{genre}</TwBadge>)}
                     </div>
                  </h1>

                  <div className="relative mb-4">
                     <div className="text-slate-300 text-sm mt-5" dangerouslySetInnerHTML={{ __html: data.plot }}></div>
                  </div>
               </div>
            </div>
         </div>
      )
   };

   return (
      <TwContainer className="mt-9">
         {renderContent()}
      </TwContainer>
   );
};

export default MovieDetail;