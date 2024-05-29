// Local
import { Menu, Transition } from '@headlessui/react';
import { Card } from '@/components/ui/card';
import TwCircleButton from './base/TwCircleButton';
import { Fragment } from 'react';
import { EllipsisVerticalIcon, TrashIcon } from '@heroicons/react/24/outline';

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
      <Menu as="div" className="absolute top-2 right-2 z-50 inline-block text-left">
        <div>
          <Menu.Button className="flex items-center">
            <span className="sr-only">Open options</span>
            <EllipsisVerticalIcon className="h-5 w-5 text-white" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-90"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-90"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-40origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-1">
              <Menu.Item as="button" className="flex items-center w-full pl-3 pr-4 py-2 text-sm text-gray-700 hover:bg-red-100" onClick={(e) => { e.preventDefault(); props.onDelete() }}>
                <TrashIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" /> Delete
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

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