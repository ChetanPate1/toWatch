<script>
import TwContainer from '@/components/base/TwContainer.vue';
import TwFormField from '@/components/base/TwFormField.vue';
import TwCard from '@/components/base/TwCard';
import TwCircleButton from '@/components/base/TwCircleButton.vue';
import TwLoader from '@/components/base/TwLoader.vue';
import TwSearchResultItem from '@/components/search/TwSearchResultItem.vue';
// Third party
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { Popover, PopoverPanel, PopoverOverlay, PopoverButton } from '@headlessui/vue';
import { vue3Debounce } from 'vue-debounce';

import { mapState } from 'vuex';

export default {
  name: 'TwSearchMovie',
  data() {
    return {
      form: {
        search: '',
        requesting: false
      },
      isFocused: false
    }
  },
  computed: {
    ...mapState({
      movies: ({ movies }) => movies.moviesFound
    })
  },
  methods: {
    async find() {
      this.form.requesting = true;
      await this.$store.dispatch('movies/movieGet', this.form.search);
      console.log(this.movies);
      this.form.requesting = false;
    },
    async addMovie(movie) {
      await this.$store.dispatch('movieCollection/saveToMovieCollectionMovie', movie);
    },
    genresToArray(genres) {
      if(genres) {
        return genres.split(', ');
      }

      return [];
    }
  },
  directives: {
    debounce: vue3Debounce({ lock: true })
  },
  components: {
    TwContainer,
    TwFormField,
    TwCard,
    TwCircleButton,
    TwLoader,
    TwSearchResultItem,
    MagnifyingGlassIcon,
    Popover, 
    PopoverButton,
    PopoverPanel,
    PopoverOverlay
  }
};
</script>

<template>
  <div class="w-full py-5 bg-zinc-900 z-50">
    <tw-container class="flex flex-row justify-center mb-0">
      <Popover class="relative max-w-xl" :class="{ 'flex-grow': isFocused }">
        <div class="flex flex-row items-center">
          <MagnifyingGlassIcon class="h-4 w-4 text-zinc-500" aria-hidden="true" />
          <form name="search_show">
            <tw-form-field 
              id="search" 
              v-model="form.search" 
              placeholder="Search for a movie, year" 
              class="bg-transparent border-0 font-light"
              v-debounce:1000="find"
              @focus="isFocused = true"
            />
          </form>

          <tw-loader class="absolute right-0" :show="form.requesting"/>
        </div>

        <PopoverPanel static v-if="isFocused && movies.length" class="absolute z-10 text-white">
          <tw-card class="p-0 max-h-[700px] overflow-y-auto">
            <tw-search-result-item 
              v-for="item in movies"
              :key="item.imdbID"
              :name="item.Title"
              :image="item.Poster"
              :released="item.Released"
              :genres="genresToArray(item.Genre)"
              :summary="item.Plot"
              @on-add="() => { addMovie(item); isFocused = false; form.search = ''}"
              :disabled="form.requesting"
            />
          </tw-card>
        </PopoverPanel>
      </Popover>
    </tw-container>
  </div>
</template>
