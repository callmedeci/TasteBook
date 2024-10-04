import View from '../View.js';

class AddRecipeView extends View {
    _successMessage = 'Your recipe added successfully :)';
    _parentEl = document.querySelector('.upload');

    _btnClose = document.querySelector('.btn-close_modal');
    _btnOpen = document.querySelector('.btn-open_modal');
    _btnOpenMobile = document.querySelector('#btn-open--modal_mobile');
    _overlay = document.querySelector('.overlay');
    _window = document.querySelector('.window');

    _ingredientItemsList = [];
    _btnAddIngredient = document.querySelector('#btn-add-ingredient');
    _recipeQuantityFiled = document.querySelector('#ingredients-quantity');
    _recipeUnitFiled = document.querySelector('#ingredients-unit');
    _recipeDescriptionFiled = document.querySelector(
        '#ingredients-description',
    );
    _recipeIngredientsList = document.querySelector('.recipe-ingredients_list');
    _comboBoxToggle = document.querySelectorAll('.combobox-toggle');
    _comboBox = document.querySelectorAll('.combobox');
    _cookingField = document.querySelector('#cooking-time');
    _servingsField = document.querySelector('#servings');

    constructor() {
        super();
        this._addHandlerShowWindow();
        this._addHandlerCloseWindow();
        this._addHandlerToggleCombobox();
        this._addHandlerAddIngredient();
        this._addHandlerRemoveIngredient();
        this._addHandlerCloseCombobox();
    }

    toggleWindow() {
        document.body.classList.toggle('overflow-hidden');
        this._window.classList.toggle('hidden-window');
    }

    _closeCombobox(e) {
        if (e.target.closest('.combobox-toggle')) return;
        this._comboBox.forEach(combo => {
            combo.classList.add('hidden-combo');
        });
    }

    _toggleCombobox(e) {
        const id = e.target.closest('.combobox-toggle').id;

        this._comboBox.forEach(combo => {
            const currentCombo = combo.id.split('-')[0];
            const currentBtn = id.split('-')[0];

            if (currentCombo === currentBtn) {
                combo.classList.toggle('hidden-combo');
                combo.addEventListener('click', event =>
                    this._addHandleComboSelect(event, currentCombo),
                );
            }
        });
    }

    _handleAddIngredient(e) {
        e.preventDefault();
        if (!this._recipeDescriptionFiled.value)
            return this._recipeDescriptionFiled.classList.add(
                'border',
                'border-rose-500',
            );
        else this._recipeDescriptionFiled.classList.add('border-none');

        this._recipeIngredientsList.classList.remove('invisible', 'opacity-0');
        this._recipeIngredientsList.insertAdjacentHTML(
            'afterbegin',
            this._generateMarkup(
                this._recipeQuantityFiled.value,
                this._recipeUnitFiled.value,
                this._recipeDescriptionFiled.value,
            ),
        );

        this._ingredientItemsList.push(
            `${this._recipeQuantityFiled.value} ${this._recipeUnitFiled.value} ${this._recipeDescriptionFiled.value}`,
        );

        this._recipeQuantityFiled.value =
            this._recipeUnitFiled.value =
            this._recipeDescriptionFiled.value =
                '';
    }

    _handleRemoveIngredient(e) {
        const btn = e.target.closest('#btn-remove-ingredient');
        if (!btn) return;

        const currentIng = this._ingredientItemsList.findIndex(
            ing => ing === btn.parentNode.textContent.trim(),
        );

        btn.parentElement.remove();
        this._ingredientItemsList.splice(currentIng, 1);

        if (this._ingredientItemsList.length <= 0)
            this._recipeIngredientsList.classList.add('invisible', 'opacity-0');
    }

    _addHandleComboSelect(e, combo) {
        this[`_${combo}Field`].value = e.target.value;
    }

    _addHandlerToggleCombobox() {
        this._comboBoxToggle.forEach(btn =>
            btn.addEventListener('click', this._toggleCombobox.bind(this)),
        );
    }

    _addHandlerAddIngredient() {
        this._btnAddIngredient.addEventListener(
            'click',
            this._handleAddIngredient.bind(this),
        );
    }

    _addHandlerRemoveIngredient() {
        this._recipeIngredientsList.addEventListener(
            'click',
            this._handleRemoveIngredient.bind(this),
        );
    }

    _addHandlerShowWindow() {
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
        this._btnOpenMobile.addEventListener(
            'click',
            this.toggleWindow.bind(this),
        );
    }

    _addHandlerCloseWindow() {
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    }

    _addHandlerCloseCombobox() {
        document.body.addEventListener('click', this._closeCombobox.bind(this));
    }

    _generateMarkup(quantity, unit, description) {
        return `
     		<li class="bg-zinc-900 rounded px-3 py-2 flex flex-wrap items-center gap-2 w-full h-max col-span-1 object-fill">
     		   <button type="button" id="btn-remove-ingredient" class="text-rose-600">
     		     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
     		       stroke="currentColor" class="size-4">
     		       <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
     		     </svg>
     		   </button>
     		   <p class="font-open-sans-regular text-xs sm:text-sm md:text-base w-full break-words">
     		   		${quantity} ${unit} ${description}
     		   	</p>
     		 </li>
    `;
    }

    addHandlerUpload(handler) {
        this._parentEl.addEventListener('submit', e => {
            e.preventDefault();
            const data = {
                ...Object.fromEntries([...new FormData(this._parentEl)]),
                ingredients: this._ingredientItemsList.map(ingredient => {
                    const ing = ingredient.split(' ').map(ing => ing.trim());
                    const [quantity, unit, description] = ing;

                    return {
                        quantity: quantity ? +quantity : null,
                        unit,
                        description,
                    };
                }),
            };

            handler(data);
        });
    }
}

export default new AddRecipeView();
