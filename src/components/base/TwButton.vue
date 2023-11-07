<script>
export default {
  props: {
    size: {
      default: 'md',
      type: String
    }
  },
  data() {
    return {
      sizes: {
        md: `
        py-3 px-8
        flex
        items-center
        justify-center
        rounded-md border
        border-transparent
        bg-indigo-600
        text-base text-white font-medium hover:bg-indigo-700
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        scale-3
      `,
        sm: `
        py-2 px-3
        flex
        items-center
        justify-center
        rounded-md border
        border-transparent
        bg-indigo-600
        text-white font-medium hover:bg-indigo-700
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        scale-3
        text-sm
      `,
        xs: `
        py-1 px-4
        flex
        items-center
        justify-center
        rounded-md border
        border-transparent
        bg-indigo-600
        text-white font-medium hover:bg-indigo-700
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        scale-3
        text-xs
        `
      }
    }
  }
};
</script>

<template>
  <button type="button" :class="sizes[size]">
    <slot></slot>
  </button>
</template>
