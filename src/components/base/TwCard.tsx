import react from "react";
import classNames from "classnames";

type Props = {
  children: react.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const TwCard = (props: Props) => {
  const cardClass = classNames(
    "shadow w-full p-5 rounded-2xl bg-zinc-900 border-2 border-zinc-800",
    props.className
  );


  return (
    <div className={cardClass} style={props.style}>
      {props.children}
    </div>
  );
};

export default TwCard;