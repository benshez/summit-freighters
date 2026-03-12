import { createRouter, createWebHistory } from "vue-router";
import routes from "@/router/routes";
import { configuration } from "@/utilities";

const DEFAULT_TITLE = "";

const router = createRouter({
  history: createWebHistory(configuration.AppBaseRoute),
  routes,
});

export default router;