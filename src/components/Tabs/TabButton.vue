<template>
<button class="tab-button"
   type="button"
   name="button"
   @click="$emit('click')"
   :class="{ 'active' : active }" >{{ name }}
</button>
</template>

<script>
export default {
   name: 'TabButton',
   props: {
      name: String,
      active: Boolean
   }
}
</script>

<style lang="scss">
.tab-button {
   text-align: center;
   width: 100%;
   padding: 4px 0;
   color: #ffffff;
   display: inline-block;
   border-radius: 2px;
   background-color: transparent;
   border: 1px solid transparent;
   margin: 5px 0;
   opacity: 1;
   transition: opacity 200ms ease;

   &.active {
      font-weight: bold;
      background-color: rgba(0, 0, 0, 0.6);
      border: 1px solid #ffffff;
   }

   &:hover {
      cursor: pointer;
      border: 1px solid #ffffff;
   }
}
</style>
