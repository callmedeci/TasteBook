import { RESULTS_PER_PAGE } from '../config/config.js';
import { AJAX, isValidJSON } from '../helper/helper';

export default class Model {
    state = {
        entry: {},
        results: [],
        search: {
            query: '',
            results: [],
            page: 1,
            resultsPerPage: RESULTS_PER_PAGE,
        },
        bookmarks: [],
    };
    _bookmarksPath = '';

    _AJAX = AJAX;
    _isValidJSON = isValidJSON;

    getResultsPerPage(page = this.state.search.page) {
        this.state.search.page = page;
        const start = (page - 1) * this.state.search.resultsPerPage;
        const end = page * this.state.search.resultsPerPage;
        return this.state.search.results.slice(start, end);
    }

    addBookmark(entry) {
        if (entry.id === this.state.entry.id)
            this.state.entry.bookmarked = true;

        this.state.bookmarks.push(entry);

        this.state.results = this.state.results.map(article => {
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

        this._persistsBookmarks();
    }

    removeBookmark(id) {
        const index = this.state.bookmarks.findIndex(
            bookmark => bookmark.id === id,
        );
        this.state.bookmarks.splice(index, 1);

        if (id === this.state.entry.id) this.state.entry.bookmarked = false;

        this.state.results = this.state.results.map(article => {
            const bookmarkIndex = this.state.bookmarks.findIndex(
                bookmark => article.article_id === bookmark.id,
            );

            if (bookmarkIndex === -1)
                return {
                    ...article,
                    bookmarked: false,
                };
            return article;
        });

        this._persistsBookmarks();
    }

    _persistsBookmarks() {
        localStorage.setItem(
            this._bookmarksPath,
            JSON.stringify(this.state.bookmarks),
        );
    }

    _initializeBookmarks() {
        const data = localStorage.getItem(this._bookmarksPath);
        if (data) this.state.bookmarks = JSON.parse(data);
    }
}
