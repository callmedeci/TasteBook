import { ARTICLES_PATH } from './../config/config.js';
import Model from './Model.js';

const jsonPath = `${import.meta.env.BASE_URL}${ARTICLES_PATH}`;

class ArticleModel extends Model {
    _bookmarksPath = 'articlesBookmarks';
    state = {
        entry: {},
        results: [],
        bookmarks: [],
    };

    constructor() {
        super();
        this._initializeBookmarks();
    }

    _createObject(article) {
        return {
            id: article.article_id,
            imageUrl: article.article_cover.image_url,
            title: article.title,
            tag: article.tag,
            conclusion: article.conclusion,
            introduction: article.introduction,
            mainContent: article.main_content,
            type: article.type,
        };
    }

    async loadArticles(id) {
        try {
            const { data } = await this._AJAX(jsonPath);
            this._isValidJSON(data.drinks_articles);

            if (!id) return data;

            const currentArticle = [
                ...data.drinks_articles,
                ...data.food_articles,
            ].find(article => article.article_id === id);

            this.state.entry = this._createObject(currentArticle);

            if (this.state.bookmarks.some(bookmark => bookmark.id === id))
                this.state.entry.bookmarked = true;
        } catch (err) {
            throw err.message;
        }
    }

    async loadSearchResults(query) {
        try {
            const data = await this.loadArticles();

            const results = [
                ...data.drinks_articles,
                ...data.food_articles,
            ].map(article => {
                const bookmarkIndex = this.state.bookmarks.findIndex(
                    bookmark => article.article_id === bookmark.id,
                );

                if (bookmarkIndex !== -1)
                    return {
                        ...article,
                        bookmarked: true,
                    };
                return article;
            });

            if (query === 'all') return (this.state.results = results);

            this.state.results = results.filter(
                article =>
                    article.title.includes(query.trim()) ||
                    article.tag.includes(query.trim()) ||
                    article.type.includes(query.trim()),
            );

            if (this.state.results.length === 0)
                throw new Error('Nothing Found :(');

            return this.state.results;
        } catch (err) {
            throw err;
        }
    }

    sortArticles(sortType, isSort) {
        const a = [...this.state.results];
        if (isSort)
            return this.state.results.sort((a, b) =>
                b[sortType].localeCompare(a[sortType]),
            );
        else
            return this.state.results.sort((a, b) =>
                a[sortType].localeCompare(b[sortType]),
            );
    }
}

export default new ArticleModel();
