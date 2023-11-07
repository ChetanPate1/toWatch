<script>
import TwContainer from '@/components/base/TwContainer.vue';
import TwFormField from '@/components/base/TwFormField.vue';
import TwCard from '@/components/base/TwCard';
import TwCircleButton from '@/components/base/TwCircleButton.vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

export default {
  name: 'TwSearchShow',
  data() {
    return {
      search: '',
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
  components: {
    TwContainer,
    TwFormField,
    TwCard,
    TwCircleButton,
    MagnifyingGlassIcon
  }
};
</script>

<template>
  <div class="w-full py-5 bg-zinc-900">
    <tw-container class="flex flex-row justify-center">
      <div class="max-w-xl flex flex-row items-center transition-all" :class="{ 'flex-grow': isFocused }">
        <MagnifyingGlassIcon class="h-4 w-4 text-zinc-500" aria-hidden="true" />
        <tw-form-field 
          id="search" 
          v-model="search" 
          placeholder="Search for a show" 
          class="bg-transparent border-0 font-light"
          @focus="isFocused = true"
          @blur="isFocused = false"
        />
      </div>
    </tw-container>
  </div>
</template>
