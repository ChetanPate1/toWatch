// Local
import { CircleIconButton } from "@/components/ui/circle-icon-button";
import { Badge } from "@/components/ui/badge";

type Props = {
   name: string;
   image: string;
   released?: string;
   genres?: string[];
   summary: string;
   disabled?: boolean;
   onAdd?: () => void;
};

const TwSearchResultItem = (props: Props) => {
   const extractYear = (date: string): string => {
      if (!date) return "-";
      const dateObj = new Date(date);

      return `${dateObj.getFullYear()}`;
   };

   return (
      <div className=" p-5 border-b-2 border-zinc-800">
         <div className="flex gap-5 text-sm">
            <div>
               <img className="min-w-[100px] max-w-[100px] h-auto rounded-lg border-2 border-zinc-800" src={props.image} />
            </div>

            <div>
               <div className="flex flex-row flex-1 justify-between">
                  <p className="text-slate-200 font-bold mb-2">{props.name}
                     <span className="text-slate-500 text-xs"> {extractYear(props.released || '')}</span>
                  </p>
                  {props.onAdd ? <CircleIconButton iconName="plus" sizeClass="h-4 w-4" onClick={props.onAdd} /> : null}
               </div>

               {props.genres?.map((item) => (
                  <Badge className="mr-2" key={item}>{item}</Badge>
               ))}

               <div className="relative mb-4">
                  <div className="text-slate-400 text-xs mt-5 pb-6 h-[80px] overflow-y-scroll" dangerouslySetInnerHTML={{ __html: props?.summary }}></div>
                  <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-neutral-900 pointer-events-none"></div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default TwSearchResultItem;