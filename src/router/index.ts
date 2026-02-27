import { createRouter, createWebHistory } from "vue-router";
import routes from "@/router/routes";
import { configuration, getCurrentUser } from "@/utilities";

const DEFAULT_TITLE = "";

const router = createRouter({
  history: createWebHistory(configuration.AppBaseRoute),
  routes,
});

router.afterEach(async (to, from) => {
  document.title = to.meta.title || DEFAULT_TITLE as any;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !await getCurrentUser()) {
    return "/login";
  }
})

export default router;