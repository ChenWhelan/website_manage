import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import '../public/reset.css'
import ElementUI from 'element-ui'
import '@/theme/index.css'
import 'element-ui/lib/theme-chalk/index.css'
//引用vue-quill-editor组件和样式
import  VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import VueResource from 'vue-resource'
import store from "./store/index.js";
Vue.use(VueQuillEditor);
Vue.use(VueResource);

Vue.use(store);
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
