import Vue from "vue";
import VueRouter from 'vue-router';
import Home from 'views/home.vue';
import Articles from 'components/articles/articles.vue';
import NotFound from 'views/errors/NotFound.vue';
import Account from 'views/account.vue';

Vue.use(VueRouter);
const firebase = require('../firebase');

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Home },
        { path: '/articles', component: Articles },
        { path: '/notfound', component: NotFound },
        {
            path: '/account',
            component: Account,
            meta: {
                requiresAuth: true
            }
        }
    ]
});

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

export default router;