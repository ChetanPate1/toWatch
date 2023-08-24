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
        <tw-button type="button" class="w-full" :class="{ 'bg-transparent hover:bg-transparent text-gray-500 hover:text-indigo-600' : !selected}">
          {{ item.label }}
        </tw-button>
      </Tab>
    </TabList>
  </TabGroup>
</template>
