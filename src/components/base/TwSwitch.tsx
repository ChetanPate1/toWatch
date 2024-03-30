// Core
import { Fragment } from 'react'
// Thirty Party
import { Tab } from '@headlessui/react';
import classNames from 'classnames';

type Props = {
  value: string;
  options: { label: string }[];
  onChange: (value: number) => void;
};

const TwSwitch = (props: Props) => {
  const activeClass = (selected: boolean) => classNames(
    'py-2 px-3 flex items-center justify-center rounded-md border border-transparent font-medium hover:bg-indigo-700 focus:outline-none text-sm w-full',
    { 'bg-indigo-600 text-white': selected },
    { 'bg-transparent hover:bg-transparent hover:text-indigo-600 ': !selected }
  );

  const renderTabs = () => {
    return props.options.map((item) => (
      <Tab as={Fragment} key={item.label}>
        {({ selected }) => (
          <button className={activeClass(selected)}>
            {item.label}
          </button>
        )}
      </Tab>
    ));
  };

  return (
    <Tab.Group onChange={props.onChange}>
      <Tab.List className="flex space-x-1 rounded-xl bg-slate-100 p-1">
        {renderTabs()}
      </Tab.List>
    </Tab.Group>
  );
};

export default TwSwitch;