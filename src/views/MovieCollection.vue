<script>
import TwShowMovieCard from '@/components/TwShowMovieCard';
import TwContainer from '@/components/base/TwContainer';
import TwFormLabel from '@/components/base/TwFormLabel';
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
      if (result == 'ok') {
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
    TwShowMovieCard,
    TwContainer,
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

<template lang="html">
<tw-container>
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
                <tw-button class="bg-indigo-50 hover:bg-indigo-100 text-indigo-600" size="sm" type="button" @click="deleteModal.show = false">
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