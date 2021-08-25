/**
 * window.Vue = require('vue');
 * Vue.component('front-page', require('./components/Front.vue').default);
 * const app = new Vue({ el: '#app'})
 * app.component('pagination', AdvancedLaravelVuePaginate);
 */

require('./bootstrap');

import { createApp } from 'vue'
import Toast from "vue-toastification";

import "vue-toastification/dist/index.css";

// Components
import App from './components/App.vue';

// Vue Instance
const app = createApp({});
app.component('app', App);
app.use(Toast);
app.mount('#app');
