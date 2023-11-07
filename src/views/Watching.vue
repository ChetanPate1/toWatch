<script>
import TwSearchShow from '@/components/search/TwSearchShow';
import TwShowMovieCard from '@/components/TwShowMovieCard';
import TwContainer from '@/components/base/TwContainer';
import TwFormField from '@/components/base/TwFormField';
import TwFormLabel from '@/components/base/TwFormLabel.vue';
import TwSwitch from '@/components/base/TwSwitch';
import TwButton from '@/components/base/TwButton';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  TabGroup, TabList, Tab
} from '@headlessui/vue';

import { mapState } from 'vuex';

export default {
  name: 'Watching',
  data() {
    return {
      addModal: false,
      deleteModal: {
        show: false,
        watchingId: null,
        showTypeId: null
      },
      selectedShow: {
        title: ''
      },
      search: ''
    }
  },
  async mounted() {
    await this.$store.dispatch('lookups/getEpisodeTags');
    await this.$store.dispatch('lookups/getShowTypes');
    await this.$store.dispatch('watching/getWatching', {
      currentPage: 1
    });

    this.initScroll();
  },
  computed: {
    ...mapState({
      watching: ({ watching }) => [
        {
          "_id": "6275908b835f2d0052ce1971",
          "episode": {
            "_id": "62759086835f2d0052ce190a",
            "name": "Home Economics",
            "season": {
              "number": 1
            },
            "number": 8,
            "airdate": "2009-11-05T00:00:00.000Z"
          },
          "show": {
            "_id": "62759086835f2d0052ce18fc",
            "genres": [
              "Comedy"
            ],
            "externals": [
              {
                "tvrage": 22589,
                "thetvdb": 94571,
                "imdb": "tt1439629"
              }
            ],
            "createdAt": "2022-05-06T21:17:58.047Z",
            "updatedAt": "2022-06-15T08:08:11.546Z",
            "id": 318,
            "name": "Community",
            "status": "Ended",
            "runtime": 30,
            "premiered": "2009-09-17T00:00:00.000Z",
            "rating": {
              "average": 8.4
            },
            "image": {
              "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/2/5134.jpg",
              "original": "https://static.tvmaze.com/uploads/images/original_untouched/2/5134.jpg"
            },
            "summary": "<p><b>Community </b>is a smart, exuberant comedy that is consistently ranked as one of the most inventive and original half-hours on television. This ensemble comedy centers around a tight-knit group of friends who all met at what is possibly the world's worst educational institution - Greendale Community College.</p>",
            "__v": 0,
            "seasons": [
              {
                "_id": "62759086835f2d0052ce18fd",
                "number": 1,
                "showId": "62759086835f2d0052ce18fc",
                "__v": 0,
                "createdAt": "2022-05-06T21:17:58.927Z",
                "updatedAt": "2022-06-15T08:08:08.539Z"
              },
              {
                "_id": "62759086835f2d0052ce18fe",
                "number": 2,
                "showId": "62759086835f2d0052ce18fc",
                "__v": 0,
                "createdAt": "2022-05-06T21:17:58.927Z",
                "updatedAt": "2022-06-15T08:08:08.539Z"
              },
              {
                "_id": "62759086835f2d0052ce18ff",
                "number": 3,
                "showId": "62759086835f2d0052ce18fc",
                "__v": 0,
                "createdAt": "2022-05-06T21:17:58.927Z",
                "updatedAt": "2022-06-15T08:08:08.539Z"
              },
              {
                "_id": "62759086835f2d0052ce1900",
                "number": 4,
                "showId": "62759086835f2d0052ce18fc",
                "__v": 0,
                "createdAt": "2022-05-06T21:17:58.927Z",
                "updatedAt": "2022-06-15T08:08:08.539Z"
              },
              {
                "_id": "62759086835f2d0052ce1901",
                "number": 5,
                "showId": "62759086835f2d0052ce18fc",
                "__v": 0,
                "createdAt": "2022-05-06T21:17:58.927Z",
                "updatedAt": "2022-06-15T08:08:08.539Z"
              },
              {
                "_id": "62759086835f2d0052ce1902",
                "number": 6,
                "showId": "62759086835f2d0052ce18fc",
                "__v": 0,
                "createdAt": "2022-05-06T21:17:58.927Z",
                "updatedAt": "2022-06-15T08:08:08.539Z"
              }
            ]
          },
          "behindCount": -102
        },
        {
          "_id": "62baca7801ad6d00527a0717",
          "episode": {
            "_id": "62baca6f01ad6d00527a06ee",
            "name": "Friends",
            "season": {
              "number": 3
            },
            "number": 10,
            "airdate": "2018-09-23T00:00:00.000Z"
          },
          "show": {
            "_id": "62baca6e01ad6d00527a06bb",
            "genres": [
              "Action",
              "Adventure",
              "Anime",
              "Fantasy"
            ],
            "externals": [
              {
                "tvrage": 35298,
                "thetvdb": 267440,
                "imdb": "tt2560140"
              }
            ],
            "createdAt": "2022-06-28T09:31:26.225Z",
            "updatedAt": "2022-06-28T09:31:26.225Z",
            "id": 919,
            "name": "Attack on Titan",
            "status": "Running",
            "runtime": 25,
            "premiered": "2013-04-07T00:00:00.000Z",
            "rating": {
              "average": 9
            },
            "image": {
              "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/311/779751.jpg",
              "original": "https://static.tvmaze.com/uploads/images/original_untouched/311/779751.jpg"
            },
            "summary": "<p>Known in Japan as Shingeki no Kyojin, many years ago, the last remnants of humanity were forced to retreat behind the towering walls of a fortified city to escape the massive, man-eating Titans that roamed the land outside their fortress. Only the heroic members of the Scouting Legion dared to stray beyond the safety of the walls – but even those brave warriors seldom returned alive. Those within the city clung to the illusion of a peaceful existence until the day that dream was shattered, and their slim chance at survival was reduced to one horrifying choice: kill – or be devoured!</p>",
            "__v": 0,
            "seasons": [
              {
                "_id": "62baca6e01ad6d00527a06bc",
                "number": 1,
                "showId": "62baca6e01ad6d00527a06bb",
                "__v": 0,
                "createdAt": "2022-06-28T09:31:27.102Z",
                "updatedAt": "2022-06-28T09:31:27.102Z"
              },
              {
                "_id": "62baca6e01ad6d00527a06bd",
                "number": 2,
                "showId": "62baca6e01ad6d00527a06bb",
                "__v": 0,
                "createdAt": "2022-06-28T09:31:27.102Z",
                "updatedAt": "2022-06-28T09:31:27.102Z"
              },
              {
                "_id": "62baca6e01ad6d00527a06be",
                "number": 3,
                "showId": "62baca6e01ad6d00527a06bb",
                "__v": 0,
                "createdAt": "2022-06-28T09:31:27.103Z",
                "updatedAt": "2022-06-28T09:31:27.103Z"
              },
              {
                "_id": "62baca6e01ad6d00527a06bf",
                "number": 4,
                "showId": "62baca6e01ad6d00527a06bb",
                "__v": 0,
                "createdAt": "2022-06-28T09:31:27.103Z",
                "updatedAt": "2022-06-28T09:31:27.103Z"
              }
            ]
          },
          "behindCount": -40
        },
        {
          "_id": "62bc1fca70fda1004130d6e2",
          "episode": {
            "_id": "5eee04c611c3e60040f027af",
            "name": "Salud",
            "season": {
              "number": 4
            },
            "number": 10,
            "airdate": "2011-09-18T00:00:00.000Z"
          },
          "show": {
            "_id": "5eee04c611c3e60040f0277f",
            "genres": [
              "Drama",
              "Crime",
              "Thriller"
            ],
            "externals": [
              {
                "tvrage": 18164,
                "thetvdb": 81189,
                "imdb": "tt0903747"
              }
            ],
            "createdAt": "2020-06-20T12:44:54.098Z",
            "updatedAt": "2022-12-06T08:19:22.459Z",
            "id": 169,
            "name": "Breaking Bad",
            "status": "Ended",
            "runtime": 60,
            "premiered": "2008-01-20T00:00:00.000Z",
            "rating": {
              "average": 9.2
            },
            "image": {
              "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/0/2400.jpg",
              "original": "https://static.tvmaze.com/uploads/images/original_untouched/0/2400.jpg"
            },
            "summary": "<p><b>Breaking Bad</b> follows protagonist Walter White, a chemistry teacher who lives in New Mexico with his wife and teenage son who has cerebral palsy. White is diagnosed with Stage III cancer and given a prognosis of two years left to live. With a new sense of fearlessness based on his medical prognosis, and a desire to secure his family's financial security, White chooses to enter a dangerous world of drugs and crime and ascends to power in this world. The series explores how a fatal diagnosis such as White's releases a typical man from the daily concerns and constraints of normal society and follows his transformation from mild family man to a kingpin of the drug trade.</p>",
            "__v": 0,
            "seasons": [
              {
                "_id": "5eee04c611c3e60040f02780",
                "__v": 0,
                "createdAt": "2020-06-20T12:44:54.846Z",
                "episodes": [
                  "5eee04c611c3e60040f02785",
                  "5eee04c611c3e60040f02786",
                  "5eee04c611c3e60040f02787",
                  "5eee04c611c3e60040f02788",
                  "5eee04c611c3e60040f02789",
                  "5eee04c611c3e60040f0278a",
                  "5eee04c611c3e60040f0278b"
                ],
                "number": 1,
                "showId": "5eee04c611c3e60040f0277f",
                "updatedAt": "2022-12-06T08:19:22.364Z"
              },
              {
                "_id": "5eee04c611c3e60040f02781",
                "__v": 0,
                "createdAt": "2020-06-20T12:44:54.846Z",
                "episodes": [
                  "5eee04c611c3e60040f0278c",
                  "5eee04c611c3e60040f0278d",
                  "5eee04c611c3e60040f0278e",
                  "5eee04c611c3e60040f0278f",
                  "5eee04c611c3e60040f02790",
                  "5eee04c611c3e60040f02791",
                  "5eee04c611c3e60040f02792",
                  "5eee04c611c3e60040f02793",
                  "5eee04c611c3e60040f02794",
                  "5eee04c611c3e60040f02795",
                  "5eee04c611c3e60040f02796",
                  "5eee04c611c3e60040f02797",
                  "5eee04c611c3e60040f02798"
                ],
                "number": 2,
                "showId": "5eee04c611c3e60040f0277f",
                "updatedAt": "2022-12-06T08:19:22.364Z"
              },
              {
                "_id": "5eee04c611c3e60040f02782",
                "__v": 0,
                "createdAt": "2020-06-20T12:44:54.846Z",
                "episodes": [
                  "5eee04c611c3e60040f02799",
                  "5eee04c611c3e60040f0279a",
                  "5eee04c611c3e60040f0279b",
                  "5eee04c611c3e60040f0279c",
                  "5eee04c611c3e60040f0279d",
                  "5eee04c611c3e60040f0279e",
                  "5eee04c611c3e60040f0279f",
                  "5eee04c611c3e60040f027a0",
                  "5eee04c611c3e60040f027a1",
                  "5eee04c611c3e60040f027a2",
                  "5eee04c611c3e60040f027a3",
                  "5eee04c611c3e60040f027a4",
                  "5eee04c611c3e60040f027a5"
                ],
                "number": 3,
                "showId": "5eee04c611c3e60040f0277f",
                "updatedAt": "2022-12-06T08:19:22.364Z"
              },
              {
                "_id": "5eee04c611c3e60040f02783",
                "__v": 0,
                "createdAt": "2020-06-20T12:44:54.846Z",
                "episodes": [
                  "5eee04c611c3e60040f027a6",
                  "5eee04c611c3e60040f027a7",
                  "5eee04c611c3e60040f027a8",
                  "5eee04c611c3e60040f027a9",
                  "5eee04c611c3e60040f027aa",
                  "5eee04c611c3e60040f027ab",
                  "5eee04c611c3e60040f027ac",
                  "5eee04c611c3e60040f027ad",
                  "5eee04c611c3e60040f027ae",
                  "5eee04c611c3e60040f027af",
                  "5eee04c611c3e60040f027b0",
                  "5eee04c611c3e60040f027b1",
                  "5eee04c611c3e60040f027b2"
                ],
                "number": 4,
                "showId": "5eee04c611c3e60040f0277f",
                "updatedAt": "2022-12-06T08:19:22.364Z"
              },
              {
                "_id": "5eee04c611c3e60040f02784",
                "__v": 0,
                "createdAt": "2020-06-20T12:44:54.846Z",
                "episodes": [
                  "5eee04c611c3e60040f027b3",
                  "5eee04c611c3e60040f027b4",
                  "5eee04c611c3e60040f027b5",
                  "5eee04c611c3e60040f027b6",
                  "5eee04c611c3e60040f027b7",
                  "5eee04c611c3e60040f027b8",
                  "5eee04c611c3e60040f027b9",
                  "5eee04c611c3e60040f027ba",
                  "5eee04c611c3e60040f027bb",
                  "5eee04c611c3e60040f027bc",
                  "5eee04c611c3e60040f027bd",
                  "5eee04c611c3e60040f027be",
                  "5eee04c611c3e60040f027bf",
                  "5eee04c611c3e60040f027c0",
                  "5eee04c611c3e60040f027c1",
                  "5eee04c611c3e60040f027c2"
                ],
                "number": 5,
                "showId": "5eee04c611c3e60040f0277f",
                "updatedAt": "2022-12-06T08:19:22.364Z"
              }
            ]
          },
          "behindCount": -19
        },
        {
          "_id": "60dde10044b78b0052f86ee8",
          "episode": {
            "_id": "5eee064611c3e60040f02e2a",
            "name": "What I Know",
            "season": {
              "number": 2
            },
            "number": 8,
            "airdate": "2020-10-09T00:00:00.000Z"
          },
          "show": {
            "_id": "5eee064611c3e60040f02e17",
            "genres": [
              "Drama",
              "Action",
              "Science-Fiction"
            ],
            "externals": [
              {
                "tvrage": null,
                "thetvdb": 355567,
                "imdb": "tt1190634"
              }
            ],
            "createdAt": "2020-06-20T12:51:18.362Z",
            "updatedAt": "2022-12-31T19:59:46.685Z",
            "id": 15299,
            "name": "The Boys",
            "status": "Running",
            "runtime": null,
            "premiered": "2019-07-26T00:00:00.000Z",
            "rating": {
              "average": 8.4
            },
            "image": {
              "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/409/1024044.jpg",
              "original": "https://static.tvmaze.com/uploads/images/original_untouched/409/1024044.jpg"
            },
            "summary": "<p>In a world where superheroes embrace the darker side of their massive celebrity and fame, <b>The Boys</b> centres on a group of vigilantes known informally as \"The Boys,\" who set out to take down corrupt superheroes with no more than blue collar grit and a willingness to fight dirty.</p>",
            "__v": 0,
            "seasons": [
              {
                "_id": "5eee064611c3e60040f02e18",
                "__v": 0,
                "createdAt": "2020-06-20T12:51:18.971Z",
                "episodes": [
                  "5eee064611c3e60040f02e1b",
                  "5eee064611c3e60040f02e1c",
                  "5eee064611c3e60040f02e1d",
                  "5eee064611c3e60040f02e1e",
                  "5eee064611c3e60040f02e1f",
                  "5eee064611c3e60040f02e20",
                  "5eee064611c3e60040f02e21",
                  "5eee064611c3e60040f02e22"
                ],
                "number": 1,
                "showId": "5eee064611c3e60040f02e17",
                "updatedAt": "2022-12-31T19:59:46.151Z"
              },
              {
                "_id": "5eee064611c3e60040f02e19",
                "__v": 0,
                "createdAt": "2020-06-20T12:51:18.971Z",
                "episodes": [
                  "5eee064611c3e60040f02e23",
                  "5eee064611c3e60040f02e24",
                  "5eee064611c3e60040f02e25",
                  "5eee064611c3e60040f02e26",
                  "5eee064611c3e60040f02e27",
                  "5eee064611c3e60040f02e28",
                  "5eee064611c3e60040f02e29",
                  "5eee064611c3e60040f02e2a"
                ],
                "number": 2,
                "showId": "5eee064611c3e60040f02e17",
                "updatedAt": "2022-12-31T19:59:46.152Z"
              },
              {
                "_id": "5eee064611c3e60040f02e1a",
                "__v": 0,
                "createdAt": "2020-06-20T12:51:18.971Z",
                "episodes": [],
                "number": 3,
                "showId": "5eee064611c3e60040f02e17",
                "updatedAt": "2022-12-31T19:59:46.152Z"
              }
            ]
          },
          "behindCount": -8
        },
        {
          "_id": "62e2ed573d3a6600525b94b4",
          "episode": {
            "_id": "62dc23a9fd7c570052767c2d",
            "name": "Missing White Woman Syndrome",
            "season": {
              "number": 3
            },
            "number": 3,
            "airdate": "2021-10-15T00:00:00.000Z"
          },
          "show": {
            "_id": "62dc23a8fd7c570052767c12",
            "genres": [
              "Drama",
              "Romance",
              "Thriller"
            ],
            "externals": [
              {
                "tvrage": null,
                "thetvdb": 336924,
                "imdb": "tt7335184"
              }
            ],
            "createdAt": "2022-07-23T16:36:56.237Z",
            "updatedAt": "2022-07-23T16:36:56.237Z",
            "id": 26856,
            "name": "You",
            "status": "Running",
            "runtime": null,
            "premiered": "2018-09-09T00:00:00.000Z",
            "rating": {
              "average": 7.4
            },
            "image": {
              "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/358/896520.jpg",
              "original": "https://static.tvmaze.com/uploads/images/original_untouched/358/896520.jpg"
            },
            "summary": "<p>A dangerously charming, intensely obsessive young man goes to extreme measures to insert himself into the lives of those he is transfixed by.</p>",
            "__v": 0,
            "seasons": [
              {
                "_id": "62dc23a8fd7c570052767c13",
                "number": 1,
                "showId": "62dc23a8fd7c570052767c12",
                "__v": 0,
                "createdAt": "2022-07-23T16:36:56.998Z",
                "updatedAt": "2022-07-23T16:36:56.998Z"
              },
              {
                "_id": "62dc23a8fd7c570052767c14",
                "number": 2,
                "showId": "62dc23a8fd7c570052767c12",
                "__v": 0,
                "createdAt": "2022-07-23T16:36:56.998Z",
                "updatedAt": "2022-07-23T16:36:56.998Z"
              },
              {
                "_id": "62dc23a8fd7c570052767c15",
                "number": 3,
                "showId": "62dc23a8fd7c570052767c12",
                "__v": 0,
                "createdAt": "2022-07-23T16:36:56.999Z",
                "updatedAt": "2022-07-23T16:36:56.999Z"
              },
              {
                "_id": "62dc23a8fd7c570052767c16",
                "number": 4,
                "showId": "62dc23a8fd7c570052767c12",
                "__v": 0,
                "createdAt": "2022-07-23T16:36:56.999Z",
                "updatedAt": "2022-07-23T16:36:56.999Z"
              }
            ]
          },
          "behindCount": -7
        },
        {
          "_id": "638f4aac390e1b0225278d4b",
          "episode": {
            "_id": "638f4aa7390e1b0225278d3e",
            "name": "Chapter III: Friend or Woe",
            "season": {
              "number": 1
            },
            "number": 3,
            "airdate": "2022-11-23T00:00:00.000Z"
          },
          "show": {
            "_id": "638f4aa6390e1b0225278d38",
            "genres": [
              "Comedy",
              "Mystery",
              "Supernatural"
            ],
            "externals": [
              {
                "tvrage": null,
                "thetvdb": 397060,
                "imdb": "tt13443470"
              }
            ],
            "createdAt": "2022-12-06T13:59:02.899Z",
            "updatedAt": "2022-12-06T13:59:02.899Z",
            "id": 53647,
            "name": "Wednesday",
            "status": "To Be Determined",
            "runtime": null,
            "premiered": "2022-11-23T00:00:00.000Z",
            "rating": {
              "average": 8.6
            },
            "image": {
              "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/433/1082578.jpg",
              "original": "https://static.tvmaze.com/uploads/images/original_untouched/433/1082578.jpg"
            },
            "summary": "<p><b>Wednesday</b> is a sleuthing, supernaturally infused mystery that follows Wednesday Addams as a student at Nevermore Academy where she attempts to master her emerging psychic ability while also thwart a monstrous killing spree terrorizing the local town and solve the supernatural mystery that embroiled her parents 25 years ago—all while navigating her new and very tangled relationships of the strange and diverse student body.</p>",
            "__v": 0,
            "seasons": [
              {
                "_id": "638f4aa7390e1b0225278d3a",
                "number": 1,
                "showId": "638f4aa6390e1b0225278d38",
                "__v": 0,
                "createdAt": "2022-12-06T13:59:03.170Z",
                "updatedAt": "2022-12-06T13:59:03.170Z"
              }
            ]
          },
          "behindCount": -5
        },
        {
          "_id": "619aca298b5b81004127bf4e",
          "episode": {
            "_id": "619aca208b5b81004127bf4d",
            "name": "Episode 12",
            "season": {
              "number": 3
            },
            "number": 12,
            "airdate": "2022-02-20T00:00:00.000Z"
          },
          "show": {
            "_id": "619aca1f8b5b81004127bf1d",
            "genres": [
              "Drama",
              "Action",
              "Anime",
              "Fantasy"
            ],
            "externals": [
              {
                "tvrage": null,
                "thetvdb": 348545,
                "imdb": "tt9335498"
              }
            ],
            "createdAt": "2021-11-21T22:37:19.547Z",
            "updatedAt": "2022-10-14T18:46:21.384Z",
            "id": 41469,
            "name": "Demon Slayer: Kimetsu no Yaiba",
            "status": "Running",
            "runtime": 30,
            "premiered": "2019-04-06T00:00:00.000Z",
            "rating": {
              "average": 8.4
            },
            "image": {
              "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/189/472604.jpg",
              "original": "https://static.tvmaze.com/uploads/images/original_untouched/189/472604.jpg"
            },
            "summary": "<p>Since ancient times, rumors have abounded of man-eating demons lurking in the woods. Because of this, the local townsfolk never venture outside at night. Legend has it that a demon slayer also roams the night, hunting down these bloodthirsty demons. For young Tanjiro, these rumors will soon to become his harsh reality… Ever since the death of his father, Tanjiro has taken it upon himself to support his family. Although their lives may be hardened by tragedy, they've found happiness. But that ephemeral warmth is shattered one day when Tanjiro finds his family slaughtered and the lone survivor, his sister Nezuko, turned into a demon. To his surprise, however, Nezuko still shows signs of human emotion and thought… Thus begins Tanjiro's quest to fight demons and turn his sister human again.</p>",
            "__v": 0,
            "seasons": [
              {
                "_id": "619aca1f8b5b81004127bf1e",
                "number": 1,
                "showId": "619aca1f8b5b81004127bf1d",
                "__v": 0,
                "createdAt": "2021-11-21T22:37:20.300Z",
                "updatedAt": "2022-10-14T18:46:21.125Z"
              },
              {
                "_id": "619aca1f8b5b81004127bf1f",
                "number": 2,
                "showId": "619aca1f8b5b81004127bf1d",
                "__v": 0,
                "createdAt": "2021-11-21T22:37:20.301Z",
                "updatedAt": "2022-10-14T18:46:21.125Z"
              },
              {
                "_id": "619aca1f8b5b81004127bf20",
                "number": 3,
                "showId": "619aca1f8b5b81004127bf1d",
                "__v": 0,
                "createdAt": "2021-11-21T22:37:20.301Z",
                "updatedAt": "2022-10-14T18:46:21.125Z"
              }
            ]
          },
          "behindCount": 0
        }
      ],
      episodeTagsList: ({ lookups }) => lookups.episodeTags,
      showTypeList: ({ lookups }) => lookups.showTypes,
      currentPage: ({ watching }) => watching.currentPage,
      totalPages: ({ watching }) => watching.totalPages,
      reachedEnd: ({ watching }) => {
        const { pageSize, currentPage, totalPages } = watching;

        if (watching.watching.length < pageSize) {
          return false;
        }

        return totalPages == currentPage;
      },
      requesting: ({ watching }) => watching.requesting
    })
  },
  methods: {
    onSelect(show) {
      this.selectedShow = show;
      this.addModal = true;
    },
    async onDelete(item) {
      this.deleteModal.show = true;
      this.deleteModal.watchingId = item._id;
    },
    async onConfirmDelete() {
      this.deleteModal.show = false;
      const { watchingId, showTypeId } = this.deleteModal;

      await this.$store.dispatch('watching/deleteWatching', {
        id: watchingId,
        showTypeId
      });

      await this.$store.dispatch('watching/getWatching', {
        currentPage: 1
      });
    },
    async onRefresh(id) {
      await this.$store.dispatch('shows/updateShow', id);
      this.$store.dispatch('watching/getWatching', {
        currentPage: this.currentPage
      });
    },
    initScroll() {
      window.onscroll = () => {
        const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.$store.dispatch('watching/getWatching', {
            currentPage: this.currentPage + 1
          });
        }
      };
    },
    formatOn(on) {
      const episodeNumber = on.number;
      const seasonNumber = on.season.number;
      const formatEpisodeNumber = episodeNumber < 10 ? `0${episodeNumber}` : episodeNumber;
      const formatSeasonNumber = seasonNumber < 10 ? `0${seasonNumber}` : seasonNumber;

      return `Season ${formatSeasonNumber} Episode ${formatEpisodeNumber}`;
    }
  },
  components: {
    TwSearchShow,
    TwShowMovieCard,
    TwContainer,
    TwFormField,
    TwFormLabel,
    TwButton,
    TwSwitch,
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogDescription,
    TabGroup, TabList, Tab
  }
};
</script>

<template>
  <tw-container>
    <tw-search-show  />

    <h1 class="text-5xl font-bold text-white mb-10">Watching</h1>

    <div class="flex flex-wrap gap-4">
      <tw-show-movie-card 
        v-for="item in watching" 
        :key="item._id"
        :name="item.show.name"
        :image="item.show.image.medium"
        @onDelete="onDelete(item)"
      />
    </div>

    <TransitionRoot appear :show="deleteModal.show" as="template">
      <Dialog as="div" class="relative z-10">
        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
          leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
        </TransitionChild>
    
        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95">
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                  Confirm Delete
                </DialogTitle>

                <div class="mt-2">
                  <p class="text-md text-gray-500 mb-4">
                    Are you sure you want to delete this show?
                  </p>
                </div>

                <tw-form-label id="showTypeId">Place show in:</tw-form-label>
                <tw-switch v-model="deleteModal.showTypeId" :options="showTypeList" value-key="label" />
  
                <div class="flex gap-2 justify-end mt-9">
                  <tw-button class="bg-indigo-50 hover:bg-indigo-100 text-indigo-600" size="sm" type="button" @click="deleteModal.show =false">
                    Cancel
                  </tw-button>
                  <tw-button size="sm" type="button" @click="onConfirmDelete">
                    Yes
                  </tw-button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </tw-container>
</template>



<style lang="scss"></style>
