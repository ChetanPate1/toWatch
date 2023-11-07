<script>
import TwCard from '@/components/base/TwCard';
import TwCircleButton from '@/components/base/TwCircleButton.vue';

export default {
  name: 'TwWatchingCard',
  props: {
    image: String,
    name: String,
    episodeTitle: String,
    on: String,
    id: String,
    deleteable: Boolean
  },
  components: {
    TwCard,
    TwCircleButton
  }
};
</script>

<template>
  <tw-card class="group w-full min-h-[500px] max-w-[338px] relative overflow-hidden rounded-3xl cursor-pointer bg-center bg-no-repeat bg-cover" :style="{ 'background-image': 'url(' + image +')' }">
    <tw-circle-button type="trash" size="xs"
      class="absolute bottom-4 left-4 z-50 -translate-x-[160%] group-hover:translate-x-0 ease-out duration-300"
      @click="$emit('onDelete')" />

    <tw-circle-button type="reload" size="xs"
      class="absolute bottom-4 right-4 z-50 translate-x-[160%] group-hover:translate-x-0 ease-out duration-300"
      @click="$emit('onRefresh')" />

    <h5 class="text-2xl text-white tracking-wide font-semibold mt-2 relative z-30">{{ name }}</h5>
    <p class="text-lg font-light text-gray-100 mb-2 relative z-30">{{ episodeTitle }}</p>
    <p class="text-sm text-white relative z-30">{{ on }}</p>

    <div class="absolute h-3/6 w-full top-0 left-0 opacity-70 bg-gradient-to-b from-zinc-900 z-10">
    </div>
  </tw-card>
</template>
