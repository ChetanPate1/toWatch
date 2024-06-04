// Core
import React from "react";
// Thirdy Party
import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const TwContainer = (props: Props) => {
  const containerClass = classNames(
    "mx-auto max-w-7xl px-5 sm:px-3 md:px-28",
    props.className
  );

  return (
    <div className={containerClass}>
      {props.children}
    </div>
  );
};

export default TwContainer;