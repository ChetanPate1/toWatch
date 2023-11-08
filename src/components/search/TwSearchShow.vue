<script>
import TwContainer from '@/components/base/TwContainer.vue';
import TwFormField from '@/components/base/TwFormField.vue';
import TwCard from '@/components/base/TwCard';
import TwCircleButton from '@/components/base/TwCircleButton.vue';
import TwLoader from '@/components/base/TwLoader.vue';
import TwSearchResultItem from '@/components/search/TwSearchResultItem.vue';
// Third party
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { Popover, PopoverPanel, PopoverOverlay, PopoverButton, Transition } from '@headlessui/vue';
import { vue3Debounce } from 'vue-debounce';

import { mapState } from 'vuex';

export default {
  name: 'TwSearchShow',
  data() {
    return {
      form: {
        search: '',
        requesting: false
      },
      isFocused: false
    }
  },
  props: {
    name: String,
    image: String,
    movieId: String,
    id: String,
    deleteable: Boolean
  },
  computed: {
    ...mapState({
      shows: ({ shows }) => shows.showsFound
    })
  },
  methods: {
    async findShow() {
      this.form.requesting = true;
      await this.$store.dispatch('shows/showsGet', this.form.search);
      this.form.requesting = false;
    },
    async addSeries(show) {
      const data = await this.$store.dispatch('shows/save', show);
   
      await this.$store.dispatch('watching/addToWatching', {
        episodeId: data.seasons[0].episodes[0]._id,
        showId: data._id
      });
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
    PopoverOverlay,
    Transition
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
              placeholder="Search for a show" 
              class="bg-transparent border-0 font-light"
              v-debounce:1000="findShow"
              @focus="isFocused = true"
            />
          </form>

          <tw-loader class="absolute right-0" :show="form.requesting"/>
        </div>

        <PopoverPanel static v-if="isFocused" class="absolute z-10 text-white">
          <tw-card class="p-0 max-h-[700px] overflow-y-auto">
            <tw-search-result-item 
              v-for="item in shows"
              :key="item.id"
              :data="item"
              @on-add="(data) => { addSeries(data); isFocused = false; form.search = ''}"
              :disabled="form.requesting"
            />
          </tw-card>
        </PopoverPanel>
      </Popover>
    </tw-container>
  </div>
</template>
