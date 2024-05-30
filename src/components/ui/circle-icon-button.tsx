// Third party
import classNames from 'classnames';
import { ArrowDownCircle, Check, Eye, Play, Plus, Rewind, Trash, RefreshCcw, RotateCcw } from 'lucide-react';
// Local
import { Button, ButtonProps } from '@/components/ui/button';

interface Props extends ButtonProps {
  iconName?: 'plus' | 'refresh' | 'trash' | 'play' | 'reload' | 'eye' | 'rewind' | 'check' | 'arrow-down-circle';
  sizeClass?: string;
  onClick?: () => void;
  className?: string;
}

const CircleIconButton = (props: Props) => {
  const { iconName = 'Plus', sizeClass = 'h-6 w-6', onClick = () => { }
  } = props;

  const classes = classNames(
    'rounded-full drop-shadow-xl p-3 inline-flex items-center',
    props.className
  );

  const renderIcon = () => {
    switch (iconName) {
      case 'plus':
        return <Plus className={sizeClass} aria-hidden="true" />;
      case 'refresh':
        return <RefreshCcw className={sizeClass} aria-hidden="true" />;
      case 'trash':
        return <Trash className={sizeClass} aria-hidden="true" />;
      case 'play':
        return <Play className={sizeClass} aria-hidden="true" />;
      case 'reload':
        return <RotateCcw className={sizeClass} aria-hidden="true" />;
      case 'eye':
        return <Eye className={sizeClass} aria-hidden="true" />;
      case 'rewind':
        return <Rewind className={sizeClass} aria-hidden="true" />;
      case 'check':
        return <Check className={sizeClass} aria-hidden="true" />;
      case 'arrow-down-circle':
        return <ArrowDownCircle className={sizeClass} aria-hidden="true" />;
      default:
        return <Plus className={sizeClass} aria-hidden="true" />;
    }
  };

  return (
    <Button {...props} onClick={onClick}>
      {renderIcon()}
    </Button>
  );
};

export { CircleIconButton };