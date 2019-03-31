import Vue from "vue";
import App from '~/app.vue';
import router from '~/routes';
import store from '~/store';

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