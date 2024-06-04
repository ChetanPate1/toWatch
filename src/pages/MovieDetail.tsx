// Local
import TwPageLoader from '@/components/page-loader';
import { CircleIconButton } from '@/components/ui/circle-icon-button';
import { Badge } from '@/components/ui/badge';
import { useFetchMovieQuery } from '@/app/api/movies';

type Props = {
   movieId: string;
   onBack: () => void;
};

const MovieDetail = (props: Props) => {
   const { data, isFetching } = useFetchMovieQuery(props.movieId);

   const renderGenres = () => {
      if (data.genre) {
         return data.genre.split(', ').map((genre: string) => (
            <Badge key={genre} className="ml-1">{genre}</Badge>
         ));
      }

      return null;
   };

   if (isFetching) {
      return <TwPageLoader />;
   }

   return (
      <div className="flex">
         <div className="flex justify-center items-center relative h-screen max-h-[900px] w-1/2 overflow-hidden" style={{ backgroundImage: `url(${data.posterXL})`, backgroundPosition: '50% 50%', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <img
               src={data.posterXL}
               alt={data.title}
               className="max-w-lg rounded-3xl absolute z-20"
            />
            <div className="absolute top-0 left-0 w-[99.2%] h-full bg-neutral-900 opacity-90 z-10"></div>
         </div>

         <div className="flex items-center px-20 max-w-[750px]">
            <div className="text-left">
               <h1 className="text-3xl font-bold text-white mt-2 relative pl-16">
                  <CircleIconButton className="absolute left-0 top-0" iconname="rewind" onClick={props.onBack} />

                  {data.title} <span className="text-sm text-slate-500">{data.year}</span>
               </h1>

               <div className="text-sm text-slate-300 mt-5">
                  {data.runtime} | {data.rated} {renderGenres()}
               </div>

               <div className="relative mb-4">
                  <div className="text-slate-300 text-sm mt-5" dangerouslySetInnerHTML={{ __html: data.plot }}></div>
               </div>

               <div className="flex items-center gap-5 mt-10">
                  <div className="flex items-center">
                     <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.4822 8.05031e-06C15.1789 0.00472041 10.0946 2.11554 6.34742 5.86828C2.60021 9.62102 0.49689 14.7084 0.500003 20.0117C0.503076 25.315 2.61239 30.4 6.36407 34.1484C10.1158 37.8968 15.2026 40.0016 20.506 40C25.8093 39.9985 30.8949 37.8906 34.6444 34.14C38.3938 30.3894 40.5001 25.3031 40.5 19.9998V19.9764C40.4938 14.6731 38.3815 9.58935 34.6275 5.8432C30.8736 2.09705 25.7855 -0.00474688 20.4822 8.05031e-06ZM20.3908 4.27438C24.5447 4.27063 28.5301 5.91689 31.4704 8.85113C34.4107 11.7854 36.0652 15.7673 36.07 19.9212V19.9393C36.07 24.0932 34.4201 28.0769 31.4833 31.0146C28.5465 33.9522 24.5632 35.6031 20.4093 35.6043C16.2555 35.6055 12.2712 33.9569 9.33272 31.0209C6.39421 28.085 4.74207 24.1022 4.73964 19.9484C4.73728 15.7946 6.38474 11.8099 9.31976 8.87064C12.2548 5.93135 16.237 4.27808 20.3908 4.27438Z" fill="#FFBD3F" />
                        <path d="M17.7181 32.9368L21.1281 29.5268L14.5615 22.9602C14.285 22.6837 13.9854 22.338 13.8242 21.9463C13.4555 21.163 13.2942 19.9418 14.1928 19.0432C15.2988 17.9372 16.7734 18.3981 18.2019 19.8266L24.5151 26.1398L27.9252 22.7297L21.3355 16.1401C21.059 15.8636 20.7364 15.4488 20.5751 15.1032C20.1374 14.2046 20.1604 13.0756 20.9668 12.2692C22.0958 11.1402 23.5704 11.5549 25.2063 13.1908L31.3352 19.3197L34.7453 15.9096L28.1095 9.27388C24.7455 5.90992 21.5889 6.02513 19.4231 8.19097C18.5936 9.02044 18.0867 9.89599 17.8333 10.8867C17.6259 11.7393 17.5568 12.6839 17.7411 13.6977L17.695 13.7438C16.0361 13.0526 14.1467 13.4673 12.6952 14.9189C10.7597 16.8543 10.8288 18.905 11.0593 20.1031L10.9901 20.1722L9.30816 18.8128L6.35892 21.762C7.39576 22.7067 8.63998 23.8587 10.0455 25.2642L17.7181 32.9368Z" fill="#F2F2F2" />
                     </svg>

                     <div className="text-white ml-2">{data.imdbRating}</div>
                  </div>

                  <div className="flex items-center">
                     <svg width="64" height="32" viewBox="0 0 64 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M60 0H4C1.79086 0 0 1.79086 0 4V28C0 30.2091 1.79086 32 4 32H60C62.2091 32 64 30.2091 64 28V4C64 1.79086 62.2091 0 60 0Z" fill="#F5C518" />
                        <path d="M8 25H13V7H8V25Z" fill="black" />
                        <path d="M23.6725 7L22.5535 15.4085L21.8582 10.835C21.6566 9.37009 21.4632 8.09175 21.2781 7H15V25H19.2416L19.2581 13.1138L21.0436 25H24.0634L25.7584 12.8518L25.7707 25H30V7H23.6725Z" fill="black" />
                        <path d="M32 25V7H39.8046C41.5694 7 43 8.41994 43 10.1766V21.8234C43 23.5778 41.5717 25 39.8046 25H32ZM37.8322 10.2395C37.6339 10.1323 37.2545 10.0807 36.7027 10.0807V21.8915C37.4313 21.8915 37.8797 21.7605 38.0478 21.4865C38.216 21.2166 38.3022 20.4861 38.3022 19.2872V12.3079C38.3022 11.494 38.272 10.974 38.216 10.7437C38.1599 10.5135 38.0349 10.3467 37.8322 10.2395Z" fill="black" />
                        <path d="M52.4299 11.5069H52.7495C54.5447 11.5069 56 12.9127 56 14.6449V21.862C56 23.5951 54.5452 25 52.7495 25H52.4299C51.3315 25 50.3603 24.4737 49.7719 23.6683L49.4839 24.7688H45V7H49.7843V12.7805C50.4025 12.0102 51.3552 11.5069 52.4299 11.5069ZM51.4056 20.2842V16.0191C51.4056 15.3143 51.3603 14.8519 51.2661 14.639C51.1718 14.4261 50.7956 14.2894 50.5317 14.2894C50.2678 14.2894 49.8608 14.4005 49.7816 14.5877V21.8075C49.8721 22.013 50.2602 22.1274 50.5317 22.1274C50.8031 22.1274 51.1982 22.0167 51.2812 21.8075C51.3641 21.5983 51.4056 21.0881 51.4056 20.2842Z" fill="black" />
                     </svg>
                     <div className="text-white ml-2">{data.metascore}</div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default MovieDetail;