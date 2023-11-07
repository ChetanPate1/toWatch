<script>
import TwCard from '@/components/base/TwCard.vue';
import TwCircleButton from '@/components/base/TwCircleButton';

export default {
   name: 'TwSearchResultItem',
   props: {
      poster: String,
      title: String,
      plot: String,
      year: String,
      disabled: Boolean
   },
   methods: {
      formatEpisodeNumber(n) {
         return n < 10 ? `0${n}` : n;
      }
   },
   components: {
      TwCard,
      TwCircleButton
   }
};
</script>

<template>
   <div class="flex gap-2 justify-between py-2 border-b-2 border-zinc-800">
      <div class="flex gap-5 items-center text-sm">
         <div>
            <img class="min-w-[100px] h-auto rounded-md border-2 border-zinc-800" :src="poster"/>
         </div>

         <div>
            <div class="flex flex-row justify-between">
               <p class="text-slate-200">{{ title }}</p>
               <p class="text-slate-400">{{ year }}</p>
            </div>
            
            <p class="text-slate-400 text-xs" v-html="plot"></p>
         </div>
      </div>
   </div>
</template>
