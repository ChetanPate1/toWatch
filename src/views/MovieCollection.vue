<template lang="html">
<div>
  <uiv-modal v-model="deleteModal.show"
    title="Confirm"
    @hide="onDelete"
    ref="deleteModal"
    ok-text="Yes"
    size="sm">
    <div class="row">
      <div class="col-md-12">
        <h4 class="margin-top-0 margin-bottom-20">
          Are you sure you want to delete this movie?
        </h4>
      </div>
    </div>
  </uiv-modal>

  <pager
    v-if="collection.length > 15"
    :current-page="currentPage"
    :total-pages="totalPages">
  </pager>

  <div class="container-fluid fade-in">
    <div class="row margin-bottom-20">
      <div class="col-xs-12">
        <search-movies></search-movies>
      </div>
    </div>

    <div class="row show-layout">
      <div class="col-xs-6 col-sm-3 col-md-2" v-for="item in collection" :key="item._id">
        <movie-card
          :heading="item.movie.title"
          :img-src="item.movie.poster"
          :movie-id="item.movie._id"
          :id="item._id"
          :deleteable="true"
          @onDelete="(id) => {
            deleteModal.show = true;
            deleteModal.id = id
          }">
        </movie-card>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12">
        <loader :show="requesting"></loader>
      </div>
    </div>

    <reached-end :show="reachedEnd">
      Reached End
    </reached-end>

    <no-content message="Your movie collection is empty!" v-if="collection.length == 0"></no-content>
  </div>
</div>
</template>

<script>
import Popup from '@/components/Popup/Popup';
import SearchMovies from '@/components/Search/SearchMovies';
import MovieCard from '@/components/MovieCard/MovieCard';
import NoContent from '@/components/NoContent/NoContent';
import Loader from '@/components/Loader/Loader';
import Pager from '@/components/Pager/Pager';
import ReachedEnd from '@/components/ReachedEnd/ReachedEnd';

import { mapState } from 'vuex';

export default {
  name: 'MovieCollection',
  data() {
    return {
      deleteModal: {
        show: false,
        showId: null
      }
    }
  },
  async mounted() {
    await this.$store.dispatch('movieCollection/getMovieCollection', {
      currentPage: 1
    });

    this.initScroll();
  },
  computed: {
    ...mapState({
      collection: ({ movieCollection }) => movieCollection.collection,
      currentPage: ({ movieCollection }) => movieCollection.currentPage,
      totalPages: ({ movieCollection }) => movieCollection.totalPages,
      reachedEnd: ({ movieCollection }) => {
        const { collection, pageSize, currentPage, totalPages } = movieCollection;

        if (collection.length < pageSize) {
          return false;
        }

        return totalPages == currentPage;
      },
      requesting: ({ movieCollection }) => movieCollection.requesting
    })
  },
  methods: {
    async onDelete(result) {
      if(result == 'ok') {
        const { id } = this.deleteModal;
        await this.$store.dispatch('movieCollection/deleteFromMovieCollection', id);
      }
    },
    initScroll() {
      window.onscroll = () => {
        const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.$store.dispatch('movieCollection/getMovieCollection', {
            currentPage: this.currentPage + 1
          });
        }
      };
    }
  },
  components: {
    Popup,
    SearchMovies,
    MovieCard,
    NoContent,
    Loader,
    Pager,
    ReachedEnd
  }
};
</script>

<style lang="scss"></style>
