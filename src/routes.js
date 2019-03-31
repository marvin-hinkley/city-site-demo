import Vue from "vue";
import VueRouter from 'vue-router';
import store from '~/store';
import Home from 'views/home.vue';
import Articles from 'components/articles/articles.vue';
import NotFound from 'views/errors/NotFound.vue';
import Account from 'views/account/account.vue';
import AccountNotifications from 'views/account/accountNotifications.vue';
import AccountProfile from 'views/account/accountProfile.vue';

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
            },
            children: [
                { path: 'notifications', component: AccountNotifications },
                { path: 'profile', component: AccountProfile }
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

    if (requiresAuth && !store.state.currentUser) {
        next('/');
    } else if (requiresAuth && store.state.currentUser) {
        next();
    } else {
        next();
    }
});

export default router;