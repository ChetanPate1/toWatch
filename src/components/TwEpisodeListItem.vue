<script>
import TwCard from './TwCard.vue';
import TwCircleButton from './TwCircleButton';

export default {
  name: 'TwEpisodeIListItem',
  props: {
    episode: Number,
    title: String
  },
  methods: {
    formatEpisodeNumber(n) {
      return n < 10 ? `0${n}` : n;
    }
  },
  components: {
    TwCard,
    TwCircleButton
  }
};
</script>

<template>
  <tw-card class="p-4">
    <div class="flex space-x-2">
      <div class="flex-1 flex-col">
        <h3 class="text-xs font-medium">Episode {{ this.formatEpisodeNumber(episode) }}</h3>
        <p class="text-sm text-gray-500">{{ title }}</p>
      </div>

      <div>
        <tw-circle-button type="eye" size="xs"></tw-circle-button>
      </div>
    </div>
  </tw-card>
</template>
