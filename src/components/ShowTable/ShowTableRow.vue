<template lang="html">
<div class="show-table-row">
   <slot></slot>
</div>
</template>

<script>
export default {
  name: 'ShowTableRow'
}
</script>

<style lang="scss">
.show-table-row {
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   color: #d1d1d1;
   padding: 8px 10px;
   margin-top: -1px;
   border-bottom: 1px solid $body-color; 
   vertical-align: middle;
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
