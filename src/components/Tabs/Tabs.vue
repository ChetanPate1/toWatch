<template>
<div>
  <div class="tabs">
    <slot name="tab-buttons"></slot>
  </div>

  <div class="tab-panels">
    <slot name="tab-panels-container"></slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'Tabs'
};
</script>

<style lang="scss">
.tabs {
  height: 90px;
  width: 90%;
  margin: auto;
  overflow-y: auto;

  .tab-button {
    width: 20%;
  }
}
</style>
