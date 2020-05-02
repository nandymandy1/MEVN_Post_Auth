import Vue from "vue";
import np from "nprogress";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import Swal from "sweetalert2";
import "./registerServiceWorker";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

Vue.config.productionTip = false;

// Import Global Components
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "../node_modules/nprogress/nprogress.css";
import "bootstrap-vue/dist/bootstrap-vue-icons.min.css";
import "@/assets/main.scss";

// Create Toaster Plugin
const Toast = Swal.mixin({
  toast: true,
  timer: 5000,
  position: "top-end",
  showConfirmButton: false,
  timerProgressBar: false,
  onOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

// Register Plugins in Window Object
window.np = np;
window.Swal = Swal;
window.Toast = Toast;

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.component("Navbar", Navbar);
Vue.component("Footer", Footer);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
