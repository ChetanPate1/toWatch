<template lang="html">
<div>
  <uiv-modal v-model="addModal" title="Add To Watch List" ref="modal" size="sm" :footer="false">
    <div class="row">
      <div class="col-md-12">
        <add-to-watchlist
          ref="addToWatchlist"
          :show="selectedShow"
          @done="addModal = false">
        </add-to-watchlist>
      </div>
    </div>
  </uiv-modal>

  <uiv-modal v-model="deleteModal.show"
    title="Confirm"
    @show="deleteModal.showTypeId = showTypeList[0].id"
    @hide="onDelete"
    ref="deleteModal"
    ok-text="Yes"
    size="sm">
    <div class="row">
      <div class="col-md-12">
        <h4 class="margin-top-0 margin-bottom-20">
          Are you sure you want to delete this show?
        </h4>

        <div class="margin-bottom-30">
          <label>Place Show In:</label>
          <switch-group
            id="showType"
            v-model="deleteModal.showTypeId"
            value-key="id"
            :options="showTypeList">
          </switch-group>
        </div>
      </div>
    </div>
  </uiv-modal>

  <pager
    v-if="watching.length > 6"
    :current-page="currentPage"
    :total-pages="totalPages">
  </pager>

  <div class="container-fluid fade-in">
    <div class="row">
      <div class="col-xs-12 margin-bottom-30">
        <search-shows @onSelect="onSelect"></search-shows>
      </div>

      <div class="col-xs-12 col-sm-6 col-md-3" v-for="item in watching" :key="item._id">
        <watchlist-card
          :heading="item.show.name"
          :id="item._id"
          :data="item"
          :img-src="item.show.image.original"
          @onDelete="(id) => {
            deleteModal.show = true;
            deleteModal.watchingId = id;
          }"
          @onRefresh="onRefresh">
        </watchlist-card>
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

    <no-content message="Your watch list is empty!" v-if="!requesting && watching.length == 0"></no-content>
  </div>
</div>
</template>

<script>
import WatchlistCard from '@/components/WatchlistCard/WatchlistCard';
import NoContent from '@/components/NoContent/NoContent';
import Popup from '@/components/Popup/Popup';
import SwitchGroup from '@/components/FormElements/SwitchGroup';
import SearchShows from '@/components/Search/SearchShows';
import AddToWatchlist from '@/components/AddToWatchlist/AddToWatchlist';
import Loader from '@/components/Loader/Loader';
import Pager from '@/components/Pager/Pager';
import ReachedEnd from '@/components/ReachedEnd/ReachedEnd';

import { mapState } from 'vuex';

export default {
  name: 'Watching',
  data() {
    return {
      addModal: false,
      deleteModal: {
        show: false,
        watchingId: null,
        showTypeId: null
      },
      selectedShow: {
        title: ''
      }
    }
  },
  async mounted() {
    await this.$store.dispatch('lookups/getEpisodeTags');
    await this.$store.dispatch('lookups/getShowTypes');
    await this.$store.dispatch('watching/getWatching', {
      currentPage: 1
    });

    this.initScroll();
  },
  computed: {
    ...mapState({
      watching: ({ watching }) => watching.watching,
      episodeTagsList: ({ lookups }) => lookups.episodeTags,
      showTypeList: ({ lookups }) => lookups.showTypes,
      currentPage:  ({ watching }) => watching.currentPage,
      totalPages:  ({ watching }) => watching.totalPages,
      reachedEnd: ({ watching }) => {
        const { pageSize, currentPage, totalPages } = watching;

        if (watching.watching.length < pageSize) {
          return false;
        }

        return totalPages == currentPage;
      },
      requesting: ({ watching }) => watching.requesting
    })
  },
  methods: {
    onSelect(show) {
      this.selectedShow = show;
      this.addModal = true;
    },
    async onDelete(result) {
      if(result == 'ok') {
        const { watchingId, showTypeId } = this.deleteModal;

        await this.$store.dispatch('watching/deleteWatching', {
          id: watchingId,
          showTypeId
        });

        await this.$store.dispatch('watching/getWatching', {
          currentPage: 1
        });
      }
    },
    async onRefresh(id) {
        await this.$store.dispatch('shows/updateShow', id);
        this.$store.dispatch('watching/getWatching', {
          currentPage: this.currentPage
        });
    },
    initScroll() {
      window.onscroll = () => {
        const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.$store.dispatch('watching/getWatching', {
            currentPage: this.currentPage + 1
          });
        }
      };
    }
  },
  components: {
    WatchlistCard,
    NoContent,
    Popup,
    SwitchGroup,
    SearchShows,
    AddToWatchlist,
    Loader,
    Pager,
    ReachedEnd
  }
};
</script>

<style lang="scss"></style>
