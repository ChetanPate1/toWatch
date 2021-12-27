<template lang="html">
<label class="check-box" :class="{'light': type === 'light'}">
  <input type="checkbox"
    :id="name"
    :name="name" 
    v-model="model"
    @input="$emit('input', $event.target.checked)"/>
  <span>
    <span class="dripicons-checkmark"></span>
  </span>
  <slot></slot> 
</label>
</template>

<script>
export default {
  name: 'Checkbox',
  props: ['value', 'name', 'type'],
  data() {
    return {
      model: this.value
    };
  }
};
</script>

<style lang="scss">
.check-box {
  position: relative;
  padding-left: 27px;
  color: $body-color;

  > span {
    z-index: 5;
    position: absolute;
    top: 0;
    left: 0;
    border: 2px solid $body-color;
    font-size: 13px;
    border-radius: 5px;
    height: 21px;
    width: 21px;
    display: inline-block;
    text-align: center;
    line-height: 22px;
  }

  .dripicons-checkmark {
    opacity: 0;
  }

  input {
    z-index: 10;
    opacity: 0;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;

    &:checked + span {
      background-color: $base-color;
      border: 2px solid $base-color;
      color: #fff;

      .dripicons-checkmark {
        opacity: 1;
      }
    }
  }

  &.light {
    color: #fff;

    > span {
      border: 2px solid #fff;
    }
  }

  &:hover {
    .dripicons-checkmark {
      opacity: 1;
    }
  }
}
</style>
