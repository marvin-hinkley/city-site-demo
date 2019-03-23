import Vue from "vue";
import VueRouter from 'vue-router';
import App from './app.vue';
import routes from './routes/index';
import store from './state/index';

const router = new VueRouter({
  mode: 'history',
  routes: routes
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');