<template>
  <nav class="bg-white fixed w-full z-10 top-0 start-0 md:relative bg-white shadow-sm">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-7" alt="Flowbite Logo" />
        <span class="self-center text-xl text-heading font-semibold whitespace-nowrap">Flowbite</span>
      </a>
      <button @click="show = !show" type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
        aria-controls="navbar-multi-level-dropdown" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
        </svg>
      </button>
      <transition name="fade" mode="out-in">
        <div :class="{ 'md:block md:w-auto md:absolute md:top-15 md:right-0 w-full bg-white': show, 'hidden w-full md:block md:w-auto': !show }"
          id="navbar-multi-level-dropdown">
          <ul
            class="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-base bg-neutral-secondary-soft md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white w-full">
            <li v-for="route in routesList" :key="route.path">
              <router-link :to="route.path"
                class="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent w-full">
                {{ route.name || route.path }}
              </router-link>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useFirebase } from "@/utilities";

const db = useFirebase();
const router = useRouter();
const routesList = computed(() => {
  return router.getRoutes();
});

const show = ref(false);

const Logout = async () => {
  db.logoutUser();
  await useFirebase().getCurrentUser();
  useFirebase().auth.onAuthStateChanged((user) => {
    if (!user || !user.emailVerified) router.push("/login");
  })
}

</script>