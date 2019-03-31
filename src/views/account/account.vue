<template>
    <div class="container">
        <div>
            <p>Account</p>
        </div>
        <div class="columns">
            <aside class="column">
                <p class="menu-label">GENERAL</p>
                <ul class="menu-list">
                    <li><router-link to="/account/profile">profile</router-link></li>
                    <li><router-link to="/account/settings">settings</router-link></li>
                </ul>
                <p class="menu-label">COMMUNICATION</p>
                <ul class="menu-list">
                    <li><router-link to="/account/community">community</router-link></li>
                    <li><router-link to="/account/notifications">notifications</router-link></li>
                </ul>
            </aside>
            <transition name="fade" mode="out-in">
                <router-view class="column" />
            </transition>
        </div>
    </div>
</template>

<script>
import AccountNotifications from 'views/account/accountNotifications.vue';

export default {
    name: 'account'
}
</script>

<style lang="scss" scoped>

</style>
