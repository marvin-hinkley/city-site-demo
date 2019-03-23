import Vue from "vue";
import VueRouter from 'vue-router';
import App from './app.vue';
import routes from './routes/index';
import store from './state/index';

Vue.use(VueRouter);

const firebase = require('./firebase');
const router = new VueRouter({
  mode: 'history',
  routes: routes
});
let app;

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = firebase.currentUser;

  if (requiresAuth && !currentUser) {
    next('/');
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

firebase.auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});