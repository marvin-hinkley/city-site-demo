<template>
    <div class="modal is-clipped is-active">
        <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                <p class="modal-card-title">Login</p>
                <button class="delete" @click="$emit('close')"></button>
            </header>
            <section class="modal-card-body">
                <form @submit.prevent>
                    <div class="field">
                        <label class="label">email address</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input" type="text" placeholder="imawesome@goldhill.com" v-model="email">
                            <span class="icon is-small is-left">
                                <i class="fas fa-envelope"></i>
                            </span>
                            <span class="icon is-small is-right">
                                <i class="fas fa-check"></i>
                            </span>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">password</label>
                        <div class="control has-icons-left">
                            <input class="input" type="password" v-model="password">
                            <span class="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                            </span>
                        </div>
                    </div>
                </form>
            </section>
            <footer class="modal-card-foot">
                <a class="button is-success" @click="login">login</a>
                <a class="button is-success" @click="loginGoogle">sign-in with google</a>
                <a class="button is-success" @click="loginFacebook">sign-in with facebook</a>
                <a class="button" @click="$emit('close')">Cancel</a>
            </footer>
        </div>
    </div>
</template>

<script>
import { auth, googleAuthProvider, facebookAuthProvider, currentUser } from '~/firebase';
import { mapMutations } from "vuex";

export default {
    name: 'loginForm',
    data: () => {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        ...mapMutations({
            setUser: 'setCurrentUser'
        }),
        login: function() {
            auth.signInWithEmailAndPassword(this.email, this.password).then(
                (user) => {
                    console.log('logged in', user);
                    this.setUser(user);
                    this.$store.dispatch('fetchUserProfile');
                },
                (err) => {
                    console.log('error', err);
                }
            );
        },
        loginGoogle: function() {
            auth.signInWithPopup(googleAuthProvider).then(
                (result) => {
                    console.log('logged in', result.user);
                    this.setUser(result.user);
                    this.$store.dispatch('fetchUserProfile');
                },
                (err) => {
                    console.log('error', err);
                }
            );
        },
        loginFacebook: function() {
            auth.signInWithPopup(facebookAuthProvider).then(
                (result) => {
                    console.log('logged in', result);
                    this.setUser(result.user);
                    this.$store.dispatch('fetchUserProfile');
                },
                (err) => {
                    console.log('error', err);
                }
            );
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
