import react from "react";
import classNames from "classnames";

type Props = {
   children: react.ReactNode;
   className?: string;
};

export const TwBadge = (props: Props) => {
   const classes = classNames(
      "inline-flex items-center rounded bg-zinc-600 px-2 py-0.5 text-xs font-medium text-zinc-900",
      props.className
   );

   return (
      <div className={classes}>
         {props.children}
      </div>
   );
};

export default TwBadge;
