<template>
<div>
  <div class="panel-row" :class="{ disabled : !watched, open }" tabindex="0">
    <div class="row row-1">
      <div class="col-xs-3 col-1">
        <span class="aired-by">
          <i class="dripicons-feed"></i>
          {{ aired(released).by }}
        </span>
      </div>

      <div class="col-xs-9 col-2">
        <div class="title">
          <small>Episode {{ number }}<br /></small>
          {{ title ? title : '-' }}
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-4" v-for="e in tags" :key="e.id">
        <button class="status" :class="{ active: e.active }" @click="$emit('tag', e)">
          {{ e.label }}
        </button>
      </div>
    </div>

    <span class="dripicons-plus" :class="{ open }" @click="onOpen"></span>

    <span class="dripicons-preview"
      @click="$emit('click')"
      :class="{ 'active' : watched }"></span>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PanelRow',
  data() {
    return {
      timeNow: new Date().getTime(),
      open: false
    };
  },
  computed: {
    ...mapState({
      episodeTagsList: ({ lookups }) => lookups.episodeTags
    })
  },
  props: {
    watchingId: String,
    number: Number,
    title: String,
    watched: Boolean,
    released: String,
    tags: Array
  },
  methods: {
    onOpen() {
      this.open = !this.open
      this.$emit('onOpen', this.open);
    },
    aired(date) {
      date = new Date(date).getTime();
      let delta = Math.abs(date - this.timeNow) / 1000;
      let isAired = date - this.timeNow < 0;
      let aired = { isAired: isAired };

      if (isAired) {
        aired.by = `- ${Math.ceil(delta / 86400)} days`;
        if (Math.ceil(delta / 86400) > 30) {
          aired.by = 'aired';
        }
      } else {
        aired.by = 'not aired';
      }

      return aired;
    }
  }
};
</script>

<style src="./panel-row.scss" lang="scss"></style>
