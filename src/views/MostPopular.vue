<template lang="html">
  <div class="container-fluid fade-in">
    <div class="row show-layout">
        <div class="col-xs-6 col-sm-3 col-md-2" v-for="show in limit(shows, 18)" :key="show.id">
          <show-card
            :heading="show.name"
            :img-src="show.image_thumbnail_path"
            :deleteable="false">
          </show-card>
      </div>
    </div>
  </div>
</template>

<script>
import ShowCard from '@/components/ShowCard/ShowCard';
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
  methods: {
    limit(array, limit) {
      return array.slice(0, limit);
    }
  },
  components: {
    ShowCard
  }
};
</script>
