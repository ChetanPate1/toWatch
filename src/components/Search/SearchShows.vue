<template lang="html">
<form v-on:submit.prevent="findShow">
  <div class="form-element search dark">
    <button type="button" class="dripicons-cross"
        @click="empty"
        v-if="showsFound.length > 0">
    </button>

    <loader :show="requesting"></loader>
    <input class="show-search" type="text" name="showName" placeholder="Track a show" v-model="form.showName">

    <button type="submit" class="dripicons-search" :disabled="requesting"></button>

    <div class="search-results" :class="{'show' : showsFound }">
      <search-result-item
        v-for="show in showsFound" :key="show.id"
        :poster="show.image.medium"
        :title="show.name"
        :year="show.premiered"
        :disabled="requesting"
        @click="addSeries(show)"
      ></search-result-item>
    </div>
  </div>
</form>
</template>

<script>
import SearchResultItem from './SearchResultItem';
import Loader from '../Loader/Loader';
import { mapState } from 'vuex';

export default {
  name: 'SearchShows',
  data() {
    return {
      form: {
        showName: ''
      },
      requesting: false
    };
  },
  computed: {
    ...mapState({
      showsFound: ({ shows }) => shows.showsFound
    })
  },
  methods: {
    async findShow() {
      this.requesting = true;
      await this.$store.dispatch('shows/showsGet', this.form.showName);
      this.requesting = false;
    },
    async addSeries(show) {
      this.requesting = true;
      const data = await this.$store.dispatch('shows/save', show);
      this.$emit('onSelect', data);
      this.requesting = false;
      this.empty();
    },
    empty() {
      this.form.showName = '';
      this.$store.dispatch('shows/reset');
    }
  },
  components: {
    SearchResultItem,
    Loader
  }
};
</script>

<style lang="scss">
.btn-group {
  position: absolute;
  right: 50px;
  top: 5px;
}

.show-search {
  padding-right: 140px;
}

.search-results {
  width: 100%;
  border-radius: 6px;
  box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.7);
  transition: all 500ms ease;
  transform: translate(-100%, 0);
  max-height: 500px;
  overflow-y: auto;
  opacity: 0;

  .result {
    margin: 0 0 5px 0;
    background-color: $shade-1;
    display: block;
    float: left;
    width: 100%;
    padding: 10px 15px;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &:hover {
      cursor: pointer;
      background-color: $base-color;
      .name,
      .number {
        color: #ffffff;
      }
    }

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
      width: 74px;
      height: 105px;
    }

    .name {
      font-size: 14px;
      font-weight: bold;
      width: 85%;
      line-height: 2;
      color: #ffffff;

      small {
        color: #afafaf;
      }
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

  &.show {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
    opacity: 1;
  }
}
</style>
