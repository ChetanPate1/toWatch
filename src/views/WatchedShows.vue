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
          Are you sure you want to delete this watched show?
        </h4>
      </div>
    </div>
  </uiv-modal>

  <uiv-modal v-model="tagsModal.show"
    title="Tags"
    ref="tagsModal"
    :footer="false"
    size="sm">
    <div class="row">
      <div class="col-md-12">
        <ul class="list-group">
          <li class="list-group-item" v-for="(tag, i) in tagsModal.data" :key="i">
            <div class="row">
              <div class="col-xs-4">
                {{ tag.y }}
              </div>

              <div class="col-xs-8 text-right">
                {{ tag.x }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </uiv-modal>

  <pager
    v-if="watchedShows.length > 15"
    :current-page="currentPage"
    :total-pages="totalPages">
  </pager>

  <div class="container fade-in">
    <div class="row margin-bottom-20">
      <div class="col-sm-5 col-md-4">
        <switch-group
          dark
          v-model="filter.sort"
          :options="showTypeList"
          @input="onChangeTab">
        </switch-group>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 text-right margin-bottom-20">
        <button type="button" class="btn btn-xs btn-ghost" :disabled="refreshing" @click="onRefresh">
          <loader :show="refreshing" />
          {{ refreshing ? '' : 'Refresh' }}
        </button>
      </div>
      <div class="col-sm-6 col-md-4" v-for="item in watchedShows" :key="item._id">
        <watched-show-card
          :data="item"
          @onDelete="(id) => {
            deleteModal.show = true;
            deleteModal.showId = id;
          }"
          @onClick="onTags">
        </watched-show-card>
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
    <no-content message="You haven't watched any shows yet!" v-if="!requesting && watchedShows.length == 0"></no-content>
  </div>
</div>
</template>

<script>
import NoContent from '@/components/NoContent/NoContent';
import WatchedShowCard from '@/components/WatchedShowCard/WatchedShowCard';
import SwitchGroup from '@/components/FormElements/SwitchGroup';
import Loader from '@/components/Loader/Loader';
import Pager from '@/components/Pager/Pager';
import ReachedEnd from '@/components/ReachedEnd/ReachedEnd';

import { mapState } from 'vuex';

export default {
  name: 'Watched',
  data() {
    return {
      deleteModal: {
        show: false,
        showId: null
      },
      tagsModal: {
        show: false,
        data: []
      },
      refreshing: false
    }
  },
  async mounted() {
    this.$store.dispatch('watchedShows/getWatchedShows', {
      currentPage: 1
    });
    await this.$store.dispatch('lookups/getEpisodeTags');
    await this.$store.dispatch('lookups/getShowTypes');

    this.initScroll();
  },
  computed: {
    ...mapState({
      watchedShows: ({ watchedShows }) => watchedShows.watchedShows,
      currentPage: ({ watchedShows }) => watchedShows.currentPage,
      totalPages: ({ watchedShows }) => watchedShows.totalPages,
      showTypeList: ({ lookups }) => lookups.showTypes,
      episodeTagsList: ({ lookups }) => lookups.episodeTags,
      showEpisodesTags: ({ shows }) => shows.showEpisodesTags,
      filter: ({ watchedShows }) => watchedShows.filter,
      reachedEnd: ({ watchedShows }) => {
        const { pageSize, currentPage, totalPages } = watchedShows;

        if (watchedShows.watchedShows.length < pageSize) {
          return false;
        }

        return totalPages == currentPage;
      },
      requesting: ({ watchedShows }) => watchedShows.requesting
    })
  },
  methods: {
    onChangeTab() {
      this.$store.dispatch('watchedShows/getWatchedShows', {
        currentPage: 1
      });
    },
    async onDelete(result) {
      if(result == 'ok') {
        const { showId } = this.deleteModal;

        await this.$store.dispatch('watchedShows/deleteFromWatchedShows', {
          showId
        });

        await this.$store.dispatch('watchedShows/getWatchedShows', { currentPage: 1 });
      }
    },
    async onTags({ showId }) {
      await this.$store.dispatch('shows/showsEpisodesTagsGet', showId);
      const twoDigits = (n) => n < 10 ? `0${n}` : n;

      const data = this.showEpisodesTags.map(({ name, episode }) => ({
        x: name,
        y: `S${twoDigits(episode.season.number)}E${twoDigits(episode.number)}`
      }));

      if (data.length == 0) return;

      this.tagsModal.show = true;

      this.tagsModal.data = data;
    },
    async onRefresh() {
      this.refreshing = true;
      await this.$store.dispatch('shows/updateShows');
      this.refreshing = false;
    },
    initScroll() {
      window.onscroll = () => {
        const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.$store.dispatch('watchedShows/getWatchedShows', {
            currentPage: this.currentPage + 1
          });
        }
      };
    }
  },
  components: {
    NoContent,
    WatchedShowCard,
    SwitchGroup,
    Loader,
    Pager,
    ReachedEnd
  }
};
</script>

<style lang="scss"></style>
