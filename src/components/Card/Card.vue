<template lang="html">
<div class="card">
  <slot></slot>
</div>
</template>

<script>

export default {
  name: 'Card'
};
</script>

<style lang="scss">
.card {
  border-radius: 10px;
  padding: 20px;
  background-color: $shade-1;
  box-shadow: 0 8px 40px -10px rgba(0, 0, 0, 0.6);
}
</style>
