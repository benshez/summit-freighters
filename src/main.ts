import "@assets/main.css";
import { createApp } from "vue";
import App from "@/App.vue";
import "@fortawesome/fontawesome-free/js/all";
import router from "@/router";
import { widget } from "@/utilities/index";

createApp(App)
    .provide("options", widget.GetWidgetOptions())
    .use(router)
    .mount(`#${widget.GetAppMountId()}`);
