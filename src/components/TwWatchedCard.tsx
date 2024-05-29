// Third Party
import { EllipsisVerticalIcon, TrashIcon } from '@heroicons/react/24/outline';
// Local
import { Card } from '@/components/ui/card';
import TwCircleButton from './base/TwCircleButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from './ui/button';

type onType = {
  season: number;
  episode: number;
  name: string;
};

type Props = {
  image: string;
  name: string;
  on: onType;
  percentage: number;
  status: 'Running' | 'Ended';
  onDelete: () => void;
  onRewatch: () => void;
  onContinue: () => void;
  deleteable?: boolean;
};

const formatOn = (on: onType) => {
  const { season, episode } = on;
  const s = season < 10 ? `0${season}` : season;
  const e = episode < 10 ? `0${episode}` : episode;

  return `Season ${s} Episode ${e}`;
};

const TwWatchedCard = (props: Props) => {
  const renderStatus = () => {
    if (props.status != 'Ended') {
      return (
        <div className="flex items-center justify-center h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-200 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-neutral-900"></span>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center h-3 w-3 relative">
        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-neutral-900"></span>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-sm min-h-[160px] pt-2 pb-2 pr-3 pl-[134px] relative overflow-hidden">

      <div className="absolute top-2 right-2 z-50 inline-block text-left">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <span className="sr-only">Open options</span>
            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Button variant="destructive" className="w-full" onClick={(e) => { e.preventDefault(); props.onDelete() }}>
              <TrashIcon className="mr-3 h-5 w-5" aria-hidden="true" /> Delete
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <img className="absolute top-0 left-0 h-full z-0 rounded-2xl" src={props.image} alt={`${props.name} poster`} />

      <div className="absolute left-2 top-2">
        {renderStatus()}
      </div>

      <h5 className="w-full text-sm text-white tracking-wide font-semibold mt-1 text-nowrap text-ellipsis pr-4 overflow-hidden"
        title={props.name}>{props.name}</h5>

      <p className="text-sm text-gray-400 mb-1">{formatOn(props.on)}</p>
      <p className="text-xs text-gray-400 mb-2 text-nowrap text-ellipsis pr-4 overflow-hidden"
        title={props.on.name}>{props.on.name}</p>

      <div className="h-[8px] w-full rounded-full relative overflow-hidden mr-2 border-[2px] border-zinc-800">
        <div className="absolute top-0 left-0 h-full rounded-full bg-indigo-600" style={{ width: `${props.percentage}%` }} />
      </div>

      {props.percentage == 100 ? (
        <TwCircleButton
          className="absolute bottom-3 right-[55px] transform-gpu"
          type="refresh"
          size="xs"
          onClick={props.onRewatch}
        />
      ) : null}
      <TwCircleButton
        className="absolute bottom-3 right-2 transform-gpu"
        type="play"
        size="xs"
        onClick={props.onContinue}
      />
    </Card>
  );
};

export default TwWatchedCard;