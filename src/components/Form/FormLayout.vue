<template>
  <div class="grid grid-cols-12 gap-4 md:gap-6">
    <slot name="nav-bar">    
   
    </slot>
    <div class="col-span-12 xl:col-span-6">
      <slot name="form"></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
</script>