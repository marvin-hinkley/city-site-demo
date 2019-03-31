<template>
    <div>
        <div v-for="article in articles" :key="article.id">
            <div class="card">
                <div class="card-image">
                    <figure><img :src="article.headerimage" alt="altText"/></figure>
                </div>
                <div class="card-content">
                    <span class="title">{{article.headline}}</span>
                    <p>{{article.tagline}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { database } from "~/firebase";
import { articles } from "~/flamelink";

export default {
    name: 'articles',
    created() {
        articles.getAll(articleList => {
            this.articles = articleList;
        });
    },
    data() {
        return {
            articles: []
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
