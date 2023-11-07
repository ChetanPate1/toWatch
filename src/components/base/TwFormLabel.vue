<script>
export default {
  name: 'TwFormLabel',
  props:{
    id: {
      type: String,
      required: true
    }
  }
};
</script>

<template>
  <label :for="id" class="block text-sm font-medium text-gray-700 mb-2">
    <slot></slot>
  </label>
</template>

