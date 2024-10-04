import Model from './Model.js';
import {
    COCKTAIL_API_URL,
    TRENDING_DRINKS_RECIPES_PATH,
} from '../config/config';

class DrinksRecipeModel extends Model {
    _bookmarksPath = 'drinkRecipeBookmarks';

    constructor() {
        super();
        this._initializeBookmarks();
    }

    _createRecipeObject(data) {
        return {
            id: data.idDrink,
            imageUrl: data.strDrinkThumb,
            ingredients: Object.keys(data)
                .filter(key => key.startsWith('strIngredient'))
                .map(ing => data[ing])
                .filter(ing => ing !== null),
            title: data.strDrink,
            instructions: data.strInstructions,
            servings: data.strMeasure1,
            glass: data.strGlass,
            alcoholic: data.strAlcoholic,
            category: data.strCategory,
            ...(data.strVideo && { sourceUrl: data.strVideo }),
        };
    }

    async loadTrendingRecipes() {
        try {
            const data = await this._AJAX(TRENDING_DRINKS_RECIPES_PATH);

            this._isValidJSON(data.data.recipes_id);

            return data;
        } catch (err) {
            throw err;
        }
    }

    async loadRecipe(id) {
        try {
            const {
                data: { drinks },
            } = await this._AJAX(`${COCKTAIL_API_URL}lookup.php?i=${id}&key=1`);
            this.state.entry = this._createRecipeObject(drinks[0]);

            if (this.state.bookmarks.some(bookmark => bookmark.id === id))
                this.state.entry.bookmarked = true;
        } catch (err) {
            throw err;
        }
    }

    async loadSearchResults(query) {
        try {
            this.state.search.page = 1;
            this.state.search.query = query;

            const {
                data: { drinks },
            } = await this._AJAX(
                `${COCKTAIL_API_URL}search.php?s=${query}&key=1`,
            );

            this.state.search.results = drinks.map(rec => {
                return {
                    id: rec.idDrink,
                    imageUrl: rec.strDrinkThumb,
                    category: rec.strCategory,
                    title: rec.strDrink,
                    alcoholic: rec.strAlcoholic,
                };
            });
        } catch (err) {
            throw err;
        }
    }
}

export default new DrinksRecipeModel();
