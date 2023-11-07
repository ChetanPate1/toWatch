<script>
export default {
  name: 'TwLoader',
  props: {
    show: {
      default: false,
      type: Boolean
    }
  }
};
</script>

<template>
  <div v-if="show" class="animate-spinner border-2 h-5 w-5 rounded-full border-indigo-500 border-b-indigo-200"></div>
</template>


