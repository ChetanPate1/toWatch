<script>
import TwCard from '@/components/base/TwCard';

export default {
  name: 'TwShowCard',
  props: {
    name: String,
    image: String
  },
  components: {
    TwCard
  }
};
</script>

<template>
  <tw-card class="group max-w-[200px] h-[270px] relative overflow-hidden bg-center bg-no-repeat bg-cover" :style="{ 'background-image': 'url(' + image +')' }">
    <h5 class="absolute top-5 left-5 z-40 text-white text-lg font-medium tracking-wide">{{ name }}</h5>
    <div class="absolute h-3/6 w-full top-0 left-0 opacity-80 bg-gradient-to-b from-zinc-900 z-30">
    </div>
  </tw-card>
</template>
