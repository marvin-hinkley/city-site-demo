<template>
    <div id="app">
        <nav class="navbar is-fixed-top" role="navigation">
            <div class="navbar-brand">
                <router-link class="navbar-item" to="/">
                    <span>City of Gold Hill Oregon</span>
                </router-link>
                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div class="navbar-menu">
                <div class="navbar-start">
                
                </div>
                <div class="navbar-end">
                    <router-link class="navbar-item" to="/articles">articles</router-link>
                    <a class="navbar-item">online services</a>
                    <a class="navbar-item">community forum</a>
                    <router-link class="navbar-item" to="/account">account</router-link>
                    <div class="navbar-item">
                        <div class="buttons">
                            <a class="button" @click="showLogin = true">login</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <router-view />
        <login v-show="showLogin" @close="showLogin = false" />
    </div>
</template>

<script>
import Login from './login/login.vue';

export default {
    name: 'app',
    components: {
        'login': Login
    },
    data: () => {
        return {
            showLogin: false
        }
    }
}
</script>

<style lang="scss">

</style>