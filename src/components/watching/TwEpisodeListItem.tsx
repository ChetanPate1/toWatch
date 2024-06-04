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
          iconname="check"
          sizeclass="h-4 w-4"
          onClick={onToggle}
        />
      );
    }

    return (
      <CircleIconButton
        variant="link"
        iconname="eye"
        sizeclass="h-4 w-4"
        onClick={onToggle}
      />
    );
  };

  return (
    <div className="flex gap-2 justify-between py-2 px-2 border-b-2 border-zinc-100 dark:border-zinc-800">
      <div className="flex gap-5 items-center text-sm">
        <div className="font-medium text-gray-800 dark:text-white text-center min-w-[30px]">
          {formatEpisodeNumber(episode)}
        </div>

        <div>
          <p className="text-gray-800 dark:text-white">{title}</p>
        </div>
      </div>

      <div>
        {renderWatchedButton()}
      </div>
    </div>
  );
};

export default TwEpisodeListItem;