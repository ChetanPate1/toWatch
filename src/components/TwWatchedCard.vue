<script>
import TwCard from '@/components/TwCard';
import TwCircleButton from './TwCircleButton.vue';

export default {
  name: 'TwWatchedCard',
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
  <tw-card class="group w-full max-w-sm min-h-[160px] pt-2 pb-2 pr-3 pl-[134px] relative overflow-hidden">
    <tw-circle-button type="trash" size="xs"
      class="absolute top-2 left-2 z-50 -translate-x-[130%] group-hover:translate-x-0 ease-out duration-300"
      @click="$emit('onDelete')"></tw-circle-button>

    <img class="absolute top-0 left-0 h-full z-0" :src="image" :alt="`${name} poster`" />

    <div class="flex flex-row items-center">
      <div class="h-1 w-full rounded-full bg-gray-200 relative overflow-hidden mr-2">
        <div class="absolute top-0 left-0 h-full rounded-full bg-indigo-600" :style="{ width: `50%` }" />
      </div>

      <div>
        <span class="flex items-center justify-center h-3 w-3 relative">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-200 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
      </div>
    </div>

    <h5 class="text-lg tracking-wide font-semibold mt-2">{{ name }}</h5>
    <p class="text-sm text-gray-500 mb-2">{{ episodeTitle }}</p>
    <p class="text-xs text-gray-500">{{ on }}</p>

    <TwCircleButton class="absolute bottom-3 right-12 transform-gpu" type="refresh" size="xs"
      @click="$emit('onRewatch')">
    </TwCircleButton>
    <TwCircleButton class="absolute bottom-3 right-2 transform-gpu" type="play" size="xs" @click="$emit('onContinue')">
    </TwCircleButton>
  </tw-card>
</template>
