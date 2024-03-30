// Local
import TwCard from './base/TwCard';

type Props = {
  name: string;
  image: string;
};

const TwShowCard = ({ name, image }: Props) => {
  return (
    <TwCard
      className="group max-w-[200px] h-[270px] relative overflow-hidden bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${image})` }}
    >
      <h5 className="absolute top-5 left-5 z-40 text-white text-lg font-medium tracking-wide">{name}</h5>
      <div className="absolute h-3/6 w-full top-0 left-0 opacity-80 bg-gradient-to-b from-zinc-900 z-30"></div>
    </TwCard>
  );
};

export default TwShowCard;