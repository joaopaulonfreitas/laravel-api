require('./bootstrap');

require('alpinejs');


import { createApp } from 'vue'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// Components
import App from './components/App.vue';
import CategoriesCreate from './components/Categories/Create.vue';

// Vue Instance
const app = createApp({});
app.component('app', App);
app.component('categories-create', CategoriesCreate);
app.use(Toast);
app.mount('#app');
