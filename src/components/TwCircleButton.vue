<script>
import { PlusIcon, ArrowPathIcon, TrashIcon, PlayIcon } from '@heroicons/vue/24/outline';

export default {
  props: {
    type: {
      default: 'plus',
      type: String
    },
    size: {
      default: 'md',
      type: String
    }
  },
  data() {
    return {
      sizes: {
        md: `
          inline-flex items-center 
          rounded-full
          border
          border-slate-100
          bg-white
          p-3 
          text-indigo-600 
          drop-shadow-2xl
          hover:bg-slate-50 
          focus:outline-none 
          focus:ring-2 
          focus:ring-indigo-500 
          focus:ring-offset-2
        `
        ,
        xs: `
          inline-flex items-center 
          rounded-full
          border
          border-slate-100
          bg-white
          p-2 
          text-indigo-600 
          drop-shadow-xl
          hover:bg-slate-50 
          focus:outline-none 
          focus:ring-2 
          focus:ring-indigo-500 
          focus:ring-offset-2
        `
      }
    }
  },
  components: {
    PlusIcon, ArrowPathIcon, TrashIcon, PlayIcon
  }
};
</script>

<template>
  <button type="button" :class="sizes[size]">
    <PlusIcon :class="size == 'md' ? 'h-6 w-6' : 'h-4 w-4'" aria-hidden="true" v-if="type == 'plus'" />
    <ArrowPathIcon :class="size == 'md' ? 'h-6 w-6' : 'h-4 w-4'" aria-hidden="true" v-if="type == 'refresh'" />
    <TrashIcon :class="size == 'md' ? 'h-6 w-6' : 'h-4 w-4'" aria-hidden="true" v-if="type == 'trash'" />
    <PlayIcon :class="size == 'md' ? 'h-6 w-6' : 'h-4 w-4'" aria-hidden="true" v-if="type == 'play'" />
    <ArrowPathIcon :class="size == 'md' ? 'h-6 w-6' : 'h-4 w-4'" aria-hidden="true" v-if="type == 'reload'" />
  </button>
</template>

