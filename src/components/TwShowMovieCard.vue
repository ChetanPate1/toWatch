<script>
import TwCard from '@/components/TwCard';
import TwCircleButton from '@/components/TwCircleButton.vue';

export default {
  name: 'TwShowMovieCard',
  props: {
    name: String,
    image: String,
    id: String,
    deleteable: {
      default: true,
      type: Boolean
    }
  },
  components: {
    TwCard,
    TwCircleButton
  }
};
</script>

<template>
  <tw-card class="group max-w-[190px] h-[295px] relative z-0 overflow-hidden bg-center bg-no-repeat bg-cover" :style="{ 'background-image': 'url(' + image +')' }">
    <h5 class="absolute top-5 left-5 z-40 text-white text-lg font-medium tracking-wide">{{ name }}</h5>
    <div class="absolute h-3/6 w-full top-0 left-0 opacity-80 bg-gradient-to-b from-zinc-900 z-30"></div>
    
    <tw-circle-button 
      v-if="deleteable"
      type="trash" 
      size="xs"
      class="absolute top-2 left-2 z-50 -translate-x-[130%] group-hover:translate-x-0 ease-out duration-300"
      @click="$emit('onDelete')">
    </tw-circle-button>
  </tw-card>
</template>
