import recipeView from '../views/recipe/recipeView.js';
import searchView from '../views/searchView.js';
import resultsView from '../views/recipe/resultsView.js';
import paginationView from '../views/paginationView.js';
import bookmarksView from '../views/bookmarksView.js';
import drinksRecipeModel from './../models/drinksRecipeModel.js';
import mobileMenuView from '../views/mobileMenuView.js';

let model = null;
const loadModel = async function () {
    const path = window.location.pathname.split('/').at(-1);

    console.log(path);
};

const loadRecipe = async function () {
    try {
        const id = window.location.hash.slice(1);
        if (!id) return;

        recipeView.renderSpinner();

        resultsView.update(drinksRecipeModel.getResultsPerPage());

        bookmarksView.update(drinksRecipeModel.state.bookmarks);

        await drinksRecipeModel.loadRecipe(id);
        recipeView.render({ data: drinksRecipeModel.state.entry });
    } catch (err) {
        recipeView.renderError();
    }
};

const loadSearchResults = async function () {
    try {
        const query =
            window.location.href.split('?')[1] || searchView.getQuery();
        //Guard Clause
        if (!query) return;

        //load loading spinner
        resultsView.renderSpinner();

        //Load search results
        await drinksRecipeModel.loadSearchResults(query);

        //render search results per page
        resultsView.render({ data: drinksRecipeModel.getResultsPerPage() });

        //Render pagination buttons
        paginationView.render({ data: drinksRecipeModel.state.search });
    } catch (err) {
        resultsView.renderError();
    }
};

const pagination = function (goToPage) {
    //render search results
    resultsView.render({ data: drinksRecipeModel.getResultsPerPage(goToPage) });

    //Render pagination buttons
    paginationView.render({ data: drinksRecipeModel.state.search });
};

const loadBookmarks = function () {
    bookmarksView.render({ data: drinksRecipeModel.state.bookmarks });
};

const addBookmark = function () {
    if (!drinksRecipeModel.state.entry.bookmarked)
        drinksRecipeModel.addBookmark(drinksRecipeModel.state.entry);
    else drinksRecipeModel.removeBookmark(drinksRecipeModel.state.entry.id);

    recipeView.update(drinksRecipeModel.state.entry);

    bookmarksView.render({ data: drinksRecipeModel.state.bookmarks });
};

function init() {
    loadSearchResults();
    searchView.addHandlerSearch(loadSearchResults);
    bookmarksView.addHandlerLoadBookmarks(loadBookmarks);
    recipeView.addHandlerAddBookmark(addBookmark);
    recipeView.addHandlerRender(loadRecipe);
    paginationView.addHandlerClick(pagination);
}

init();
