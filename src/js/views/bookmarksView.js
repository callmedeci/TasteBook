import View from './View.js';
import previewRecipeView from './previewView.js';

class BookmarksView extends View {
    _parentEl = document.querySelector('.bookmark-container');
    _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
    constructor() {
        super();
    }

    addHandlerLoadBookmarks(handler) {
        window.addEventListener('load', () => handler());
    }
    _generateMarkup() {
        return this._data
            .map(bookmark =>
                previewRecipeView.render({ data: bookmark, render: false }),
            )
            .join('');
    }
}

export default new BookmarksView();
