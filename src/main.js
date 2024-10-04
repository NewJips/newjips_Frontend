import './assets/main.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'vue-awesome-paginate/dist/style.css';
import '@/assets/global.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueAwesomePaginate from 'vue-awesome-paginate';
import i18n from '@/i18n';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia);
app.use(VueAwesomePaginate);
app.use(i18n);
app.use(createPinia());
app.use(router);

app.mount('#app');
