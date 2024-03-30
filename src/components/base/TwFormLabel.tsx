import react from 'react';

type Props = {
  children: react.ReactNode;
  for: string;
};

const TwFormLabel = (props: Props) => (
  <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-2">
    {props.children}
  </label>
);

export default TwFormLabel;