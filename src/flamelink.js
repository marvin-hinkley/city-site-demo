import { database, storage } from "~/firebase";

const articles = {
    getAll: (cb) => {
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
                        console.log('header image url response', responseData);

                        let url = images.getId(responseData.file, url => {
                            console.log('header image url', url);

                            articleList.push({
                                content: articleData.mainContent,
                                tagline: articleData.tagline,
                                headline: articleData.headline,
                                headerimage: url,
                                featured: articleData.featured,
                                tags: articleData.tags
                            });
                        });
                    });
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

            cb(articleList);
        })
        .catch(err => console.log('error', err));
    },
    getFeatured: (tag) => {

    }
}

const images = {
    getId: (filename, cb) => {
        const url = storage
        .ref()
        .child(`flamelink/media/${filename}`)
        .getDownloadURL().then(url => {
            console.log('url req response', url);
            cb(url);
        })
        .catch(err => console.log('error', err));
    }
}

export {
    articles,
    images
}