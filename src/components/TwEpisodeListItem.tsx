// Local
import TwCircleButton from "./base/TwCircleButton";

type Props = {
  episode: number;
  title: string;
};

const TwEpisodeListItem = ({ episode, title }: Props) => {
  const formatEpisodeNumber = (n: number) => {
    return n < 10 ? `0${n}` : n;
  };

  return (
    <div className="flex gap-2 justify-between py-2 border-b-2 border-zinc-800">
      <div className="flex gap-5 items-center text-sm">
        <div className="font-medium text-white text-center min-w-[30px]">
          {formatEpisodeNumber(episode)}
        </div>

        <div>
          <p className="text-slate-200">{title}</p>
        </div>
      </div>

      <div>
        <TwCircleButton type="eye" size="xs"></TwCircleButton>
      </div>
    </div>
  );
};

export default TwEpisodeListItem;