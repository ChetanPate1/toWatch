<template lang="html">
<div class="tab-panels-container" :style="{ 'width': panelsWidth, 'transform': moveTo() }" ref="panels_container">
   <slot></slot>
</div>
</template>

<script>
export default {
   name: 'TabPanelsContainer',
   props: {
      active: Number
   },
   data(){
      return{
         clientWidth: 0,
         panelsWidth: '100%'
      }
   },
   methods: {
      tabPanelWidth(){
         let numberOfPanels = this.$refs.panels_container.children.length;
         return `${this.clientWidth * numberOfPanels}px`;
      },
      moveTo(){
         return `translate3d(-${this.clientWidth * this.active }px, 0, 0)`;
      }
   },
   mounted(){
      this.clientWidth = this.$refs.panels_container.clientWidth;
      this.panelsWidth = this.tabPanelWidth();
      this.$emit('TabPanelWidth', this.clientWidth);
   }
}
</script>

<style lang="scss">
.tab-panels-container{
   position: absolute;
   width: 100%;
   height: 100%;
   transform: translate3d(0, 0, 0);
   transition: all 500ms ease;
}
</style>
