import articleResultsView from '../views/article/articleResultsView.js';
import articleView from '../views/article/articleView.js';
import articlesModel from '../models/articlesModel';
import bookmarksView from '../views/bookmarksView.js';
import searchView from '../views/searchView.js';
import mobileView from '../views/mobileMenuView.js';

import 'core-js/actual';
import 'regenerator-runtime';

const loadArticle = async function () {
    try {
        const id = window.location.hash.slice(1);
        if (!id) return;

        articleView.toggleOverlay();
        articleView.renderSpinner();

        bookmarksView.update(articlesModel.state.bookmarks);
        articleResultsView.update(articlesModel.state.results);

        await articlesModel.loadArticles(id);

        articleView.render({
            data: articlesModel.state.entry,
        });
    } catch (err) {
        articleView.renderError(err.message);
        console.error(err.message);
    }
};

const loadSearchResults = async function (params) {
    try {
        const query = searchView.getQuery() || params;
        if (!query) return;

        articleResultsView.renderSpinner();

        await articlesModel.loadSearchResults(query);

        articleResultsView.render({
            data: articlesModel.state.results,
            isLink: false,
        });
    } catch (err) {
        articleResultsView.renderError();
        console.error(err.message + '🔥');
    }
};

const loadBookmarks = function () {
    bookmarksView.render({ data: articlesModel.state.bookmarks });
};

const addBookmark = function () {
    if (!articlesModel.state.entry.bookmarked)
        articlesModel.addBookmark(articlesModel.state.entry);
    else articlesModel.removeBookmark(articlesModel.state.entry.id);

    articleView.update(articlesModel.state.entry);
    articleResultsView.update(articlesModel.state.results);

    bookmarksView.render({ data: articlesModel.state.bookmarks });
};

const sort = function (sortType, isSort) {
    articlesModel.sortArticles(sortType, isSort);
    articleResultsView.update(articlesModel.state.results);
};

const params = new URLSearchParams(window.location.search).get('search');

export default function init() {
    if (params !== null) loadSearchResults(params);
    bookmarksView.addHandlerLoadBookmarks(loadBookmarks);
    articleView.addHandlerAddBookmark(addBookmark);
    articleView.addHandlerRender(loadArticle);
    articleView.addHandlerSort(sort);
    searchView.addHandlerSearch(loadSearchResults);
}

init();
