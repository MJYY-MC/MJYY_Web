import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';

import '@/assets/scss/bootstrap/bs-custom.scss';
import 'bootstrap';

createApp(App).use(router).mount('#app');
