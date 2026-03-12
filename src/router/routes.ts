import HomeView from "@/views/Home.vue";
import { useAuthStore } from "@/store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiresAuth: true,
      title: "Summit Freighters - Home",
    },
  },  
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/About.vue"),
    meta: {
      requiresAuth: true,
      title: "Summit Freighters - About",
    },
  },
  {
    path: "/edit",
    name: "edit",
    component: () =>
      import(/* webpackChunkName: "edit" */ "@/views/Edit.vue"),
    beforeEnter: async (to: any, from: any, next: any) => {
      const isAuthenticated = await useAuthStore().GetCurrentUser();
      if (to.name === "edit" && !isAuthenticated) next({ name: "login" })
      else next()
    },
    meta: {
      requiresAuth: true,
      title: "Summit Freighters - Edit",
    },
  },  
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/Login.vue"),
    meta: {
      requiresAuth: true,
      title: "Summit Freighters - Login",
    },
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "@/views/Register.vue"),
    meta: {
      requiresAuth: true,
      title: "Summit Freighters - Register",
    },
  },
 {
    path: "/map",
    name: "map",
    component: () =>
      import(/* webpackChunkName: "register" */ "@/views/Map.vue"),
    beforeEnter: async (to: any, from: any, next: any) => {
      const isAuthenticated = await useAuthStore().GetCurrentUser();
      if (to.name === "map" && !isAuthenticated) next({ name: "login" })
      else next()
    },    
    meta: {
      requiresAuth: true,
      title: "Summit Freighters - Map",
    },
  },  
];


export default routes;