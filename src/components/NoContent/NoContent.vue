<template lang="html">
<div class="no-content">
   <h1>{{ message }}</h1>
</div>
</template>

<script>
export default {
   name: 'NoContent',
   props: {
      message: String
   }
}
</script>

<style lang="scss">
.no-content{
   position: absolute;
   width: 100%;
   height: 100%;
   top: 0;
   left: 0;
   z-index: 100;

   h1{
      position: absolute;
      top: 50%;
      margin: 0;
      padding: 0 15px;
      width: 100%;
      text-align: center;
      color: #05051b;
      transform: translate(0, -50%);
   }
}

</style>
