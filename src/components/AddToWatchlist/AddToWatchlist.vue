<template lang="html">
  <form name="form">
    <div class="form-element">
      <label for="series">Series Name</label>
      {{ show.name }}
    </div>

    <div class="form-element" v-if="show._id">
      <label for="seasons">Seasons</label>
      <div class="select-series">
        <div class="col-xs-3" v-for="item in show.seasons" :key="item._id">
          <label class="radio" :class="{'selected' : form.seasonId == item._id }" >
            <input type="radio"
            v-model="form.seasonId"
            :value="item._id">{{ item.number }}
          </label>
        </div>
      </div>
    </div>

    <div class="form-element" v-if="form.seasonId">
      <label for="seasons">Episodes</label>
      <div class="select-series">
        <div class="col-xs-3" v-for="episode in findEpisodes(form.seasonId)" :key="episode._id">
          <label class="radio"
          :class="{'selected' : form.episodeId == episode._id }">
          <input type="radio"
          v-model="form.episodeId"
          :value="episode._id">{{ episode.number }}
        </label>
      </div>
      <span class="selected-none" :class="{'selected': !form.seasonId }">Select a episode</span>
    </div>
  </div>

  <div class="text-right">
    <uiv-btn type="primary"
      @click="add(form)"
      :disabled="!form.seasonId || !form.episodeId">Add
    </uiv-btn>
  </div>
</form>
</template>

<script>
export default {
  name: 'AddToWatchlist',
  data() {
    return {
      form: {
        seasonId: '',
        episodeId: ''
      },
      today: new Date().getTime()
    };
  },
  props: {
    show: Object
  },
  methods: {
    async add() {
      await this.$store.dispatch('watching/addToWatching', {
        episodeId: this.form.episodeId,
        showId: this.show._id
      });

      this.form = {
        seasonId: '',
        episodeId: ''
      };
      this.$emit('done');
    },
    findEpisodes(seasonId) {
      const season = this.show.seasons.find(item => item._id === seasonId);
      if (season) {
        return season.episodes;
      }

      return [];
    }
  }
};
</script>

<style lang="scss">
</style>
