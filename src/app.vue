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
                    <transition mode="out-in" name="fade">
                        <component :is="loginComponent" />
                    </transition>
                </div>
            </div>
        </nav>
        <router-view />
    </div>
</template>

<script>
import Login from 'components/login/login.vue';
import LoggedIn from 'components/login/loggedIn.vue';

export default {
    name: 'app',
    components: {
        'login': Login,
        'loggedIn': LoggedIn
    },
    computed: {
        loginComponent() {
            if (this.$store.state.currentUser == null) {
                return 'login';
            }
            return 'loggedIn';
        }
    }
}
</script>

<style lang="scss">
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>