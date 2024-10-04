import Model from './Model.js';
import { QUOTES_RECIPES_PATH } from '../config/config.js';

class QuotesModel extends Model {

    state = {
        quotes: {
            quotesOnDrinks: [],
            quotesOnFoods: [],
        },
        entry: {},
        bookmark: [],
    };

    constructor() {
        super();
    }

	_createQuotesObject (data) {
		return {
			quotesOnDrinks: data.quotes_on_drinks,
			quotesOnFoods: data.quotes_on_foods,
		};
	};

	async loadQuotes () {
		try {
			const { data } = await this._AJAX(QUOTES_RECIPES_PATH);
			this._isValidJSON(data);

			this.state.quotes = this._createQuotesObject(data);

			return this.state.quotes;
		} catch (err) {
			throw err;
		}
	};


}
export default new QuotesModel();

