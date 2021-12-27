<template lang="html">
  <div @click.stop="$emit('onClick', data)">
    <card class="watched-show-card margin-bottom-20" tabindex="0">
      <div class="status-dot"
        v-uiv-tooltip="`Show ${data.status}`"
        :class="{ ended: data.status == 'Ended', running: (data.status == 'Running' || data.status == 'To Be Determined') }">
      </div>

      <div class="content">
        <div class="bar">
          <progress-bar
            :percentage="data.percentage"
            :tags="data.tagPositions"
            v-uiv-tooltip="'Progress'"></progress-bar>
        </div>

        <div class="text-ellipsis">
          <h3 class="margin-bottom-0 text-ellipsis">{{ data.name }}</h3>
          {{ data.on.name }}
        </div>

        <div class="margin-top-10">
          <small>
            <span class="visible-sm">{{ onEpisode(data.on, true) }}</span>
            <span class="hidden-sm">{{ onEpisode(data.on) }}</span>
          </small>
        </div>
      </div>

      <span class="status green" v-if="data.percentage == 100">
        {{ data.status == 'Running' ? 'Up To Date' : 'Complete' }}
      </span>

      <button class="icon-button red dripicons-trash"
        tabindex="0"
        v-uiv-tooltip="'Delete'"
        @click.stop="$emit('onDelete', data.showId)"></button>

      <button class="icon-button dripicons-clockwise"
        :class="{ count: data.watchedCount > 0 }"
        tabindex="0"
        v-uiv-tooltip="'Rewatch'"
        @click.stop="onRewatching()">
        <div class="watched-count"
          v-uiv-tooltip="'Rewatch Count'">{{ data.watchedCount }}</div>
      </button>

      <button class="icon-button dripicons-media-play"
        tabindex="0"
        v-uiv-tooltip="'Continue'"
        @click.stop="onContinue()"
        :disabled="data.percentage == 100"></button>

      <div class="poster" :style="{ 'background-image': 'url('+ data.poster +')' }"></div>
    </card>
  </div>

</template>

<script>
import Card from '../Card/Card';
import ProgressBar from '../ProgressBar/ProgressBar';

export default {
  name: 'WatchedShowCard',
  props: {
    data: Object
  },
  methods: {
    async onContinue() {
      const continueWatching = await this.$store.dispatch('watchedShows/continueWatching', this.data);

      if (continueWatching) {
        this.$router.push({ name: 'watching' });
      }
    },
    async onRewatching() {
      const rewatch = await this.$store.dispatch('watchedShows/rewatching', this.data);

      if (rewatch) {
        this.$router.push({ name: 'watching' });
      }
    },
    async onUpdate() {
      await this.$store.dispatch('shows/updateShow', this.data.showId);
    },
    onEpisode(on, small) {
      if (small) {
        return `S${on.season < 9 ? 0 : ''}${on.season} E${on.episode < 9 ? 0 : ''}${on.episode}`;
      }

      return `Season ${on.season} Episode ${on.episode}`;
    }
  },
  components: {
    Card,
    ProgressBar
  }
};
</script>

<style lang="scss">
.watched-show-card {
  position: relative;
  padding-left: 125px;
  padding-right: 25px;
  min-height: 160px;
  color: #b7b7b7;
  overflow: hidden;
  border-top: 1px solid rgba(97, 97, 97, 0.7);

  h3 {
    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
  }

  .content {
    position: relative;

    .bar {
      position: absolute;
      top: -15px;
      left: 0;
      width: 100%;
    }

    .text-ellipsis {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .poster {
    position: absolute;
    left: 0;
    top: 0;
    width: 105px;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
  }

  .icon-button {
    z-index: 100;
    position: absolute;

    &:focus {
      transform: translate(0, 0);
    }
  }

  .dripicons-trash {
    left: 10px;
    top: 10px;
    transition: 250ms all ease;
    transform: translate(-45px, 0);
  }

  .dripicons-media-play {
    bottom: 15px;
    right: 12px;
    transition: 250ms all ease;
    box-shadow: none;
  }

  .dripicons-clockwise {
    bottom: 15px;
    right: 50px;
    box-shadow: none;

    .watched-count {
      position: absolute;
      right: 30px;
      top: 0;
      height: 25px;
      text-align: left;
      color: $base-color;
      line-height: 25px;
    }
  }

  .status-dot {
    position: absolute;
    z-index: 10;
    top: 14px;
    right: 10px;
    height: 7px;
    width: 7px;
    border-radius: 50%;

    &.ended {
      background-color: $danger-color;
    }

    &.running {
      animation: pulse 1s infinite;
      background-color: $green;
    }
  }

  .status {
    position: absolute;
    bottom: 14px;
    left: 125px;
  }

  &:hover {
    cursor: pointer;
    .icon-button {
      transform: translate(0, 0);
    }
  }

  @media (max-width: 1200px) {
    .dripicons-media-play, .dripicons-clockwise {
      bottom: 10px;
    }
  }
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.7; }
  100% { opacity: 1; }
}
</style>
