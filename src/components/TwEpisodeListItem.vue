<script>
import TwCard from './TwCard.vue';

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
    TwCard
  }
};
</script>

<template>
  <tw-card class="p-4">
    <div class="flex space-x-2">
      <div class="flex-1">
        <div class="flex items-center justify-between">
          <h3 class="text-xs font-medium">
            Episode {{ this.formatEpisodeNumber(episode) }} </h3>
        </div>
        <p class="text-sm text-gray-500">{{ title }}</p>
      </div>
    </div>
  </tw-card>
</template>
