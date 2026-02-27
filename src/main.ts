import "@assets/main.css";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import { widget } from "@/utilities/index";

createApp(App)
    .provide("options", widget.GetWidgetOptions())
    .use(createPinia())
    .use(router)
    .mount(`#${widget.GetAppMountId()}`);
