import { createApp } from 'vue'; // Vue의 createApp 함수 import

// createApp 함수를 사용하여 Vue 애플리케이션을 생성합니다.
const app = createApp({});

// Vue 애플리케이션에서 EventBus로 사용할 새로운 Vue 인스턴스를 생성합니다.
const EventBus = app;

export default EventBus;
