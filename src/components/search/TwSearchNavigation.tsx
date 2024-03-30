// Thirt Party
import { Popover, PopoverPanel } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/outline";
import classNames from "classnames";
// Local
import TwContainer from "../base/TwContainer";
import TwCard from "../base/TwCard";
import TwFormField from "../base/TwFormField";
import TwLoader from "../base/TwLoader";
import TwSearchResultItem from "./TwSearchResultItem";

type Props = {
  name: string;
  image: string;
  released: string;
  genres: string[];
  summary: string;
  disabled: boolean;
};

const TwSearchNavigation = (props: Props) => {
  let isFocused = false;
  const shows = [];
  const form = {
    requesting: false,
    search: ''
  };

  const popoverClass = classNames(
    "relative max-w-xl",
    { 'flex-grow': isFocused });

  return (
    <div className="w-full py-5 bg-zinc-900 z-50">
      <TwContainer className="flex flex-row justify-center mb-0">

      </TwContainer>
    </div>
  );
};

TwSearchNavigation.defaultProps = {
  name: '',
  image: '',
  released: '',
  genres: [],
  summary: '',
  disabled: false
};

export default TwSearchNavigation;