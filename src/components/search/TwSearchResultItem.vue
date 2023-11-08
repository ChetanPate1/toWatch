<script>
import TwCard from '@/components/base/TwCard.vue';
import TwCircleButton from '@/components/base/TwCircleButton';
import TwBadge from '@/components/base/TwBadge.vue';

export default {
   name: 'TwSearchResultItem',

   props: {
      data: Object,
      disabled: Boolean
   },
   methods: {
      extractYear(date) {
         if(!date) return '-';
         return date.split('-')[0];
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
            <img class="min-w-[100px] max-w-[100px] h-auto rounded-lg border-2 border-zinc-800" :src="data.image.medium"/>
         </div>
         
         <div>
            <div class="flex flex-row flex-1 justify-between">
               <p class="text-slate-200 font-bold mb-2">{{ data.name }} 
                  <span class="text-slate-500 text-xs">{{ extractYear(data.premiered) }}</span>
               </p>
               <tw-circle-button type="plus" size="xs" @click="$emit('onAdd', data)" />
            </div>

            <tw-badge v-for="item in data.genres" class="mr-2">{{item}}</tw-badge>
            
            <p class="text-slate-400 text-xs mt-4" v-html="data.summary"></p>
         </div>
      </div>
   </div>
</template>
