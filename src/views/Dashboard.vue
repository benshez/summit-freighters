<template>

</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDisplayStore } from "@/store";
import Menubar from "@/components/Menubar.vue";
import Sidebar from "@/components/Sidebar.vue";

const displayStore = useDisplayStore();

const dropdownOpen = ref(false);
const menuToggle = ref(false);
const open = ref(false);
const notifying = ref(false);


</script>