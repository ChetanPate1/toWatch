<script>
import TwCard from '@/components/base/TwCard.vue';
import TwCircleButton from '@/components/base/TwCircleButton';

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
  <div class="flex gap-2 justify-between py-2 border-b-2 border-zinc-800">
    <div class="flex gap-5 items-center text-sm">
      <div class="font-medium text-white text-center min-w-[30px]">
        {{ this.formatEpisodeNumber(episode) }}
      </div>

      <div>
        <p class="text-slate-200">{{ title }}</p>
      </div>
    </div>
    
    <div>
      <tw-circle-button type="eye" size="xs"></tw-circle-button>
    </div>
  </div>
</template>
