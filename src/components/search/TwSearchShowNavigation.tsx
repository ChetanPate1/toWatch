// Core
import { useImperativeHandle, useRef, useState } from "react";
// Thirt Party
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
// Local
import TwContainer from "../base/TwContainer";
import TwFormField from "../base/TwFormField";
import TwLoader from "../base/TwLoader";
import TwSearchResultItem from "./TwSearchResultItem";
import Base from "../modals/Base";
import TwCard from "../base/TwCard";
import TwButton from "../base/TwButton";
import TwSeriesButtonSelect from "../watching/TwSeriesButtonSelect";

import { useFindShowsMutation, useSaveShowMutation } from "../../app/api/towatch/shows";
import { useAddShowToWatchingMutation } from "../../app/api/towatch/watching";

type Props = {
  reference: any;
};

const TwSearchShowNavigation = (props: Props) => {
  const addShowModal = useRef({});
  const episodeSelectModal = useRef({});
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const [selectedShow, setSelectedShow] = useState({});
  const [activeSeason, setActiveSeason] = useState({ number: 1, episodes: [] });
  const [activeEpisode, setActiveEpisode] = useState({ number: 1 });

  const [findShows, { data: shows, isLoading }] = useFindShowsMutation();
  const [saveShow] = useSaveShowMutation();
  const [addShowToWatching] = useAddShowToWatchingMutation();

  useImperativeHandle(props.reference, () => ({
    openAddShowModal: () => addShowModal.current.open()
  }));

  const debounce = (func: () => void, delay: number) => {
    return function (...args: []) {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

      debounceTimeout.current = setTimeout(() => {
        func(...args);
        debounceTimeout.current = null;
      }, delay);
    }
  };

  const onChangeSearchText = (value: string) => {
    if (!isLoading) {
      findShows(value);
    }
  };

  const onSaveShow = (show) => {
    saveShow(show).unwrap()
      .then((data) => {
        setSelectedShow({
          ...show,
          _id: data._id,
          seasons: data.seasons
        });

        if (data.seasons[0]) {
          setActiveSeason(data.seasons[0]);
          setActiveEpisode(data.seasons[0].episodes[0]);
        }

        addShowModal.current.close();
        episodeSelectModal.current.open();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onAddShow = () => {
    addShowToWatching({ showId: selectedShow._id, episodeId: activeEpisode._id }).unwrap()
      .then(({ watching }) => navigate(`/watching/${watching._id}`))
      .catch(({ data }) => navigate(`/watching/${data.watching._id}`));
  };

  const debouncedOnChange = debounce(onChangeSearchText, 1000);

  const renderShowList = () => {
    if (isLoading) {
      return (
        <div className="mt-2 flex justify-center">
          <TwLoader show />
        </div>
      );
    }

    if (shows) {
      return shows.map(({ show }) => (
        <TwSearchResultItem
          key={show.id}
          name={show.name}
          image={show.image?.medium}
          released={show.premiered}
          genres={show.genres}
          summary={show.summary}
          onAdd={() => onSaveShow(show)}
          disabled={isLoading}
        />
      ));
    }

    return null;
  };

  return (
    <div className="fixed top-0 left-0 w-full py-3 bg-neutral-900 z-[45]">
      <TwContainer className="flex flex-row justify-center !mb-0">
        <div className="flex flex-row items-center">
          <MagnifyingGlassIcon className="h-4 w-4 text-zinc-500" aria-hidden="true" />
          <button type="button" className="rounded-md px-3 py-5 sm:text-sm text-gray-500" onClick={addShowModal.current.open}>
            Search for a show
          </button>
        </div>
      </TwContainer>

      <Base reference={addShowModal}>
        <h3 className="text-lg font-semibold leading-6 text-gray-400 mb-2">Track a show</h3>
        <TwFormField
          className="placeholder-gray-600 text-gray-200 bg-transparent !text-xl !p-0 border-none"
          id="searchShow"
          type="text"
          placeholder="Search for a show"
          onChange={debouncedOnChange}
        />

        <div className="mt-3 max-h-[700px] overflow-y-auto">
          {renderShowList()}
        </div>
      </Base>

      <Base reference={episodeSelectModal}>
        <TwSearchResultItem
          name={selectedShow.name}
          image={selectedShow.image?.medium}
          released={selectedShow.premiered}
          genres={selectedShow.genres}
          summary={selectedShow.summary}
        />

        <h3 className="text-lg font-semibold leading-6 text-gray-400 mt-5 mb-4">Where should we start?</h3>
        <div className="text-gray-300">
          <TwCard className="rounded-full py-0 px-6 mb-2 flex max-w-full overflow-y-auto">
            <TwSeriesButtonSelect
              buttonPrefix="S"
              list={selectedShow.seasons}
              active={activeSeason.number}
              onChange={(s) => setActiveSeason(s)}
            />
          </TwCard>

          <TwCard className="grid grid-cols-5 mb-7">
            <TwSeriesButtonSelect
              buttonPrefix="E"
              list={activeSeason.episodes}
              active={activeEpisode.number}
              onChange={(s) => setActiveEpisode(s)}
            />
          </TwCard>

          <div className="flex flex-col items-end">
            <TwButton onClick={onAddShow}>
              Start from <span className="ml-1 font-thin">
                {activeSeason.number == 1 && activeEpisode.number == 1 ? 'Beginning' : `Season ${activeSeason.number} Episode ${activeEpisode.number}`}
              </span>
            </TwButton>
          </div>
        </div>
      </Base>
    </div>
  );
};

export default TwSearchShowNavigation;