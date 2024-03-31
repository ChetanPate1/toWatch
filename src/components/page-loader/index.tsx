// Third Party
import classNames from "classnames";
// Local
import TwLoader from "../base/TwLoader";

type Props = {
  className?: string;
};

const TwPageLoader = (props: Props) => {
  const loaderClass = classNames(
    "w-full h-screen flex items-center justify-center",
    props.className
  );

  return (
    <div className={loaderClass}>
      <TwLoader show />
    </div>
  );
};

export default TwPageLoader;