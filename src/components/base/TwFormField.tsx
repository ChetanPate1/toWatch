// Third Party
import classNames from "classnames";

type Props = {
  className?: string;
  placeholder?: string;
  id: string;
  type?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

const TwFormField = (props: Props) => {
  const inputClass = classNames(
    "relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 sm:text-sm text-gray-100 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500",
    props.className
  );

  return (
    <input id={props.id} name={props.id} type={props.type} placeholder={props.placeholder}
      className={inputClass}
      disabled={props.disabled}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
};

TwFormField.defaultProps = {
  type: 'text',
  placeholder: '',
  className: '',
  disabled: false,
  onChange: () => { }
};

export default TwFormField;