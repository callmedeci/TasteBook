import View from '../View.js';
import previewArticleView from './previewArticleView.js';

class ArticleResultsView extends View {
    _parentEl = document.querySelector('.article-wrapper');
    _errorMessage = 'Nothing Found :(';

    constructor() {
        super();
    }

    _generateMarkup(isLink) {
        return this._data
            .map(article =>
                previewArticleView.render({
                    data: article,
                    render: false,
                    isLink: isLink,
                }),
            )
            .join('');
    }
}

export default new ArticleResultsView();
