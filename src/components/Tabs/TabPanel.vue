<template>
<div class="tab-panel" :style="{ 'left': position(), 'width': panelWidth() }" :class="{ 'active' : active }" >
  <slot></slot>
</div>
</template>

<script>
export default {
  name: 'TabPanel',
  data() {
    return {
      width: 320
    };
  },
  props: {
    active: Boolean,
    number: Number
  },
  methods: {
    position() {
      return `${this.width * this.number}px`;
    },
    panelWidth() {
      return `${this.width}px`;
    }
  },
  beforeUpdate() {
    this.width = this.$parent.clientWidth;
  }
};
</script>

<style lang="scss">
.tab-panels {
  position: relative;
  width: 100%;
  display: block;
  overflow-y: auto;
  height: 365px;

  .tab-panel {
    z-index: 100;
    padding: 0;
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    display: block;
    opacity: 0.5;
    transform: scale(0.9);
    transition: all 500ms ease;

    &.active {
      transform: scale(1);
      z-index: 200;
      opacity: 1;
    }
  }

  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
}
</style>
