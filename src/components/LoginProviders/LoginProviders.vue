<template>
  <h3 class="pt-4 text-2xl text-center text-slate-100">{{props.heading}}</h3>
  <div class="p-5">
    <h3 class="text-center mb-2 font-semibold text-slate-200">{{ props.message }}</h3>
    <div class="grid grid-cols-2 gap-1">
      <Google />
      <GitHub />
    </div>
  </div>
  <h3 class="text-center font-semibold text-slate-200">Or</h3>
</template>
<script setup lang="ts">
import Google from "@/components/LoginProviders/Google.vue";
import GitHub from "@/components/LoginProviders/GitHub.vue";

const props = defineProps({
  heading: { type: String, required: true },
  message: { type: String, required: true }
})
</script>