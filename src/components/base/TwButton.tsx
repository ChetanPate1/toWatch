import react from "react";
import classNames from "classnames";

type Props = {
  children: react.ReactNode;
  type?: "button" | "submit" | "reset";
  size: "md" | "sm" | "xs";
  onClick?: () => void;
  className?: string;
};

export const TwButton = (props: Props) => {
  const sizes = {
    md: `
      py-3 px-6
      flex
      items-center
      justify-center
      rounded-md border
      border-transparent
      bg-indigo-600
      hover:pointer
      hover:bg-indigo-700
      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
      scale-3`
    ,
    sm: `
      py-2 px-3
      flex
      items-center
      justify-center
      rounded-md border
      border-transparent
      bg-indigo-600
      hover:pointer
      hover:bg-indigo-700
      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
      scale-3
      text-sm`
    ,
    xs: `
      py-1 px-4
      flex
      items-center
      justify-center
      rounded-md border
      border-transparent
      bg-indigo-600
      hover:pointer
      hover:bg-indigo-700
      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
      scale-3
      text-xs`
  };

  const classes = classNames(
    "inline-flex items-center rounded px-2 py-0.5 text-xs font-medium text-white",
    sizes[props.size],
    props.className
  );

  return (
    <button type={props.type} className={classes} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

TwButton.defaultProps = {
  size: "md",
  type: "button",
  onClick: () => { }
};

export default TwButton;