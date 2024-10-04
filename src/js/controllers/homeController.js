import { generateRandomNumber } from '../helper/helper.js';
import quotesModel from '../models/quotesModel.js';
import * as transition from '../views/transitionView.js';
import articlesModel from '../models/articlesModel.js';
import foodRecipeModel from './../models/foodRecipeModel.js';
import drinksRecipeModel from './../models/drinksRecipeModel.js';
import sliderView from '../views/slidersView.js';
import recipeView from '../views/recipe/recipeView.js';
import articleResultsView from '../views/article/articleResultsView.js';
import navbarView from '../views/navbarView.js';
import viewHeader from '../views/headerView.js';

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
                    generateRandomNumber(1, articles[articleTitle].length),
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
            trendingRecipeID[generateRandomNumber(0, trendingRecipeID.length)],
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
            trendingRecipeID[generateRandomNumber(0, trendingRecipeID.length)],
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

function init() {
    return Promise.all([
        initializeQuoteSlider(),
        initializeArticles(),
        initializeFoodRecipe(),
        initializeDrinksRecipe(),
    ]).then(_ => transition.animateElementsTransition());
}
await init();
