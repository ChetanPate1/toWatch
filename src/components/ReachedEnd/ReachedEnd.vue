<template lang="html">
<div class="reached-end" v-if="show">
  <slot></slot>
</div>
</template>

<script>

export default {
  name: 'ReachedEnd',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
.reached-end {
  background: transparentize($base-color, 0.9);
  color: $base-color;
  border-radius: 5px;
  padding: 10px 15px;
  text-align: center;
  margin: 20px 0 0 0;
}
</style>
