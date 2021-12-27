<template lang="html">
<div class="pager">
{{ currentPage }}/{{totalPages}}
</div>
</template>

<script>
export default {
  name: 'Pager',
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      default: 2
    }
  }
};
</script>

<style lang="scss">
.pager {
  position: fixed;
  bottom: 15px;
  right: 15px;
  background: transparentize($base-color, 0.5);
  color: #fff;
  border-radius: 5px;
  padding: 10px 15px;
  text-align: center;
  z-index: 500;
}
</style>
