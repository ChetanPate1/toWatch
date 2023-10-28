<script>
import TwContainer from '@/components/TwContainer';
import TwShowCard from '@/components/TwShowCard';
import { mapState } from 'vuex';

export default {
  name: 'MostPopular',
  computed: {
    ...mapState({
      shows: ({ mostPopular }) => mostPopular.shows
    })
  },
  mounted() {
    this.$store.dispatch('mostPopular/getMostPopularShows');
  },
  components: {
    TwContainer,
    TwShowCard
  }
};
</script>

<template>
  <tw-container>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 justify-items-center gap-4">
      <tw-show-card 
        v-for="show in shows" 
        :key="show.id" 
        :name="show.name" 
        :image="show.image_thumbnail_path" 
      />
    </div>
  </tw-container>
</template>
