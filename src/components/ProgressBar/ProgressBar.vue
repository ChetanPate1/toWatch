<template lang="html">
  <div class="progress-bar-container">
    <div class="progress" :style="{ 'width': `${percentage}%` }"></div>
    <span class="spot"
      v-for="(t, i) in tags"
      v-uiv-tooltip="'Tags'"
      :key="i"
      :style="{ left: `${t}%` }"></span>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    percentage: {
      type: Number,
      default: 0
    },
    tags: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss">
.progress-bar-container {
  position: relative;
  height: 4px;
  width: 100%;
  border-radius: 2px;
  display: inline-block;
  overflow: hidden;
  background-color: transparentize($base-color, 0.5);

  .progress {
    background-color: $base-color;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: 0;
    transition: 600ms width ease;
  }

  .spot {
    left: 0;
    top: 0;
    position: absolute;
    z-index: 10;
    border-radius: 2px;
    height: 4px;
    width: 4px;
    z-index: 20;
    background-color: $danger-color;
    transform: translate(-100%, 0);
  }
}
</style>
