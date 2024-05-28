// Core 
import { Fragment } from "react";
// Third Party
import { ArchiveBoxIcon, EllipsisVerticalIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
// Local
import TwCard from './base/TwCard';
import TwCircleButton from "./base/TwCircleButton";

type Props = {
  name: string;
  image: string;
  deleteable: boolean;
  onDelete: () => void;
  onWatched?: () => void;
  onRefresh?: () => void;
  className?: string;
};

const TwShowMovieCard = (props: Props) => {
  const classes = classNames(
    "group max-w-[190px] h-[295px] relative overflow-hidden bg-center bg-no-repeat bg-cover",
    props.className
  );

  const renderPlayButton = () => {
    if (props.onRefresh) {
      return (
        <TwCircleButton
          className="absolute bottom-3 right-2 transform-gpu border-none"
          type="arrow-down-circle"
          size="xs"
          onClick={(e) => { e.stopPropagation(); props.onRefresh() }}
        />
      );
    }

    return null;
  };

  return (
    <TwCard
      className={classes}
      style={{ backgroundImage: `url(${props.image})` }}
    >
      {renderPlayButton()}

      <h5 className="absolute w-full top-5 left-0 z-40 text-white text-lg font-medium tracking-wide text-nowrap text-ellipsis overflow-hidden px-5" title={props.name}>
        {props.name}
      </h5>
      <div className="absolute h-3/6 w-full top-0 left-0 opacity-80 bg-gradient-to-b from-zinc-900 z-30"></div>

      <Menu as="div" className="absolute top-2 right-2 z-40 inline-block text-left">
        <div>
          <Menu.Button className="flex items-center" onClick={(e) => { e.stopPropagation(); }}>
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
          <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-1">
              {props.onWatched ? (
                <Menu.Item as="button" className="flex items-center w-full pl-3 pr-4 py-2 text-sm rounded text-gray-700 hover:bg-indigo-100"
                  onClick={(e) => { e.stopPropagation(); e.preventDefault(); props.onWatched() }}>
                  <ArchiveBoxIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" /> Watched
                </Menu.Item>
              ) : null}
              <Menu.Item as="button" className="flex items-center w-full pl-3 pr-4 py-2 text-sm text-gray-700 hover:bg-red-100" onClick={(e) => { e.stopPropagation(); e.preventDefault(); props.onDelete() }}>
                <TrashIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" /> Delete
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </TwCard>
  );
};

export default TwShowMovieCard;