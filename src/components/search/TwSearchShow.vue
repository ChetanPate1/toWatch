<script>
import TwContainer from '@/components/base/TwContainer.vue';
import TwFormField from '@/components/base/TwFormField.vue';
import TwCard from '@/components/base/TwCard';
import TwCircleButton from '@/components/base/TwCircleButton.vue';
import TwLoader from '@/components/base/TwLoader.vue';

import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { Popover, PopoverPanel, PopoverButton } from '@headlessui/vue';
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
      showsFound: ({ shows }) => shows.showsFound
    })
  },
  methods: {
    async findShow() {
      this.form.requesting = true;
      await this.$store.dispatch('shows/showsGet', this.form.search);
      this.form.requesting = false;
    },
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
    MagnifyingGlassIcon,
    Popover, 
    PopoverPanel,
    PopoverButton
  }
};
</script>

<template>
  <div class="w-full py-5 bg-zinc-900">
    <tw-container class="flex flex-row justify-center mb-0">
      <Popover class="relative max-w-xl  transition-all duration-500" :class="{ 'flex-grow': isFocused }">
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
              @blur="isFocused = false"
            />
          </form>

          <tw-loader class="absolute right-0" :show="form.requesting"/>
        </div>

        <PopoverPanel static v-if="isFocused" class="absolute z-10 text-white">
          
        </PopoverPanel>
      </Popover>
    </tw-container>
  </div>
</template>
