// Local
import { CircleIconButton } from "@/components/ui/circle-icon-button";

type Props = {
  episode: number;
  title: string;
  watched: boolean;
  onToggle: () => void;
};

const TwEpisodeListItem = ({ episode, title, watched, onToggle }: Props) => {
  const formatEpisodeNumber = (n: number) => {
    return n < 10 ? `0${n}` : n;
  };

  const renderWatchedButton = () => {
    if (watched) {
      return (
        <CircleIconButton
          className="border-none"
          iconName="check"
          sizeClass="h-4 w-4"
          onClick={onToggle}
        />
      );
    }

    return (
      <CircleIconButton
        className="bg-transparent border-none hover:bg-transparent text-white hover:text-indigo-300"
        iconName="eye"
        sizeClass="h-4 w-4"
        onClick={onToggle}
      />
    );
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
        {renderWatchedButton()}
      </div>
    </div>
  );
};

export default TwEpisodeListItem;