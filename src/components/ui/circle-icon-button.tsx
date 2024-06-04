// Third party
import classNames from 'classnames';
import { ArrowDownCircle, Check, Eye, Play, Plus, Rewind, Trash, RefreshCcw, RotateCcw } from 'lucide-react';
// Local
import { Button, ButtonProps } from '@/components/ui/button';

interface Props extends ButtonProps {
  iconname?: 'plus' | 'refresh' | 'trash' | 'play' | 'reload' | 'eye' | 'rewind' | 'check' | 'arrow-down-circle';
  sizeclass?: string;
  onClick?: () => void;
  className?: string;
}

const CircleIconButton = (props: Props) => {
  const { iconname = 'Plus', sizeclass = 'h-4 w-4', onClick = () => { }
  } = props;

  const classes = classNames(
    'rounded-full',
    props.className
  );

  const renderIcon = () => {
    switch (iconname) {
      case 'plus':
        return <Plus className={sizeclass} aria-hidden="true" />;
      case 'refresh':
        return <RefreshCcw className={sizeclass} aria-hidden="true" />;
      case 'trash':
        return <Trash className={sizeclass} aria-hidden="true" />;
      case 'play':
        return <Play className={sizeclass} aria-hidden="true" />;
      case 'reload':
        return <RotateCcw className={sizeclass} aria-hidden="true" />;
      case 'eye':
        return <Eye className={sizeclass} aria-hidden="true" />;
      case 'rewind':
        return <Rewind className={sizeclass} aria-hidden="true" />;
      case 'check':
        return <Check className={sizeclass} aria-hidden="true" />;
      case 'arrow-down-circle':
        return <ArrowDownCircle className={sizeclass} aria-hidden="true" />;
      default:
        return <Plus className={sizeclass} aria-hidden="true" />;
    }
  };

  return (
    <Button size="icon" {...props} className={classes} onClick={onClick}>
      {renderIcon()}
    </Button>
  );
};

export { CircleIconButton };