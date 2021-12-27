<template lang="html">
<div class="show-table-head">
   <slot></slot>
</div>
</template>

<script>
export default {
  name: 'ShowTableHead'
}
</script>

<style lang="scss">
.show-table-head {
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   width: 100%;
   padding: 10px;
   font-size: 12px;
   color: #dcdcdc;
   border-radius: 6px;
   background-color: $body-color;
   > * {
      flex: 1 100%;
   }
   
   @for $i from 1 through 12 {
      .item {
        padding: 10px;
      }
   }
}
</style>
