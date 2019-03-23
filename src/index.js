import Vue from "vue";
import VueRouter from 'vue-router';
import App from './app.vue';
import routes from './routes/index';

const router = new VueRouter({
  mode: 'history',
  routes: routes
});

Vue.use(VueRouter);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');