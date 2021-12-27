<template lang="html">
<div class="toast-item" @click.prevent="dismiss">
  <h5>{{ title }}</h5>
  <p>{{ message }}</p>
</div>
</template>

<script>
export default {
  name: 'ToastItem',
  props: {
    title: String,
    message: String,
    timestamp: Number
  },
  methods: {
    dismiss() {
      this.$store.dispatch('toastDismiss', this.timestamp);
    }
  }
};
</script>

<style lang="scss">
.toast-item {
  display: inline-block;
  width: 100%;
  background-color: $base-color;
  padding: 20px;
  border-radius: 7px;
  z-index: 1000;
  margin-bottom: 10px;

  h5,
  p {
    color: #fff;
    margin: 0;
  }

  h5 {
    margin-bottom: 5px;
    font-weight: bold;
  }

  p {
    font-size: 12px;
  }

  &:hover {
    cursor: pointer;
  }
}
</style>
