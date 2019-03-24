<template>
    <span class="title">ARTICLES</span>
</template>

<script>
import { cms } from "../firebase";

export default {
    name: 'articles',
    created() {
        cms.content.get('articles').then(
            (articles) => {
                console.log('articles', articles);
            },
            (err) => {
                console.log('error', err);
            }
        );
    }
}
</script>

<style lang="scss" scoped>

</style>
