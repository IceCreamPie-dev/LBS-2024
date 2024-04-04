import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import EventBus from './EventBus' // 이벤트 버스 import

const app = createApp(App);
app.use(router).use(Vuex).mount('#app');

app.config.globalProperties.$bus = EventBus;