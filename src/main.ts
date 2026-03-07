import "@assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import "@fortawesome/fontawesome-free/js/all";
import router from "@/router";
import { widget } from "@/utilities/index";

const pinia = createPinia();

createApp(App)
    .provide("options", widget.GetWidgetOptions())
    .use(pinia)
    .use(router)
    .mount(`#${widget.GetAppMountId()}`);
