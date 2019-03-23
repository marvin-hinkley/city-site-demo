import Vue from "vue";
import App from './app.vue';
import router from './routes/index';
import store from './state/index';

const firebase = require('./firebase');
let app;

firebase.auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});