<template>
  <Transition enter-from-class="translate-x-[-100%]" enter-active-class="transition-transform duration-300 ease-in-out"
    enter-to-class="translate-x-0" leave-from-class="translate-x-0"
    leave-active-class="transition-transform duration-300 ease-in-out" leave-to-class="translate-x-[-100%]">
    <aside ref="sideBar" v-if="displayStore.sidebarShowing" class="fixed left-0 top-0 h-full w-64 z-50 border-r xl:relative px-5 py-5" @click.stop="displayStore.UpdateSidebarShowingState(true)">
      <div class="flex flex-col gap-4">
        <h2 class="mb-4 text-xs uppercase flex leading-[20px] justify-start">Menu</h2>
        <ul class="flex flex-col gap-4">
          <li v-for="route in routesList" :key="route.path" class="flex rounded w-full">
              <router-link :to="route.path"
                class="rounded md:p-0 w-full p-5 flex">
                {{ route.meta.name || route.path }}
              </router-link>
          </li>
        </ul>
      </div>
    </aside>
  </Transition>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useDisplayStore } from "@/store";
import { useRouter } from "vue-router";

const displayStore = useDisplayStore();
const router = useRouter();

const routesList = computed(() => {
  return router.getRoutes();
});

</script>