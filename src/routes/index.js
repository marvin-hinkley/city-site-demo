import Vue from 'vue';
import Home from '../home/home.vue'
import Articles from '../articles/articles.vue'
import NotFound from '../errors/NotFound.vue'

Vue.use(VueRouter);

export default [
    { path: '/', component: Home },
    { path: '/articles', component: Articles },
    { path: '/notfound', component: NotFound }
]