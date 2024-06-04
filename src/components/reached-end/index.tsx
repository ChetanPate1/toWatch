// Third Party
import classNames from "classnames";

type Props = {
  className?: string;
};

const TwReachedEnd = (props: Props) => {
  const styleClass = classNames(
    "flex justify-center mt-5 py-5 rounded-xl text-center bg-neutral-100 dark:bg-neutral-800 text-neutral-600",
    props.className
  );

  return (
    <div className={styleClass}>
      Reached End
    </div>
  );
};

export default TwReachedEnd;