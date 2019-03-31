<template>
    <div class="modal is-clipped is-active">
        <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                <p class="modal-card-title">Login</p>
                <button class="delete" @click="$emit('close')"></button>
            </header>
            <section class="modal-card-body">
                <div v-if="linkAccount" class="notification">
                    <p>Please log into your primary authentication provider to link your existing account.</p>
                </div>
                <form v-else @submit.prevent>
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
                <template v-if="!linkAccount">
                    <a class="button is-success" @click="login">login</a>
                    <a class="button is-success" @click="loginGoogle">sign-in with google</a>
                    <a class="button is-success" @click="loginFacebook">sign-in with facebook</a>
                </template>
                <a v-else class="button is-success" @click="loginLinkAccount">Continue</a>
            </footer>
        </div>
    </div>
</template>

<script>
import { auth, googleAuthProvider, facebookAuthProvider, currentUser, getPrimaryAuthProvider } from '~/firebase';
import { mapMutations } from "vuex";

export default {
    name: 'loginForm',
    data: () => {
        return {
            email: '',
            password: '',
            linkAccount: false,
            linkProvider: googleAuthProvider,
            linkAccountCredential: null
        };
    },
    methods: {
        ...mapMutations({
            setUser: 'setCurrentUser'
        }),
        login: function() {
            auth.signInWithEmailAndPassword(this.email, this.password).then(
                this.updateUser,
                this.handleAccountLink
            );
        },
        loginGoogle: function() {
            auth.signInWithPopup(googleAuthProvider).then(
                this.updateUser,
                this.handleAccountLink
            );
        },
        loginFacebook: function() {
            auth.signInWithPopup(facebookAuthProvider).then(
                this.updateUser,
                this.handleAccountLink
            );
        },
        loginLinkAccount: function() {
            auth.signInWithPopup(this.linkProvider)
            .then(result => {
                result.user
                .linkAndRetrieveDataWithCredential(this.linkAccountCredential)
                .then(userCredential => {
                    this.updateUser(result);
                    this.$emit('close');
                })
                .catch(err => console.log('problem linking account', err));
            })
            .catch(err => console.log('problem linking account', err));
        },
        handleAccountLink: function(err) {
            if (err.code === 'auth/account-exists-with-different-credential') {
                getPrimaryAuthProvider(err)
                .then(provider => {
                    this.linkProvider = provider;
                    this.linkAccount = true;
                    this.linkAccountCredential = err.credential;
                })
                .catch(err => console.log('problem linking account', err));
            }
        },
        updateUser: function(result) {
            this.setUser(result.user);
            this.$store.dispatch('fetchUserProfile');
            this.$emit('close');
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
