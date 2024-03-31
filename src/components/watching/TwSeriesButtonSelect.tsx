// Third Party
import classNames from "classnames";

type ItemType = {
   _id: string;
   number: number;
};

type Props = {
   list: ItemType[];
   buttonPrefix: 'S' | 'E';
   active: number;
   onChange: (item: ItemType) => void;
};

const TwSeriesButtonSelect = (props: Props) => {
   const activeClass = (season: number) => classNames(
      "absolute bottom-0 left-0 w-full shrink-0 h-1 rounded-full bg-indigo-500 transition-transform duration-300 scale-x-0 group-hover:scale-x-100",
      props.active == season ? 'scale-x-100' : 'scale-x-0'
   );

   return props.list.map((item) => (
      <button
         type="button"
         className="relative py-4 w-20 text-white text-center group"
         key={item._id}
         onClick={() => props.onChange(item)}>
         {props.buttonPrefix}{item.number < 10 ? `0${item.number}` : item.number}

         <div className={activeClass(item.number)}></div>
      </button>
   ));
};

export default TwSeriesButtonSelect;