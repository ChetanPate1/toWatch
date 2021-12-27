<template lang="html">
  <div class="popup-background" :class="{ 'open': popupOpen }" @click="close('dismiss')">
    <div class="popup-content" @click.stop>
      <h4 class="popup-title">{{ title }}</h4>
      <button class="close-button" @click.stop="close('dismiss')" type="button">
        <span class="dripicons-cross"></span>
      </button>
      <div class="popup-container">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  data() {
    return {
      popupOpen: false
    };
  },
  props: {
    title: String,
    size: String
  },
  methods: {
    open() {
      this.$emit('open');
      this.popupOpen = true;

      return new Promise(resolve => {
        this.close = reason => {
          this.popupOpen = false;
          this.$emit('close');
          resolve(reason);
        };
      });
    }
  }
};
</script>

<style lang="scss">
.popup-background {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2000;
  background-color: transparentize(#000000, 0.5);
  width: 100%;
  height: 100%;
  overflow: auto;
  transition: opacity 1000ms ease;
  -ms-transform: translate(100%, 0);
  transform: translate3d(100%, 0, 0);

  .popup-content {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    display: block;
    max-width: 400px;
    max-height: 700px;
    overflow-y: auto;
    margin: auto;
    width: 100%;
    height: auto;
    border-radius: 7px;
    padding: 70px 30px 20px 30px;
    background-color: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 30px 65px -30px rgba(0, 0, 0, 0.3);
    transition: all 500ms ease;
    opacity: 0;
    -ms-transform: translate(0, -100%);
    transform: translate3d(0, -100%, 0);

    .close-button {
      position: absolute;
      top: 5px;
      right: 5px;
      background-color: transparent;
      line-height: 1;
      border: none;
      padding: 10px;
      font-size: 20px;
      opacity: 0.6;
      z-index: 5;

      &:hover {
        opacity: 1;
      }
    }
  }

  .popup-title {
    font-weight: bold;
    margin: 0;
    position: absolute;
    z-index: 1;
    top: 20px;
    left: 30px;
  }

  .popup-container {
    display: block;
    max-height: 700px;
    overflow-y: auto;
  }

  &.open {
    opacity: 1;
    -ms-transform: translate(0, 0);
    transform: translate3d(0, 0, 0);

    .popup-content {
      opacity: 1;
      -ms-transform: translate(0, -50%);
      transform: translate3d(0, -50%, 0);
    }
  }
}
</style>
