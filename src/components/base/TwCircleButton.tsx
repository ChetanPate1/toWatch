// Third party
import classNames from 'classnames';
import { PlusIcon, ArrowPathIcon, TrashIcon, PlayIcon, EyeIcon, BackwardIcon, TicketIcon, CheckIcon } from '@heroicons/react/24/outline';

type Props = {
  type: string;
  size: 'md' | 'xs';
  className?: string;
  onClick?: () => void;
};

const TwCircleButton = (props: Props) => {
  const sizes = {
    md: `
      inline-flex items-center 
      rounded-full
      border-2
      border-zinc-800
      bg-indigo-600
      p-3 
      text-white
      drop-shadow-2xl
      hover:bg-indigo-500
      hover:pointer
      focus:outline-none 
      focus:ring-2 
      focus:ring-white
      focus:ring-offset-2`
    ,
    xs: `
      inline-flex items-center 
      rounded-full
      border-2
      border-zinc-800
      bg-indigo-600
      p-3 
      text-white 
      drop-shadow-xl
      hover:bg-indigo-500
      hover:pointer
      focus:outline-none 
      focus:ring-2 
      focus:ring-white
      focus:ring-offset-2`
  };

  const classes = classNames(
    sizes[props.size],
    props.className
  );

  const sizeClass = props.size == 'md' ? 'h-6 w-6' : 'h-4 w-4';

  const renderIcon = () => {
    if (props.type == 'plus') {
      return <PlusIcon className={sizeClass} aria-hidden="true" />;
    }

    if (props.type == 'refresh') {
      return <ArrowPathIcon className={sizeClass} aria-hidden="true" />;
    }

    if (props.type == 'trash') {
      return <TrashIcon className={sizeClass} aria-hidden="true" />;
    }

    if (props.type == 'play') {
      return <PlayIcon className={sizeClass} aria-hidden="true" />;
    }

    if (props.type == 'reload') {
      return <ArrowPathIcon className={sizeClass} aria-hidden="true" />;
    }

    if (props.type == 'eye') {
      return <EyeIcon className={sizeClass} aria-hidden="true" />;
    }

    if (props.type == 'backward') {
      return <BackwardIcon className={sizeClass} aria-hidden="true" />;
    }

    if (props.type == 'check') {
      return <CheckIcon className={sizeClass} aria-hidden="true" />;
    }

    return null;
  };

  return (
    <button type="button" className={classes} onClick={props.onClick}>
      {renderIcon()}
    </button>
  );
};

TwCircleButton.defaultProps = {
  size: 'md',
  type: 'plus',
  onClick: () => { }
};

export default TwCircleButton;