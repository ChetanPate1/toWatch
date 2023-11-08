<script>
import TwCard from '@/components/base/TwCard.vue';
import TwCircleButton from '@/components/base/TwCircleButton';
import TwBadge from '@/components/base/TwBadge.vue';

export default {
   name: 'TwSearchResultItem',
   props: {
      name: String,
      image: String,
      released: String,
      genres: Array,
      summary: String,
      disabled: Boolean
   },
   methods: {
      extractYear(date) {
         if(!date) return '-';
         const dateObj = new Date(date);
         return dateObj.getFullYear();
      }
   },
   components: {
      TwCard,
      TwCircleButton,
      TwBadge
   }
};
</script>

<template>
   <div class="flex gap-2 justify-between p-5 border-b-2 border-zinc-800">
      <div class="flex gap-5 text-sm">
         <div>
            <img class="min-w-[100px] max-w-[100px] h-auto rounded-lg border-2 border-zinc-800" :src="image"/>
         </div>
         
         <div>
            <div class="flex flex-row flex-1 justify-between">
               <p class="text-slate-200 font-bold mb-2">{{ name }} 
                  <span class="text-slate-500 text-xs">{{ extractYear(released) }}</span>
               </p>
               <tw-circle-button type="plus" size="xs" @click="$emit('onAdd')" />
            </div>

            <tw-badge v-for="item in genres" class="mr-2">{{ item }}</tw-badge>
            
            <p class="text-slate-400 text-xs mt-4" v-html="summary"></p>
         </div>
      </div>
   </div>
</template>
