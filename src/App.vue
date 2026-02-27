<template>
  <Header />
  <router-view />
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";

</script>

<style lang="sass">
@tailwind base;
@tailwind components;
@tailwind utilities;
$namespace: "summit-freighters";

@scope (.#{$namespace} .w-full, .container) 
  text-align: center
  font-size: 52px

@scope (.#{$namespace} .btn-primary) 
  border-radius: calc(infinity * 1px);
  background-color: var(--color-violet-500);
  padding-inline: --spacing(5);
  padding-block: --spacing(2);
  font-weight: var(--font-weight-semibold);
  color: var(--color-white);
  box-shadow: var(--shadow-md);

@scope (.#{$namespace} .btn-primary:hover) 
  background-color: var(--color-violet-700);

</style>