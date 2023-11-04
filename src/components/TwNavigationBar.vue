<script>
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      navigation: [
        { name: 'Movie Collection', to: '/movie-collection', icon: 'movie', current: false },
        { name: 'Watched Shows', to: '/watched-shows', icon: 'modern-tv', current: false },
        { name: 'Watching', to: '/watching', icon: 'list-select', current: false },
      ]
    };
  },
  computed: {
    ...mapState({
      token: ({ storage }) => storage.token,
      userInitial: ({ storage }) => {
        return storage.user ? storage.user.email?.charAt(0) : '-';
      }
    })
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/signUserOut');
      this.open = false;
    }
  },
  components: {
    Bars3Icon,
    XMarkIcon,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems
  }
};
</script>

<template>
  <div class="flex flex-col justify-between fixed z-50 top-[5%] left-3 w-14 h-[90%] border-2 border-zinc-800 rounded-full bg-zinc-900" v-if="token">
    <div class="flex flex-col item-center">
      <div class="text-indigo-500 font-bold text-xl w-full text-center py-4 mb-2">2W</div>

      <div class="inline-flex h-10 w-10 text-sm items-center justify-center place-self-center text-white uppercase overflow-hidden border-2 border-zinc-800 rounded-full bg-zinc-900">
        {{ userInitial }}
      </div>
    </div>

    <div class="flex flex-col">
      <router-link
        v-for="item in navigation"
        :to="item.to" 
        tag="a"
        :key="item.name"
        class="relative text-white text-center text-xl h-14 flex flex-row items-center justify-center my-2 group"
        :aria-current="item.current ? 'page' : undefined">
        <i :class="`iconoir-${item.icon}`"></i>
        <span class="sr-only">{{ item.name }}</span>
        <span class="absolute h-full w-1 rounded-full -right-[1px] bg-indigo-500 transition-transform duration-300 scale-y-0 group-hover:scale-y-100" :class="item.current ? '':''"></span>
      </router-link>
    </div>

    <div class="flex flex-row items-center justify-center">
      <button type="button" class="relative h-14 text-slate-500 hover:text-red-600 text-center text-xl" @click="logout">
        <i class="iconoir-eject"></i>
        <span class="sr-only">Logout</span>
      </button>
    </div>
  </div>
</template>
