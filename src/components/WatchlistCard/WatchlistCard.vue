<template lang="html">
<div>
  <div class="watchlist-card" tabindex="0" :style="{ 'background-image': 'url('+ imgSrc +')' }">
    <button type="button" class="icon-button red dripicons-trash" @click="$emit('onDelete', id)"></button>
    <button type="button" class="icon-button dripicons-clockwise" v-uiv-tooltip="'Refresh'" @click="$emit('onRefresh', data.show._id)"></button>

    <h2>{{ heading }}</h2>
    <h4>{{ data.episode ? data.episode.name : '' }}</h4>
    <h5>On {{ data.episode ? `Season ${data.episode.season.number} Episode ${data.episode.number}` : '' }}</h5>

    <behind-count-button
        @click="toggleOpen"
        :count="data.behindCount"
        :open="open">
    </behind-count-button>

    <slide-out-panel :open="open">
        <tabs>
          <tab-button slot="tab-buttons"
              v-for="season in data.show.seasons"
              :key="season._id"
              :name="tabButtonName(season.number)"
              :active="isTabSelected(season)"
              @click="tabSelect(season)">
          </tab-button>

          <tab-panels-container :active="tabActive" slot="tab-panels-container">
              <tab-panel
                v-for="season in data.show.seasons"
                :active="isTabSelected(season)"
                :number="season.number"
                :key="season._id">

                <panel-row
                    v-for="episode in season.episodes"
                    :key="episode._id"
                    :watching-id="id"
                    :number="episode.number"
                    :title="episode.name"
                    :watched="episode.watched"
                    :released="episode.airdate"
                    :tags="episode.tags"
                    @click="watched(episode)"
                    @onOpen="(open) => onGetTags(open, episode)"
                    @tag="(tag) => onTag(tag, episode)">
                </panel-row>
              </tab-panel>
          </tab-panels-container>
        </tabs>
    </slide-out-panel>
  </div>
</div>
</template>

<script>
import SlideOutPanel from '../SlideOutPanel/SlideOutPanel';

import Tabs from '../Tabs/Tabs';
import TabButton from '../Tabs/TabButton';
import TabPanel from '../Tabs/TabPanel';
import TabPanelsContainer from '../Tabs/TabPanelsContainer';

import PanelRow from './PanelRow';
import BehindCountButton from '../BehindCountButton/BehindCountButton';

export default {
  name: 'WatchlistCard',
  props: {
    heading: String,
    id: String,
    data: Object,
    imgSrc: String
  },
  data() {
    return {
      open: false,
      tabActive: 1
    };
  },
  methods: {
    async toggleOpen() {
      this.open = !this.open;
      const { episode } = this.data;

      if (this.open) {
        await this.tabSelect(this.data.show.seasons[episode.season.number - 1]);
      }
    },
    async onGetTags(isOpen, episode) {
      if(isOpen) {
        await this.$store.dispatch('watching/getEpisodeTags', {
          watchingId: this.id,
          episode
        });

        this.$forceUpdate();
      }
    },
    async onTag(tag, episode) {
      await this.$store.dispatch('watching/toggleTag', {
        watchingId: this.id,
        tagId: tag.id,
        episode
      });

      this.$forceUpdate();
    },
    tabButtonName(number) {
      return number < 10 ? `S0${number}` : `S${number}`;
    },
    async tabSelect(season) {
      await this.$store.dispatch('watching/getEpisodes', {
        watchingId: this.id,
        seasonId: season._id
      });
      this.tabActive = season.number;

      this.$forceUpdate();
    },
    isTabSelected({ number }) {
      return this.tabActive == number;
    },
    async watched(episode) {
      await this.$store.dispatch('watching/toggleWatched', {
        watchingId: this.id,
        episode
      });

      this.$forceUpdate();
    }
  },
  components: {
    SlideOutPanel,
    Tabs,
    TabButton,
    TabPanel,
    TabPanelsContainer,
    PanelRow,
    BehindCountButton
  }
};
</script>

<style src="./watchlist-card.scss" lang="scss"></style>
