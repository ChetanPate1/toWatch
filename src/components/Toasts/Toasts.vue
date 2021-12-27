<template lang="html">
<div class="toasts">
  <transition-group name="toast-list">
    <toast-item
      v-for="toast in toasts"
      :key="toast.timestamp"
      :title="toast.title"
      :message="toast.message"
      :timestamp="toast.timestamp">
    </toast-item>
  </transition-group>
</div>
</template>

<script>
import ToastItem from './ToastItem';
import { mapState } from 'vuex';

export default {
  name: 'Toasts',
  computed: {
    ...mapState({
      toasts: ({ toast }) => toast.toasts
    })
  },
  components: {
    ToastItem
  }
};
</script>

<style lang="scss">
.toasts {
  position: fixed;
  right: 15px;
  top: 120px;
  width: 100%;
  max-width: 300px;
  z-index: 1000;
}

.toast-list-enter-active , .toast-list-leave-active {
  transition: all 400ms ease;
}

.toast-list-enter {
  transform: translate3d(0, 0, 0) scale(1);
}

.toast-list-enter, .toast-list-leave-to {
  opacity: 0;
  transform: translate3d(120%, 0, 0) scale(0);
}

.toast-list-leave-active {
  position: absolute;
}
</style>
