<script>
import {
  TabGroup, TabList, Tab
} from '@headlessui/vue';
import TwButton from './TwButton';
export default {
  name: 'TwSwitch',
  emits: ['update:modelValue'],
  props: {
    modelValue: String,
    options: {
      type: Array,
      required: true
    },
    valueKey: {
      type: String,
      default: 'value'
    }
  },
  mounted() {
    if (!this.modelValue) {
      this.$emit('update:modelValue', this.options[0][this.valueKey]);
    }
  },
  methods: {
    change(index) {
      const value = this.options[index][this.valueKey];
      this.$emit('update:modelValue', value);
    }
  },
  components: {
    TabGroup,
    TabList,
    Tab,
    TwButton
  }
};
</script>

<template>
  <TabGroup @change="change">
    <TabList class="flex space-x-1 rounded-xl bg-slate-100 p-1">
      <Tab v-for="item in options" as="template" :key="item.label" v-slot="{ selected }">
        <button type="button" 
          class="py-2 px-3 flex items-center justify-center rounded-md border border-transparent font-medium hover:bg-indigo-700 focus:outline-none text-sm w-full"
          :class="{ 'bg-transparent hover:bg-transparent hover:text-indigo-600 ' : !selected, 'bg-indigo-600 text-white' : selected }">
          {{ item.label }}
        </button>
      </Tab>
    </TabList>
  </TabGroup>
</template>
