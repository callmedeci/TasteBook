import quotesModel from '../models/quotesModel.js';
import * as transition from '../views/transitionView.js';
import articlesModel from '../models/articlesModel.js';
import foodRecipeModel from './../models/foodRecipeModel.js';
import drinksRecipeModel from './../models/drinksRecipeModel.js';
import sliderView from '../views/slidersView.js';
import recipeView from '../views/recipe/recipeView.js';
import articleResultsView from '../views/article/articleResultsView.js';
import searchView from '../views/searchView.js';
import navbarView from '../views/navbarView.js';
import viewHeader from '../views/headerView.js';

import 'core-js/actual';
import 'regenerator-runtime';

const initializeQuoteSlider = async function () {
    try {
        //Load Quotes
        const quotes = await quotesModel.loadQuotes();

        //render Quotes
        sliderView.render({
            data: quotes,
            hasSecondMarkup: true,
        });

        //Render Swiper Slider
        sliderView.initializeSwiperSlider();
    } catch (err) {
        console.error(err.message + '🔥');
    }
};

const initializeArticles = async function () {
    try {
        const articles = await articlesModel.loadArticles();
        const randomArticleSelections = Object.keys(articles).map(
            articleTitle =>
                articles[articleTitle].at(
                    Math.trunc(Math.random() * articles[articleTitle].length),
                ),
        );

        articleResultsView.render({
            data: randomArticleSelections,
            isLink: true,
        });
    } catch (err) {
        console.error(err.message + '🔥');
    }
};

const initializeFoodRecipe = async function () {
    try {
        //Load Random trending Recipe ID
        const {
            data: { recipes_id: trendingRecipeID },
        } = await foodRecipeModel.loadTrendingRecipes();

        //Loading Recipes
        await foodRecipeModel.loadRecipe(
            trendingRecipeID[
                Math.trunc(Math.random() * trendingRecipeID.length)
            ],
        );

        //Render Recipe Markup
        recipeView.render({
            data: foodRecipeModel.state.entry,
            clearMarkup: false,
            isLink: true,
        });
    } catch (err) {
        console.error(err.message + '🔥');
    }
};

const initializeDrinksRecipe = async function () {
    try {
        //Load Random trending Recipe ID
        const {
            data: { recipes_id: trendingRecipeID },
        } = await drinksRecipeModel.loadTrendingRecipes();

        //Loading Recipes
        await drinksRecipeModel.loadRecipe(
            trendingRecipeID[
                Math.trunc(Math.random() * trendingRecipeID.length)
            ],
        );

        //Render Recipe Markup
        recipeView.render({
            data: drinksRecipeModel.state.entry,
            clearMarkup: false,
            isLink: true,
        });
    } catch (err) {
        console.error(err.message + '🔥');
    }
};

const search = async function () {
    const query = searchView.getQuery();
    const category = navbarView.category;

    const basePath = import.meta.env.BASE_URL;

    if (category === 'food')
        window.location.replace(
            `${basePath}src/pages/foodRecipes.html?search=${query}`,
        );
    if (category === 'drinks')
        window.location.replace(
            `${basePath}src/pages/drinksRecipes.html?search=${query}`,
        );
    if (category === 'articles')
        window.location.replace(
            `${basePath}src/pages/articles.html?search=${query}`,
        );
};

export default function init() {
    return Promise.all([
        initializeQuoteSlider(),
        initializeArticles(),
        initializeFoodRecipe(),
        initializeDrinksRecipe(),
        searchView.addHandlerSearch(search),
    ]).then(_ => transition.animateElementsTransition());
}
init();
