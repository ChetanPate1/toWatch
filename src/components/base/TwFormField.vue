<script>
export default {
  name: 'TwFormField',
  emits: ['update:modelValue', 'onDebounce'],
  props: {
    modelValue: String,
    type: {
      default: 'text',
      type: String
    },
    placeholder: String,
    id: String
  }
};
</script>

<template>
  <input :id="id" :name="id" :type="type" :placeholder="placeholder"
    class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 sm:text-sm text-gray-100 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)" 
  />
</template>

