<template lang="html">
<div class="loader" v-if="show">Loading...</div>
</template>

<script>

export default {
  name: 'Loader',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
.loader {
  margin: auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-radius: 50%;
  width: 27px;
  height: 27px;
  border-top: 3px solid $base-color;
  border-right: 3px solid  $base-color;
  border-bottom: 3px solid  $base-color;
  border-left: 3px solid transparentize($base-color, 0.7);
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 0.3s infinite linear;
  animation: load8 0.3s infinite linear;

  &::after {
    border-radius: 50%;
    width: 27px;
    height: 27px;
  }
}

@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
