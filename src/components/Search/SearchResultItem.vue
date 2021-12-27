<template lang="html">
<div class="search-result-item">
  <div class="item img">
    <div class="image" :style="{ 'background-image': 'url('+ poster +')' }"></div>
  </div>

  <div class="item name">
    <h4 class="margin-top-0 margin-bottom-0">{{ title }}</h4>
    <small>{{ year }}</small>

    <p class="margin-top-10 margin-bottom-0" v-if="plot">{{ plot }}</p>

    <div class="margin-top-10 text-right">

      <uiv-btn type="primary"
        @click="$emit('click')"
        :disabled="disabled">Add to Collection
      </uiv-btn>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'SearchResultItem',
  props: {
    poster: String,
    title: String,
    plot: String,
    year: String,
    disabled: Boolean
  }
};
</script>

<style lang="scss">
.search-result-item {
    margin: 0 0 5px 0;
    background-color: $shade-1;
    display: block;
    float: left;
    width: 100%;
    padding: 18px;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .item {
      flex: 1 100%;
    }

    .img {
      flex: 1 140px
    }

    .image {
      background: #efefef;
      background-size: cover;
      background-repeat: no-repeat;
      border-radius: 5px;
      width: 80px;
      height: 120px;
    }

    .name {
      font-size: 14px;
      font-weight: bold;
      width: 85%;
      line-height: 2;
      color: #ffffff;

      small {
        color: #b7b7b7;
      }
    }

    p {
      line-height: 1.6;
      font-size: 14px;
      color: #b7b7b7;
    }

    @media (max-width: 500px) {
      padding-top: 20px;
      min-height: 60px;

      .number,
      .name {
        padding: 4px 0 0 0;
        font-size: 12px;
        line-height: 1;
      }
      .name {
        padding: 4px 10px 0 0;
      }
    }
  }
</style>
