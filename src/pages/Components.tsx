// Core
import { useState } from "react";
// Local
import TwContainer from "../components/base/TwContainer";
import TwButton from "../components/base/TwButton";
import TwCard from "../components/base/TwCard";
import TwCircleButton from "../components/base/TwCircleButton";
import TwEpisodeListItem from "../components/watching/TwEpisodeListItem";
import TwMovieCard from "../components/TwMovieCard";
import TwSearchResultItem from "../components/search/TwSearchResultItem";
import TwSwitch from "../components/base/TwSwitch";
import TwWatchingCard from "../components/TwWatchingCard";

const data = {
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
   searchResults: [{
      "score": 0.7030498,
      "show": {
         "id": 169,
         "url": "https://www.tvmaze.com/shows/169/breaking-bad",
         "name": "Breaking Bad",
         "type": "Scripted",
         "language": "English",
         "genres": ["Drama", "Crime", "Thriller"],
         "status": "Ended",
         "runtime": 60,
         "averageRuntime": 60,
         "premiered": "2008-01-20",
         "ended": "2019-10-11",
         "officialSite": "http://www.amc.com/shows/breaking-bad",
         "schedule": {
            "time": "22:00",
            "days": ["Sunday"]
         },
         "rating": {
            "average": 9.3
         },
         "weight": 99,
         "network": {
            "id": 20,
            "name": "AMC",
            "country": {
               "name": "United States",
               "code": "US",
               "timezone": "America/New_York"
            },
            "officialSite": null
         },
         "webChannel": null,
         "dvdCountry": null,
         "externals": {
            "tvrage": 18164,
            "thetvdb": 81189,
            "imdb": "tt0903747"
         },
         "image": {
            "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/0/2400.jpg",
            "original": "https://static.tvmaze.com/uploads/images/original_untouched/0/2400.jpg"
         },
         "summary": "<p><b>Breaking Bad</b> follows protagonist Walter White, a chemistry teacher who lives in New Mexico with his wife and teenage son who has cerebral palsy. White is diagnosed with Stage III cancer and given a prognosis of two years left to live. With a new sense of fearlessness based on his medical prognosis, and a desire to secure his family's financial security, White chooses to enter a dangerous world of drugs and crime and ascends to power in this world. The series explores how a fatal diagnosis such as White's releases a typical man from the daily concerns and constraints of normal society and follows his transformation from mild family man to a kingpin of the drug trade.</p>",
         "updated": 1683329190,
         "_links": {
            "self": {
               "href": "https://api.tvmaze.com/shows/169"
            },
            "previousepisode": {
               "href": "https://api.tvmaze.com/episodes/2007806"
            }
         }
      }
   }, {
      "score": 0.6969147,
      "show": {
         "id": 35848,
         "url": "https://www.tvmaze.com/shows/35848/breaking-homicide",
         "name": "Breaking Homicide",
         "type": "Documentary",
         "language": "English",
         "genres": ["Crime"],
         "status": "To Be Determined",
         "runtime": 60,
         "averageRuntime": 67,
         "premiered": "2018-04-15",
         "ended": null,
         "officialSite": "http://www.investigationdiscovery.com/tv-shows/breaking-homicide/",
         "schedule": {
            "time": "22:00",
            "days": ["Monday"]
         },
         "rating": {
            "average": 6.2
         },
         "weight": 86,
         "network": {
            "id": 89,
            "name": "Investigation Discovery",
            "country": {
               "name": "United States",
               "code": "US",
               "timezone": "America/New_York"
            },
            "officialSite": null
         },
         "webChannel": null,
         "dvdCountry": null,
         "externals": {
            "tvrage": null,
            "thetvdb": 344851,
            "imdb": "tt8137604"
         },
         "image": {
            "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/205/513139.jpg",
            "original": "https://static.tvmaze.com/uploads/images/original_untouched/205/513139.jpg"
         },
         "summary": "<p>Each week on <b>Breaking Homicide</b>, former Rhode Island Police Detective Derrick Levasseur and Forensic Psychologist Kris Mohandie will answer the pleas of a desperate family and investigate the cold case murder of their loved one.</p>",
         "updated": 1636994257,
         "_links": {
            "self": {
               "href": "https://api.tvmaze.com/shows/35848"
            },
            "previousepisode": {
               "href": "https://api.tvmaze.com/episodes/1677233"
            }
         }
      }
   }, {
      "score": 0.6965265,
      "show": {
         "id": 510,
         "url": "https://www.tvmaze.com/shows/510/breaking-in",
         "name": "Breaking In",
         "type": "Scripted",
         "language": "English",
         "genres": ["Comedy", "Action", "Crime"],
         "status": "Ended",
         "runtime": 30,
         "averageRuntime": 30,
         "premiered": "2011-04-06",
         "ended": "2012-08-22",
         "officialSite": "https://web.archive.org/web/20120701202417/http://www.fox.com/breakingin/",
         "schedule": {
            "time": "21:30",
            "days": ["Wednesday"]
         },
         "rating": {
            "average": 7.6
         },
         "weight": 78,
         "network": {
            "id": 4,
            "name": "FOX",
            "country": {
               "name": "United States",
               "code": "US",
               "timezone": "America/New_York"
            },
            "officialSite": "https://www.fox.com/"
         },
         "webChannel": null,
         "dvdCountry": null,
         "externals": {
            "tvrage": 26082,
            "thetvdb": 206751,
            "imdb": "tt1630574"
         },
         "image": {
            "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/8/22035.jpg",
            "original": "https://static.tvmaze.com/uploads/images/original_untouched/8/22035.jpg"
         },
         "summary": "<p>Contra Security, a high-tech security firm that takes extreme - and often questionable - measures to sell its protection services is corporate America's answer to \"The A-Team\", giving clients a sense of security by first ripping it away. In the opener, Contra's man of mystery owner, Oz, blackmails his newest recruit, computer hacker Cameron, to join his team. Cameron quickly learns that cracking into state-of-the-art security systems is a lot easier than dealing with his co-workers, including the alluring Melanie, prank-pulling Cash and competitive Josh.</p>",
         "updated": 1681950821,
         "_links": {
            "self": {
               "href": "https://api.tvmaze.com/shows/510"
            },
            "previousepisode": {
               "href": "https://api.tvmaze.com/episodes/46357"
            }
         }
      }

   }, {
      "score": 0.6891892,
      "show": {
         "id": 34677,
         "url": "https://www.tvmaze.com/shows/34677/breaking-mysterious",
         "name": "Breaking Mysterious",
         "type": "Documentary",
         "language": "English",
         "genres": ["Mystery", "History"],
         "status": "Ended",
         "runtime": 60,
         "averageRuntime": 60,
         "premiered": "2017-10-17",
         "ended": "2017-11-21",
         "officialSite": null,
         "schedule": {
            "time": "",
            "days": ["Tuesday"]
         },
         "rating": {
            "average": null
         },
         "weight": 71,
         "network": {
            "id": 910,
            "name": "H2",
            "country": {
               "name": "Canada",
               "code": "CA",
               "timezone": "America/Halifax"
            },
            "officialSite": null
         },
         "webChannel": null,
         "dvdCountry": null,
         "externals": {
            "tvrage": null,
            "thetvdb": null,
            "imdb": null
         },
         "image": {
            "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/144/361117.jpg",
            "original": "https://static.tvmaze.com/uploads/images/original_untouched/144/361117.jpg"
         },
         "summary": "<p><b>Breaking Mysterious</b> follows a group of truth-seekers as they investigate the biggest mysteries, extraordinary phenomena and theories in America.</p>",
         "updated": 1648509100,
         "_links": {
            "self": {
               "href": "https://api.tvmaze.com/shows/34677"
            },
            "previousepisode": {
               "href": "https://api.tvmaze.com/episodes/1402128"
            }
         }
      }
   }, {
      "score": 0.676875,
      "show": {
         "id": 1393,
         "url": "https://www.tvmaze.com/shows/1393/breaking-point",
         "name": "Breaking Point",
         "type": "Documentary",
         "language": "English",
         "genres": ["Crime"],
         "status": "Ended",
         "runtime": 60,
         "averageRuntime": 60,
         "premiered": "2015-01-15",
         "ended": "2015-05-14",
         "officialSite": "http://www.investigationdiscovery.com/tv-shows/breaking-point/",
         "schedule": {
            "time": "20:00",
            "days": ["Thursday"]
         },
         "rating": {
            "average": null
         },
         "weight": 55,
         "network": {
            "id": 89,
            "name": "Investigation Discovery",
            "country": {
               "name": "United States",
               "code": "US",
               "timezone": "America/New_York"
            },
            "officialSite": null
         },
         "webChannel": null,
         "dvdCountry": null,
         "externals": {
            "tvrage": 46898,
            "thetvdb": 290365,
            "imdb": "tt4245192"
         },
         "image": {
            "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/8/22061.jpg",
            "original": "https://static.tvmaze.com/uploads/images/original_untouched/8/22061.jpg"
         },
         "summary": "<p>This show features subjects who believe they are participating in a documentary about their life of crime. What they don't know is they will soon face an intervention that offers only two choices: accept treatment or face the possibility of prison time. Each surprise intervention is conducted by top criminal defense attorney and certified intervention professional Darren Kavinoky.</p>",
         "updated": 1655225448,
         "_links": {
            "self": {
               "href": "https://api.tvmaze.com/shows/1393"
            },
            "previousepisode": {
               "href": "https://api.tvmaze.com/episodes/157102"
            }
         }
      }
   }, {
      "score": 0.6704081,
      "show": {
         "id": 57880,
         "url": "https://www.tvmaze.com/shows/57880/bangkok-breaking",
         "name": "Bangkok Breaking",
         "type": "Scripted",
         "language": "Thai",
         "genres": ["Drama", "Crime"],
         "status": "To Be Determined",
         "runtime": null,
         "averageRuntime": 60,
         "premiered": "2021-09-23",
         "ended": null,
         "officialSite": "https://www.netflix.com/title/81287826",
         "schedule": {
            "time": "",
            "days": []
         },
         "rating": {
            "average": null
         },
         "weight": 65,
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
            "thetvdb": 404462,
            "imdb": "tt14202282"
         },
         "image": {
            "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/360/901524.jpg",
            "original": "https://static.tvmaze.com/uploads/images/original_untouched/360/901524.jpg"
         },
         "summary": "<p>Newly arrived in Bangkok, Wanchai joins the road rescue service and unravels a city-wide conspiracy with the help of a journalist.</p>",
         "updated": 1640354147,
         "_links": {
            "self": {
               "href": "https://api.tvmaze.com/shows/57880"
            },
            "previousepisode": {
               "href": "https://api.tvmaze.com/episodes/2178686"
            }
         }
      }
   },
   {
      "score": 0.66534007,
      "show": {
         "id": 531,
         "url": "https://www.tvmaze.com/shows/531/breaking-amish",
         "name": "Breaking Amish",
         "type": "Reality",
         "language": "English",
         "genres": [],
         "status": "Ended",
         "runtime": 60,
         "averageRuntime": 60,
         "premiered": "2012-09-09",
         "ended": "2014-11-20",
         "officialSite": "http://www.tlc.com/tv-shows/breaking-amish/",
         "schedule": {
            "time": "22:00",
            "days": ["Thursday"]
         },
         "rating": {
            "average": null
         },
         "weight": 45,
         "network": {
            "id": 80,
            "name": "TLC",
            "country": {
               "name": "United States",
               "code": "US",
               "timezone": "America/New_York"
            },
            "officialSite": null
         },
         "webChannel": null,
         "dvdCountry": null,
         "externals": {
            "tvrage": 32524,
            "thetvdb": 261926,
            "imdb": "tt2386354"
         },
         "image": {
            "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/82/206571.jpg",
            "original": "https://static.tvmaze.com/uploads/images/original_untouched/82/206571.jpg"
         },
         "summary": "<p><b>Breaking Amish</b> follows a fresh group of young men and women as they leave their conservative, rural communities behind for a chance to live in New York and fully experience English life. The new cast of five heads to Brooklyn, N.Y., to explore life beyond their Amish culture. Throughout their journey, their relationships are tested and life-altering choices must be made. By leaving their communities, they risk changing their lives and ties with their families for good, but they all believe that the chance to live in New York and pursue their dreams is well worth it.</p><p>This season presents new and different challenges as the cast adjusts to life in Brooklyn, where the cultures are countless and the temptations are at an all-time high. Using this opportunity to find themselves, the cast navigates through the nuances of the Brooklyn lifestyle and also makes time to visit the famous New York City landmarks to enjoy all the English things that the city has to offer. While they all have similar, conservative backgrounds, they must get used to not only a new city, but also each other and endure growing pains along the way. The trip to Brooklyn chronicles the tough decisions they must make to leave their families and friends behind.</p>",
         "updated": 1685321999,
         "_links": {
            "self": {
               "href": "https://api.tvmaze.com/shows/531"
            },
            "previousepisode": {
               "href": "https://api.tvmaze.com/episodes/231024"
            }
         }
      }
   }, {
      "score": 0.65625,
      "show": {
         "id": 7908,
         "url": "https://www.tvmaze.com/shows/7908/breaking-magic",
         "name": "Breaking Magic",
         "type": "Reality",
         "language": "English",
         "genres": [],
         "status": "Ended",
         "runtime": 30,
         "averageRuntime": 30,
         "premiered": "2012-11-11",
         "ended": "2014-04-30",
         "officialSite": "http://www.discovery.com/tv-shows/breaking-magic/",
         "schedule": {
            "time": "22:30",
            "days": ["Friday"]
         },
         "rating": {
            "average": null
         },
         "weight": 38,
         "network": {
            "id": 66,
            "name": "Discovery Channel",
            "country": {
               "name": "United States",
               "code": "US",
               "timezone": "America/New_York"
            },
            "officialSite": "https://www.discovery.com/"
         },
         "webChannel": null,
         "dvdCountry": null,
         "externals": {
            "tvrage": null,
            "thetvdb": 263737,
            "imdb": "tt2445546"
         },
         "image": {
            "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/28/72420.jpg",
            "original": "https://static.tvmaze.com/uploads/images/original_untouched/28/72420.jpg"
         },
         "summary": "<p><b>Breaking Magic</b> fuses the showmanship and mystery of street magic with the raw power of science. Watch as each trick surprises unsuspecting bystanders with mystifying results. Breaking Magic recruited today's freshest and most creative magicians to show you how science works with shocking tricks. Hidden cameras on the streets of London, Warsaw and New York City capture bystanders completely baffled by these magicians' unexpected tricks. Immediately following these demonstrations, each magician explains the scientific reality behind each illusion.</p>",
         "updated": 1573317392,
         "_links": {
            "self": {
               "href": "https://api.tvmaze.com/shows/7908"
            },
            "previousepisode": {
               "href": "https://api.tvmaze.com/episodes/439647"
            }
         }
      }
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
};

const Components = () => {
   const [form, setForm] = useState({
      switchValue: 'option 1'
   });
   const [open, setOpen] = useState(false);

   return (
      <TwContainer className="mt-6">
         <div className="grid grid-cols-3 gap-4">
            <div>
               <h3 className="text-2xl text-white mb-3">Card</h3>
               <TwCard className="mb-5">
                  <span className="text-white">tw-card</span>
               </TwCard>

               <TwMovieCard className="mb-5" name="Wednesday"
                  image="https://static.tvmaze.com/uploads/images/medium_portrait/433/1082578.jpg" />

               <TwMovieCard className="mb-5" name="Wednesday" episode-title="Chapter III: Friend or Woe"
                  on="Season 01 Episode 03" image="https://static.tvmaze.com/uploads/images/medium_portrait/433/1082578.jpg"
                  onDelete=""
                  onRewatch=""
                  onContinue=""
               />

               <TwWatchingCard
                  className="mb-5"
                  name="Wednesday"
                  episode-title="Chapter III: Friend or Woe" on="Season 01 Episode 03"
                  image="https://static.tvmaze.com/uploads/images/original_untouched/433/1082578.jpg" onDelete=""
                  onRewatch=""
                  onContinue=""
               />
            </div>

            <div>
               <h3 className="text-2xl text-white mt-3 mb-3">tw-episode-list-item</h3>
               {data.episodes.map(item => (
                  <TwEpisodeListItem
                     key={item._id}
                     episode={item.number}
                     title={item.name}
                  />
               ))}

               <h3 className="text-2xl text-white mt-3 mb-3">TwSearchResultItem</h3>

               {data.searchResults.map(item => (
                  <TwSearchResultItem
                     key={item.show.id}
                     image={item.show.image?.medium}
                     name={item.show.name}
                     summary={item.show.summary}
                     released={item.show.premiered}
                     onAdd={() => { }}
                  />
               ))}
            </div>

            <div>
               <h3 className="text-2xl text-white mb-3">TwButtons</h3>
               <TwButton>TwButton md</TwButton>
               <TwButton size="sm" className="mt-2">TwButton sm</TwButton>
               <TwButton size="xs" className="mt-2">TwButton xs</TwButton>
               <TwCircleButton className="mt-2" onClick={() => { }}></TwCircleButton>
               <TwCircleButton type="refresh" size="xs" className="mt-2" onClick={() => { }}></TwCircleButton>
               <TwCircleButton type="trash" size="xs" className="mt-2" onClick={() => { }}></TwCircleButton>

               <TwButton className="mt-2">Open search</TwButton>
            </div>

            <div>
               <TwSwitch
                  value={form.switchValue}
                  options={[{ label: 'option 1' }, { label: 'option 2' }]}
                  value-key="label"
               />
            </div>
         </div>
      </TwContainer>
   );
};

export default Components;