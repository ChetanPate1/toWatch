// Third Party
import classNames from "classnames";

type Props = {
  show: boolean;
  className?: string;
};

const TwLoader = (props: Props) => {
  const loaderClass = classNames(
    "animate-spinner border-2 h-5 w-5 rounded-full border-indigo-500 border-b-indigo-900",
    props.className
  );

  if (props.show) {
    return (
      <div className={loaderClass}></div>
    );
  }

  return null;
};

TwLoader.defaultProps = {
  show: false
};

export default TwLoader;