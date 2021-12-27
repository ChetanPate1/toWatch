<template lang="html">
  <div class="glass">
    <slot></slot>
    <div class="frost" :style="{ 'background-image': 'url('+ imgSrc +')' }"></div>
  </div>
</template>

<script>
export default {
  name: 'FrostGlass',
  props: {
    imgSrc: String
  }
}
</script>

<style lang="scss" src="./frost-glass.scss"></style>
