<template>
  <div class="relative">
    <div :class="[
      'absolute inset-0',
      'bg-sky-700',
      loaderClass,
      'shimmer']" :style="shimmerStyle">
    </div>
    <slot></slot>
  </div>
  
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "rectangle",
    validator: (val: string) => ["rectangle", "circle"].includes(val)
  },
  bgClass: { type: String, default: "bg-sky-700" },
  shimmerColor: { type: String, default: "#ffffff" }
})

const { type, bgClass, shimmerColor } = toRefs(props);

const loaderClass = computed(() =>
  type.value === "circle" ? "rounded-full" : "rounded"
);

const shimmerStyle = computed(() => ({
  backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 20%, rgba(255,255,255,0.5) 60%, rgba(255,255,255,0))`
}));

</script>

<style scoped>
.shimmer {
  transform: translateX(-100%);
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>