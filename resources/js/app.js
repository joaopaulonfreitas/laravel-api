require('./bootstrap');


//  REQUIRE VUE
//  window.Vue = require('vue');
import { createApp } from 'vue'

//  COMPONENTS IMPORT
//Vue.component('front-page', require('./components/Front.vue').default);
import FrontPage from './components/Front.vue';

//  GET STARTED APPLICATION ID VUE
//const app = new Vue({ el: '#app'})
const app = createApp({});

// Register our FrontPage component globally
app.component('front-page', FrontPage);

// Mount the app to the DOM
app.mount('#app');
