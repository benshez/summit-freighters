import { createRouter, createWebHistory } from "vue-router";
import { useDisplayStore } from "@/store";
import routes from "@/router/routes";
import { configuration } from "@/utilities";

const DEFAULT_TITLE = "";

const router = createRouter({
  history: createWebHistory(configuration.AppBaseRoute),
  routes,
});

router.beforeEach((to, from) => {
  document.title = to.meta.title as string || DEFAULT_TITLE;
  const displayStore = useDisplayStore();
  displayStore.UpdateLoaderShowingState(true);
  setTimeout(() => { }, 150)
})

router.afterEach((to, from) => {
  const displayStore = useDisplayStore();
  setTimeout(() => {
    displayStore.UpdateLoaderShowingState(false);
  }, 150)
})

export default router;