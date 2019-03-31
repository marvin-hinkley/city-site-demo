<template>
    <div class="navbar-item">
        <div class="buttons">
            <a class="button" @click="showLogin = true">login</a>
        </div>
        <login-form v-show="showLogin" @close="showLogin = false" />
    </div>
</template>

<script>
    import LoginForm from './loginForm.vue';

    export default {
        name: 'login',
        components: {
            'loginForm': LoginForm
        },
        data() {
            return {
                showLogin: false
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
