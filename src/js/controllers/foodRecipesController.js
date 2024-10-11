import * as yup from 'yup';
import recipeView from '../views/recipe/recipeView.js';
import searchView from '../views/searchView.js';
import resultsView from '../views/recipe/resultsView.js';
import paginationView from '../views/paginationView.js';
import bookmarksView from '../views/bookmarksView.js';
import foodRecipeModel from './../models/foodRecipeModel.js';
import addRecipeView from '../views/recipe/addRecipeView.js';
import mobileMenuView from '../views/mobileMenuView.js';

const validationSchema = yup.object().shape({
    servings: yup
        .string()
        .min(1, 'Servings must be greater than 1')
        .required('Please provide the number of servings'),
    cookingTime: yup
        .string()
        .min(1, 'Cooking time must be greater than 1 minute')
        .required('Cooking time is required'),
    publisher: yup
        .string()
        .min(5, 'Publisher name must be at least 5 characters long')
        .required('Please enter the publisher name'),
    title: yup
        .string()
        .min(2, 'Title must be at least 2 characters long')
        .required('Please provide a title'),
    imageURL: yup
        .string()
        .url('Please provide a valid image URL')
        .required('Image URL is required'),
    sourceURL: yup
        .string()
        .url('Please provide a valid source URL')
        .required('Source URL is required'),
    ingredients: yup.array().min(1, 'Please add at least one ingredient'),
});

const loadRecipe = async function () {
    try {
        const id = window.location.hash.slice(1);
        if (!id) return;

        recipeView.renderSpinner();

        resultsView.update(foodRecipeModel.getResultsPerPage());

        bookmarksView.update(foodRecipeModel.state.bookmarks);

        await foodRecipeModel.loadRecipe(id);
        recipeView.render({ data: foodRecipeModel.state.entry });
    } catch (err) {
        console.error(err.message);
    }
};

const loadSearchResults = async function () {
    try {
        const hrefQuery = window.location.href.split('?')[1];
        if (!hrefQuery) return;

        const query = hrefQuery || searchView.getQuery();
        if (!query) return;

        //Guard Clause
        if (!query) return;

        //load loading spinner
        resultsView.renderSpinner();

        //Load search results
        await foodRecipeModel.loadSearchResults(query);

        //render search results per page
        resultsView.render({ data: foodRecipeModel.getResultsPerPage() });

        //Render pagination buttons
        paginationView.render({ data: foodRecipeModel.state.search });
    } catch (err) {
        resultsView.renderError();
        console.error(err.message + '🔥');
    }
};

const pagination = function (goToPage) {
    //render search results
    resultsView.render({ data: foodRecipeModel.getResultsPerPage(goToPage) });

    //Render pagination buttons
    paginationView.render({ data: foodRecipeModel.state.search });
};

const loadBookmarks = function () {
    bookmarksView.render({ data: foodRecipeModel.state.bookmarks });
};

const addBookmark = function () {
    if (!foodRecipeModel.state.entry.bookmarked)
        foodRecipeModel.addBookmark(foodRecipeModel.state.entry);
    else foodRecipeModel.removeBookmark(foodRecipeModel.state.entry.id);

    recipeView.update(foodRecipeModel.state.entry);

    bookmarksView.render({ data: foodRecipeModel.state.bookmarks });
};

const addRecipe = async function (newRecipe) {
    try {
        await validationSchema.validate(newRecipe, {
            strict: true,
            abortEarly: false,
        });

        addRecipeView.renderSpinner();

        await foodRecipeModel.uploadRecipe(newRecipe);

        addRecipeView.renderSuccess();

        recipeView.render({ data: foodRecipeModel.state.entry });

        bookmarksView.render({ data: foodRecipeModel.state.bookmarks });

        window.history.pushState(
            null,
            '',
            `#${foodRecipeModel.state.entry.id}`,
        );

        setTimeout(function () {
            addRecipeView.toggleWindow();
        }, 2000);
    } catch (err) {
        if (!err.inner) return addRecipeView.renderError(err.message);

        document.querySelectorAll('p.text-rose-500').forEach(p => p.remove());
        err.inner.forEach(e => {
            const input = document.querySelector(`[name="${e.path}"]`)
                ?.parentNode.parentNode;

            input?.querySelectorAll('p.text-rose-500').forEach(p => p.remove());

            input?.insertAdjacentHTML(
                'beforeend',
                `<p class="text-rose-500 font-open-sans-regular text-xs sm:text-sm">${e.message}</p>`,
            );
        });
    }
};

function init() {
    loadSearchResults();
    bookmarksView.addHandlerLoadBookmarks(loadBookmarks);
    recipeView.addHandlerAddBookmark(addBookmark);
    recipeView.addHandlerRender(loadRecipe);
    searchView.addHandlerSearch(loadSearchResults);
    paginationView.addHandlerClick(pagination);
    addRecipeView.addHandlerUpload(addRecipe);
}

init();
