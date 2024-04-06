import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import mitt from 'mitt';

const app = createApp(App);
const emitter = mitt();
app.config.globalProperties.emitter = emitter;
app.use(router).use(Vuex).mount('#app');