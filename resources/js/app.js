require('./bootstrap');


//  REQUIRE VUE
//  window.Vue = require('vue');
import { createApp } from 'vue'

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

//  COMPONENTS IMPORT
//Vue.component('front-page', require('./components/Front.vue').default);
import FrontPage from './components/Front.vue';

//  GET STARTED APPLICATION ID VUE
//const app = new Vue({ el: '#app'})
const app = createApp({});

// Register our FrontPage component globally
app.component('front-page', FrontPage);

app.use(Toast);

// Mount the app to the DOM
app.mount('#app');
