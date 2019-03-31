<template>
    <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">{{user.displayName}}</a>
        <div class="navbar-dropdown is-right">
            <router-link class="navbar-item" to="/account">account</router-link>
            <router-link class="navbar-item" to="/account/profile">profile</router-link>
            <router-link class="navbar-item" to="/account/notifications">notifications</router-link>
            <hr class="navbar-divider">
            <router-link class="navbar-item" to="/logout">logout</router-link>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex";

    export default {
        name: 'loggedIn',
        computed: {
            ...mapState({
                user: state => state.currentUser
            })
        }
    }
</script>

<style lang="scss" scoped>

</style>