<template>
  <div class="flex-1 rounded-1xl border p-4 m-1">
    <div class="flex flex-col lg:flex-row lg:gap-4 lg:px-2 py-18 lg:px-2 lg:py-2">
      <div :class="{ 'lg:w-1/3 border-r': isLeftLayout, 'lg:w-2/3': !isLeftLayout }">
        <div class="p-0 mb-4">
          <div class="flex flex-col items-center">
            <slot name="form-body-left"></slot>
          </div>
        </div>
      </div>
      <div :class="{ 'lg:w-2/3 border-r': isLeftLayout, 'lg:w-1/3': !isLeftLayout }">
        <div class="lg:p-6 p-1">
          <slot name="form-body-right"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  isLeftLayout: Boolean
})
</script>