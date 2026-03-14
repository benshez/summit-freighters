<template>
  <div class="body" :class="displayStore.darkMode ? 'dark' : ''" @click="OnUpdateDisplay">
    <div class="flex h-screen overflow-hidden">
      <Sidebar />
      <div class="relative flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
        <Menubar />
        <div class="p-4 md:p-6">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useDisplayStore } from "@/store";
import Menubar from "@/components/Menubar.vue";
import Sidebar from "@/components/Sidebar.vue";

const displayStore = useDisplayStore();

const OnUpdateDisplay = () => {
  displayStore.UpdateSidebarShowingState(false);
  displayStore.UpdateProfileShowingState(false);
}
</script>