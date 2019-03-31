import { database, storage } from "~/firebase";

const articles = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            database
            .collection('fl_content')
            .where('_fl_meta_.schema', '==', 'article')
            .get()
            .then(querySnapshot => {
                let articleList = [];

                querySnapshot.forEach(article => {
                    let articleData = article.data();
                    console.log('article', articleData);

                    if (articleData.headerImage[0]) {
                        articleData.headerImage[0]
                        .get()
                        .then(response => {
                            let responseData = response.data();

                            images.getById(responseData.file)
                            .then(url => {
                                articleList.push({
                                    content: articleData.mainContent,
                                    tagline: articleData.tagline,
                                    headline: articleData.headline,
                                    headerimage: url,
                                    featured: articleData.featured,
                                    tags: articleData.tags
                                });
                            });
                        })
                        .catch(err => reject(err));
                    } else {
                        articleList.push({
                            content: articleData.mainContent,
                            tagline: articleData.tagline,
                            headline: articleData.headline,
                            featured: articleData.featured,
                            tags: articleData.tags
                        });
                    }
                });

                resolve(articleList);
            })
            .catch(err => reject(err));
        });
    }
}

const images = {
    getById: (filename) => {
        return new Promise((resolve, reject) => {
            storage.ref()
            .child(`flamelink/media/${filename}`)
            .getDownloadURL().then(url => {
                resolve(url);
            })
            .catch(err => reject(err));
        });
    }
}

export {
    articles,
    images
}