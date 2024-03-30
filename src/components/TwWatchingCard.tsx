import classNames from 'classnames';
// Local
import TwCard from './base/TwCard';
import TwCircleButton from './base/TwCircleButton';

type Props = {
  name: string;
  image: string;
  episodeTitle: string;
  on: string;
  id: string;
  deleteable: boolean;
  className?: string;
};

const TwWatchingCard = (props: Props) => {
  const classes = classNames(
    'group w-full min-h-[500px] max-w-[338px] relative overflow-hidden rounded-3xl cursor-pointer bg-center bg-no-repeat bg-cover',
    props.className
  );

  return (
    <TwCard
      className={classes}
      style={{ backgroundImage: `url(${props.image})` }}
    >
      <TwCircleButton
        type="trash"
        size="xs"
        className="absolute bottom-4 left-4 z-50 -translate-x-[160%] group-hover:translate-x-0 ease-out duration-300"
        onClick={() => console.log('delete')}
      ></TwCircleButton>

      <TwCircleButton
        type="reload"
        size="xs"
        className="absolute bottom-4 right-4 z-50 translate-x-[160%] group-hover:translate-x-0 ease-out duration-300"
        onClick={() => console.log('refresh')}
      ></TwCircleButton>

      <h5 className="text-2xl text-white tracking-wide font-semibold mt-2 relative z-30">{props.name}</h5>
      <p className="text-lg font-light text-gray-100 mb-2 relative z-30">{props.episodeTitle}</p>
      <p className="text-sm text-white relative z-30">{props.on}</p>

      <div className="absolute h-3/6 w-full top-0 left-0 opacity-70 bg-gradient-to-b from-zinc-900 z-10"></div>
    </TwCard>
  );
};

export default TwWatchingCard;