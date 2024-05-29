// Third Party
import { ArchiveBoxIcon, EllipsisVerticalIcon, TrashIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
// Local
import { Card } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import TwCircleButton from "./base/TwCircleButton";

type Props = {
  name: string;
  image: string;
  deleteable: boolean;
  onDelete: () => void;
  onWatched?: () => void;
  onRefresh: () => void;
  className?: string;
};

const TwShowMovieCard = (props: Props) => {
  const classes = classNames(
    "group max-w-[190px] h-[295px] relative overflow-hidden bg-center bg-no-repeat bg-cover",
    props.className
  );

  const renderRefreshButton = () => {
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
    <Card
      className={classes}
      style={{ backgroundImage: `url(${props.image})` }}
    >
      {renderRefreshButton()}

      <h5 className="absolute w-full top-5 left-0 z-40 text-white text-lg font-medium tracking-wide text-nowrap text-ellipsis overflow-hidden px-5"
        title={props.name}>
        {props.name}
      </h5>
      <div className="absolute h-3/6 w-full top-0 left-0 opacity-80 bg-gradient-to-b from-zinc-900 z-30"></div>
      <div className="absolute top-2 right-2 z-40">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <span className="sr-only">Open options</span>
            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {props.onWatched ? (
              <Button
                variant="ghost"
                className="w-full"
                onClick={(e) => { e.stopPropagation(); e.preventDefault(); props.onWatched() }}>
                <ArchiveBoxIcon className="mr-3 h-5 w-5" aria-hidden="true" /> Watched
              </Button>
            ) : null}

            <Button
              variant="destructive"
              className="w-full"
              onClick={(e) => { e.stopPropagation(); e.preventDefault(); props.onDelete() }}>
              <TrashIcon className="mr-3 h-5 w-5" aria-hidden="true" /> Delete
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
};

export default TwShowMovieCard;