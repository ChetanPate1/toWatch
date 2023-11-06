<script>
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      navigation: [
        { name: 'Movie Collection', to: '/movie-collection', icon: 'movie' },
        { name: 'Watched Shows', to: '/watched-shows', icon: 'modern-tv' },
        { name: 'Watching', to: '/watching', icon: 'list-select' }
      ]
    };
  },
  computed: {
    ...mapState({
      token: ({ storage }) => storage.token,
      userInitial: ({ storage }) => {
        return storage.user ? storage.user.email?.charAt(0) : '-';
      }
    }),
    currentRoute() {
      return this.$route.path;
    }
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
  <div class="flex flex-row md:flex-col justify-between fixed z-50 bottom-5 left-[5%] md:left-5 w-[90%] md:w-14 h-14 md:h-[90%] border-2 border-zinc-800 rounded-full bg-zinc-900" v-if="token">
    <div class="flex flex-col item-center justify-center">
      <div class="text-indigo-500 font-bold text-xl w-full text-center ml-3 md:ml-0 md:py-4 md:mb-2">2W</div>

      <div class="h-10 w-10 text-sm items-center justify-center place-self-center text-white uppercase overflow-hidden border-2 border-zinc-800 rounded-full bg-zinc-900 hidden md:inline-flex">
        {{ userInitial }}
      </div>
    </div>

    <div class="flex flex-row md:flex-col">
      <router-link
        v-for="item in navigation"
        :to="item.to" 
        tag="a"
        :key="item.name"
        class="relative text-white text-center text-xl md:h-14 flex flex-row items-center justify-center mx-5 md:mx-0 md:my-2 group hover:text-indigo-500"
        :aria-current="currentRoute == item.to ? 'page' : undefined">
        <i :class="`iconoir-${item.icon}`"></i>
        <span class="sr-only">{{ item.name }}</span>
        <span class="absolute h-1 w-full sm:h-full sm:w-1 rounded-full top-0 sm:-right-[1px] bg-indigo-500 transition-transform duration-300 scale-y-0 group-hover:scale-y-100" :class="currentRoute == item.to ? 'scale-y-100' : ''"></span>
      </router-link>
    </div>

    <div class="flex flex-row items-center justify-center">
      <button type="button" class="relative w-14 md:h-14 flex flex-row items-center justify-center text-slate-500 hover:text-red-600 text-center text-xl" @click="logout">
        <i class="iconoir-eject"></i>
        <span class="sr-only">Logout</span>
      </button>
    </div>
  </div>
</template>
