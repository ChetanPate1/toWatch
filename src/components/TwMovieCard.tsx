// Third Party
import classNames from "classnames";
// Local
import TwCard from "./base/TwCard";
import TwCircleButton from "./base/TwCircleButton";

type Props = {
  name: string;
  image: string;
  movieId: string;
  id: string;
  deleteable: boolean;
  className?: string;
};

const TwMovieCard = (props: Props) => {
  const classes = classNames(
    "group max-w-[190px] h-[295px] relative overflow-hidden bg-center bg-no-repeat bg-cover",
    props.className
  );

  return (
    <TwCard
      className={classes}
      style={{ backgroundImage: `url(${props.image})` }}
    >
      <h5 className="absolute top-5 left-5 z-40 text-white text-lg font-medium tracking-wide">{props.name}</h5>
      <div className="absolute h-3/6 w-full top-0 left-0 opacity-80 bg-gradient-to-b from-zinc-900 z-30"></div>

      <TwCircleButton
        type="trash"
        size="xs"
        className="absolute top-2 left-2 z-50 -translate-x-[130%] group-hover:translate-x-0 ease-out duration-300 bg-red-500 hover:bg-red-600"
        onClick={() => console.log('delete')}
      ></TwCircleButton>
    </TwCard>
  );
};

export default TwMovieCard;