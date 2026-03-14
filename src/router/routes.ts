import HomeView from "@/views/Home.vue";
import { useUserStore } from "@/store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiresAuth: true,
      title: "Summit Freighters - Home",
      name: "Home"
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
      name: "About"
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard.vue"),
    meta: {
      requiresAuth: true,
      title: "Summit Freighters - Dashboard",
      name: "Dashboard"
    },
  },  
  {
    path: "/edit",
    name: "edit",
    component: () =>
      import(/* webpackChunkName: "edit" */ "@/views/Edit.vue"),
    beforeEnter: async (to: any, from: any, next: any) => {
      const isAuthenticated = await useUserStore().GetCurrentUser();
      if (to.name === "edit" && !isAuthenticated) next({ name: "login" })
      else next()
    },
    meta: {
      requiresAuth: true,
      title: "Summit Freighters - Edit",
      name: "Edit"
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
      name: "Login"
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
      name: "Register"
    },
  },
 {
    path: "/map",
    name: "map",
    component: () =>
      import(/* webpackChunkName: "register" */ "@/views/Map.vue"),
    beforeEnter: async (to: any, from: any, next: any) => {
      const isAuthenticated = await useUserStore().GetCurrentUser();
      if (to.name === "map" && !isAuthenticated) next({ name: "login" })
      else next()
    },    
    meta: {
      requiresAuth: true,
      title: "Summit Freighters - Map",
      name: "Map"
    },
  },  
];


export default routes;