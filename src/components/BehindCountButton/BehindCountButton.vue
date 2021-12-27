<template>
  <button
    class="more-button"
    type="button"
    name="more"
    @click="$emit('click')"
    :class="{ 'open' : open, 'up-to-date': !count }"
  >
    <span class="dripicons-plus"></span>
    <span class="behind">{{ count }}</span>
  </button>
</template>

<script>
export default {
  name: 'BehindCountButton',
  props: {
    open: Boolean,
    count: Number
  }
};
</script>
<style src="./behind-count-button.scss" lang="scss"></style>
