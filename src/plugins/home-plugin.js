import Notify from "vue-notifyjs";
import SideBar from "@/components/SidebarPlugin";


//css assets
import "bootstrap/dist/css/bootstrap.css";
import "@/assets/css/themify-icons.css";
import "@/assets/sass/all-styles.scss";

export default {
  install(Vue) {
    Vue.use(SideBar);
    Vue.use(Notify);
  }
}
