import Model from './Model.js';
import {
    FORKIFY_RECIPE_API_KEY,
    FORKIFY_API_URL,
    TRENDING_FOOD_RECIPES_PATH,
} from '../config/config';

class foodRecipeModel extends Model {
    _bookmarksPath = 'foodRecipeBookmarks';

    constructor() {
        super();
        this._initializeBookmarks();
    }

    _createRecipeObject(data) {
        const { recipe } = data;
        return {
            id: recipe.id,
            imageUrl: recipe.image_url,
            ingredients: recipe.ingredients,
            publisher: recipe.publisher,
            servings: recipe.servings,
            sourceUrl: recipe.source_url,
            title: recipe.title,
            cookingTime: recipe.cooking_time,
            ...(recipe.key && { key: recipe.key }),
        };
    }

    async loadTrendingRecipes() {
        try {
            const data = await this._AJAX(TRENDING_FOOD_RECIPES_PATH);

            this._isValidJSON(data.data.recipes_id);
            return data;
        } catch (err) {
            console.error(err.message);
            throw err.message;
        }
    }

    async loadRecipe(id) {
        try {
            const data = await this._AJAX(
                `${FORKIFY_API_URL}/${id}?key=${FORKIFY_RECIPE_API_KEY}`,
            );

            this.state.entry = this._createRecipeObject(data.data.data);

            if (this.state.bookmarks.some(bookmark => bookmark.id === id))
                this.state.entry.bookmarked = true;
        } catch (err) {
            console.error(err.message);
            throw err.message;
        }
    }

    async loadSearchResults(query) {
        try {
            this.state.search.page = 1;
            this.state.search.query = query;

            const {
                data: { data },
            } = await this._AJAX(
                `${FORKIFY_API_URL}?search=${query}&key=${FORKIFY_RECIPE_API_KEY}`,
            );

            this.state.search.results = data.recipes.map(rec => {
                return {
                    id: rec.id,
                    imageUrl: rec.image_url,
                    publisher: rec.publisher,
                    title: rec.title,
                    ...(rec.key && { key: rec.key }),
                };
            });
        } catch (err) {
            throw err.message;
        }
    }

    async uploadRecipe(newRecipe) {
        try {
            const recipe = {
                image_url: newRecipe.imageURL,
                source_url: newRecipe.sourceURL,
                cooking_time: newRecipe.cookingTime,
                title: newRecipe.title,
                publisher: newRecipe.publisher,
                servings: newRecipe.servings,
                ingredients: newRecipe.ingredients,
            };

            const {
                data: { data },
            } = await this._AJAX(
                `${FORKIFY_API_URL}?key=${FORKIFY_RECIPE_API_KEY}`,
                'POST',
                JSON.stringify(recipe),
            );

            this.state.entry = this._createRecipeObject(data);
            this.addBookmark(this.state.entry);
        } catch (err) {
            console.error(err.message);
            throw err;
        }
    }
}

export default new foodRecipeModel();
