<script>
import TwSearchShow from '@/components/search/TwSearchShow';
import TwShowMovieCard from '@/components/TwShowMovieCard';
import TwContainer from '@/components/base/TwContainer';
import TwFormField from '@/components/base/TwFormField';
import TwFormLabel from '@/components/base/TwFormLabel.vue';
import TwSwitch from '@/components/base/TwSwitch';
import TwButton from '@/components/base/TwButton';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  TabGroup, TabList, Tab
} from '@headlessui/vue';

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
      },
      search: ''
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
      currentPage: ({ watching }) => watching.currentPage,
      totalPages: ({ watching }) => watching.totalPages,
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
    async onDelete(item) {
      this.deleteModal.show = true;
      this.deleteModal.watchingId = item._id;
    },
    async onConfirmDelete() {
      this.deleteModal.show = false;
      const { watchingId, showTypeId } = this.deleteModal;

      await this.$store.dispatch('watching/deleteWatching', {
        id: watchingId,
        showTypeId
      });

      await this.$store.dispatch('watching/getWatching', {
        currentPage: 1
      });
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
    },
    formatOn(on) {
      const episodeNumber = on.number;
      const seasonNumber = on.season.number;
      const formatEpisodeNumber = episodeNumber < 10 ? `0${episodeNumber}` : episodeNumber;
      const formatSeasonNumber = seasonNumber < 10 ? `0${seasonNumber}` : seasonNumber;

      return `Season ${formatSeasonNumber} Episode ${formatEpisodeNumber}`;
    }
  },
  components: {
    TwSearchShow,
    TwShowMovieCard,
    TwContainer,
    TwFormField,
    TwFormLabel,
    TwButton,
    TwSwitch,
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogDescription,
    TabGroup, TabList, Tab
  }
};
</script>

<template>
  <tw-container>
    <tw-search-show />

    <h1 class="text-5xl font-bold text-white mb-10">Watching</h1>

    <div class="flex flex-wrap gap-4">
      <tw-show-movie-card 
        v-for="item in watching" 
        :key="item._id"
        :name="item.show.name"
        :image="item.show.image.medium"
        @onDelete="onDelete(item)"
      />
    </div>

    <TransitionRoot appear :show="deleteModal.show" as="template">
      <Dialog as="div" class="relative z-10">
        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
          leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
        </TransitionChild>
    
        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95">
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                  Confirm Delete
                </DialogTitle>

                <div class="mt-2">
                  <p class="text-md text-gray-500 mb-4">
                    Are you sure you want to delete this show?
                  </p>
                </div>

                <tw-form-label id="showTypeId">Place show in:</tw-form-label>
                <tw-switch v-model="deleteModal.showTypeId" :options="showTypeList" value-key="label" />
  
                <div class="flex gap-2 justify-end mt-9">
                  <tw-button class="bg-indigo-50 hover:bg-indigo-100 text-indigo-600" size="sm" type="button" @click="deleteModal.show =false">
                    Cancel
                  </tw-button>
                  <tw-button size="sm" type="button" @click="onConfirmDelete">
                    Yes
                  </tw-button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </tw-container>
</template>

<style lang="scss"></style>
