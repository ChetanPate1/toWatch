<template>
  <tw-container class="mt-6">
    <div class="grid grid-cols-3 gap-4">
      <div>
        <h3 class="text-2xl text-white mb-3">Card</h3>
        <tw-card class="mb-5">
          <span class="text-white">tw-card</span>
        </tw-card>

        <tw-movie-card class="mb-5" name="Wednesday"
          image="https://static.tvmaze.com/uploads/images/medium_portrait/433/1082578.jpg" />

        <tw-watched-card class="mb-5" name="Wednesday" episode-title="Chapter III: Friend or Woe"
          on="Season 01 Episode 03" image="https://static.tvmaze.com/uploads/images/medium_portrait/433/1082578.jpg"
          @onDelete="" @onRewatch="" @onContinue="" />

        <tw-watching-card 
          class="mb-5"
          name="Wednesday" 
          episode-title="Chapter III: Friend or Woe" on="Season 01 Episode 03"
          image="https://static.tvmaze.com/uploads/images/original_untouched/433/1082578.jpg" @onDelete="" @onRewatch=""
          @onContinue="" />
      </div>

      <div>
        <h3 class="text-2xl text-white mt-3 mb-3">tw-episode-list-item</h3>
        <ul role="list">
          <li v-for="item in episodes" :key="item._id" class="mb-1">
            <tw-episode-list-item :episode="item.number" :title="item.name" />
          </li>
        </ul>
      </div>

      <div>
        <h3 class="text-2xl text-white mb-3">Buttons</h3>
        <tw-button>tw-button md</tw-button>
        <tw-button size="sm" class="mt-2">tw-button sm</tw-button>
        <tw-button size="xs" class="mt-2">tw-button xs</tw-button>
        <tw-circle-button class="mt-2"></tw-circle-button>
        <tw-circle-button type="refresh" size="xs" class="mt-2"></tw-circle-button>
        <tw-circle-button type="trash" size="xs" class="mt-2"></tw-circle-button>

        <tw-button @click="open = true" class="mt-2">Open search</tw-button>
      </div>

      <div>
        <tw-switch v-model="form.switchValue" :options="[{ label: 'option 1' }, { label: 'option 2' }]" value-key="label" />
      </div>

    </div>
  </tw-container>
</template>

<script>
import TwContainer from '@/components/base/TwContainer';
import TwCard from '@/components/base/TwCard';
import TwMovieCard from '@/components/TwMovieCard';
import TwWatchedCard from '@/components/TwWatchedCard';
import TwWatchingCard from '@/components/TwWatchingCard';
import TwButton from '@/components/base/TwButton';
import TwCircleButton from '@/components/base/TwCircleButton';
import TwEpisodeListItem from '@/components/TwEpisodeListItem';
import TwBadge from '@/components/base/TwBadge';
import TwLoader from '@/components/base/TwLoader';
import TwFormLabel from '@/components/base/TwFormLabel';
import TwFormField from '@/components/base/TwFormField';
import TwSwitch from '@/components/base/TwSwitch';

import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';

export default {
  data() {
    return {
      open: false,
      form: {
        textField: null,
        switchValue: 'option 1'
      },
      episodes:
        [{
          "_id": "619aca208b5b81004127bf42",
          "id": 2202422,
          "name": "Sound Hashira Tengen Uzui",
          "season": "619aca1f8b5b81004127bf20",
          "number": 1,
          "airdate": "2021-12-05T00:00:00.000Z",
          "runtime": 60,
          "__v": 0,
          "createdAt": "2021-11-21T22:37:20.327Z",
          "updatedAt": "2022-10-14T18:46:22.165Z"
        }, {
          "_id": "619aca208b5b81004127bf43",
          "id": 2202423,
          "name": "Infiltrating the Entertainment District",
          "season": "619aca1f8b5b81004127bf20",
          "number": 2,
          "airdate": "2021-12-12T00:00:00.000Z",
          "runtime": 30,
          "__v": 0,
          "createdAt": "2021-11-21T22:37:20.327Z",
          "updatedAt": "2022-10-14T18:46:22.165Z"
        }, {
          "_id": "619aca208b5b81004127bf44",
          "id": 2218484,
          "name": "What Are You?",
          "season": "619aca1f8b5b81004127bf20",
          "number": 3,
          "airdate": "2021-12-19T00:00:00.000Z",
          "runtime": 30,
          "__v": 0,
          "createdAt": "2021-11-21T22:37:20.327Z",
          "updatedAt": "2022-10-14T18:46:22.165Z"
        }, {
          "_id": "619aca208b5b81004127bf45",
          "id": 2202424,
          "name": "Tonight",
          "season": "619aca1f8b5b81004127bf20",
          "number": 4,
          "airdate": "2021-12-26T00:00:00.000Z",
          "runtime": 30,
          "__v": 0,
          "createdAt": "2021-11-21T22:37:20.327Z",
          "updatedAt": "2022-10-14T18:46:22.165Z"
        }, {
          "_id": "619aca208b5b81004127bf46",
          "id": 2202425,
          "name": "Things Are Gonna Get Real Flashy!!",
          "season": "619aca1f8b5b81004127bf20",
          "number": 5,
          "airdate": "2022-01-02T00:00:00.000Z",
          "runtime": 30,
          "__v": 0,
          "createdAt": "2021-11-21T22:37:20.327Z",
          "updatedAt": "2022-10-14T18:46:22.165Z"
        }, {
          "_id": "619aca208b5b81004127bf47",
          "id": 2202426,
          "name": "Layered Memories",
          "season": "619aca1f8b5b81004127bf20",
          "number": 6,
          "airdate": "2022-01-09T00:00:00.000Z",
          "runtime": 30,
          "__v": 0,
          "createdAt": "2021-11-21T22:37:20.327Z",
          "updatedAt": "2022-10-14T18:46:22.165Z"
        }, {
          "_id": "619aca208b5b81004127bf48",
          "id": 2202427,
          "name": "Transformation",
          "season": "619aca1f8b5b81004127bf20",
          "number": 7,
          "airdate": "2022-01-16T00:00:00.000Z",
          "runtime": 30,
          "__v": 0,
          "createdAt": "2021-11-21T22:37:20.327Z",
          "updatedAt": "2022-10-14T18:46:22.165Z"
        }, {
          "_id": "619aca208b5b81004127bf49",
          "id": 2202428,
          "name": "Gathering",
          "season": "619aca1f8b5b81004127bf20",
          "number": 8,
          "airdate": "2022-01-23T00:00:00.000Z",
          "runtime": 30,
          "__v": 0,
          "createdAt": "2021-11-21T22:37:20.327Z",
          "updatedAt": "2022-10-14T18:46:22.165Z"
        }, {
          "_id": "619aca208b5b81004127bf4a",
          "id": 2202429,
          "name": "Defeating an Upper Rank Demon",
          "season": "619aca1f8b5b81004127bf20",
          "number": 9,
          "airdate": "2022-01-30T00:00:00.000Z",
          "runtime": 30,
          "__v": 0,
          "createdAt": "2021-11-21T22:37:20.327Z",
          "updatedAt": "2022-10-14T18:46:22.165Z"
        }, {
          "_id": "619aca208b5b81004127bf4b",
          "id": 2202430,
          "name": "Never Give Up",
          "season": "619aca1f8b5b81004127bf20",
          "number": 10,
          "airdate": "2022-02-06T00:00:00.000Z",
          "runtime": 30,
          "__v": 0,
          "createdAt": "2021-11-21T22:37:20.327Z",
          "updatedAt": "2022-10-14T18:46:22.165Z"
        }, {
          "_id": "619aca208b5b81004127bf4c",
          "id": 2202431,
          "name": "No Matter How Many Lives",
          "season": "619aca1f8b5b81004127bf20",
          "number": 11,
          "airdate": "2022-02-13T00:00:00.000Z",
          "runtime": 30,
          "__v": 0,
          "createdAt": "2021-11-21T22:37:20.328Z",
          "updatedAt": "2022-10-14T18:46:22.166Z"
        }, {
          "_id": "619aca208b5b81004127bf4d",
          "id": 2202432,
          "name": "Episode 12",
          "season": "619aca1f8b5b81004127bf20",
          "number": 12,
          "airdate": "2022-02-20T00:00:00.000Z",
          "runtime": 30,
          "__v": 0,
          "createdAt": "2021-11-21T22:37:20.328Z",
          "updatedAt": "2022-02-03T10:06:25.404Z"
        }],
      shows: [
        {
          "score": 0.90789413,
          "show": {
            "id": 53647,
            "url": "https://www.tvmaze.com/shows/53647/wednesday",
            "name": "Wednesday",
            "type": "Scripted",
            "language": "English",
            "genres": ["Comedy", "Mystery", "Supernatural"],
            "status": "To Be Determined",
            "runtime": null,
            "averageRuntime": 51,
            "premiered": "2022-11-23",
            "ended": null,
            "officialSite": "https://www.netflix.com/title/81231974",
            "schedule": {
              "time": "",
              "days": []
            },
            "rating": {
              "average": 8.6
            },
            "weight": 100,
            "network": null,
            "webChannel": {
              "id": 1,
              "name": "Netflix",
              "country": null,
              "officialSite": "https://www.netflix.com/"
            },
            "dvdCountry": null,
            "externals": {
              "tvrage": null,
              "thetvdb": 397060,
              "imdb": "tt13443470"
            },
            "image": {
              "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/433/1082578.jpg",
              "original": "https://static.tvmaze.com/uploads/images/original_untouched/433/1082578.jpg"
            },
            "summary": "<p><b>Wednesday</b> is a sleuthing, supernaturally infused mystery that follows Wednesday Addams as a student at Nevermore Academy where she attempts to master her emerging psychic ability while also thwart a monstrous killing spree terrorizing the local town and solve the supernatural mystery that embroiled her parents 25 years ago—all while navigating her new and very tangled relationships of the strange and diverse student body.</p>",
            "updated": 1670119054,
            "_links": {
              "self": {
                "href": "https://api.tvmaze.com/shows/53647"
              },
              "previousepisode": {
                "href": "https://api.tvmaze.com/episodes/2382730"
              }
            }
          }
        }
      ]
    }
  },
  components: {
    TwContainer,
    TwCard,
    TwMovieCard,
    TwWatchedCard,
    TwWatchingCard,
    TwButton,
    TwCircleButton,
    TwEpisodeListItem,
    TwBadge,
    TwLoader,
    TwFormLabel,
    TwFormField,
    TwSwitch,

    MagnifyingGlassIcon,

    Combobox,
    ComboboxInput,
    ComboboxOptions,
    ComboboxOption,
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot
  }
}
</script>
