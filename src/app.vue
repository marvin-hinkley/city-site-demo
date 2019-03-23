<template>
    <div id="app">
        <nav class="navbar is-fixed-top" role="navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="http://localhost:5000">
                <span>City of Gold Hill Oregon</span>
                </a>
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
                <a class="navbar-item">articles</a>
                <a class="navbar-item">online services</a>
                <a class="navbar-item">community forum</a>
                <div class="navbar-item">
                    <div class="buttons">
                    <a class="button">login</a>
                    </div>
                </div>
                </div>
            </div>
        </nav>
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style lang="scss">

</style>