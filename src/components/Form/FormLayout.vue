<template>
  <div>
    <slot name="nav-bar">    
      <Header />
    </slot>
    <div class="flex min-h-full flex-1 flex-col lg:px-2 py-18 lg:px-2 lg:py-2">
      <slot name="form"></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Header from "@/components/Header.vue";
</script>