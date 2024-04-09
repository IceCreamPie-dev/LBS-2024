import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import mitt from 'mitt';
import store from './store'; 

const token = localStorage.getItem('token');
if (token) {
  store.commit('setToken', token);
}

const app = createApp(App);
const emitter = mitt();
app.config.globalProperties.emitter = emitter;
app.use(router).use(store).mount('#app');