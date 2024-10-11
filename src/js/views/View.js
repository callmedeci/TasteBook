export default class View {
    _data;

    clear() {
        this._parentEl.innerHTML = '';
    }

    update(data) {
        this._data = data;
        const newMarkup = this._generateMarkup();
        const newDOM = document
            .createRange()
            .createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const curElements = Array.from(this._parentEl.querySelectorAll('*'));

        newElements.forEach((newEl, i) => {
            const curEl = curElements[i];

            if (
                !newEl.isEqualNode(curEl) &&
                newEl.firstChild?.nodeValue.trim() !== ''
            ) {
                curEl.textContent = newEl.textContent;
            }

            if (!newEl.isEqualNode(curEl))
                Array.from(newEl.attributes).forEach(attr => {
                    curEl.setAttribute(attr.name, attr.value);
                });
        });
    }

    render({
        data,
        render = true,
        hasSecondMarkup = false,
        clearMarkup = true,
        isLink = false,
    }) {
        this._data = data;
        const markup = this._generateMarkup(isLink);
        let secondMarkup;

        if (!render) return markup;

        if (clearMarkup) this.clear();
        this._parentEl.insertAdjacentHTML('afterbegin', markup);

        if (!hasSecondMarkup) return;
        secondMarkup = this._generateMarkupSecondMarkup();

        this.clear();
        this._parentEl.insertAdjacentHTML('afterbegin', secondMarkup);
    }

    renderSpinner() {
        const markup = `
       <div class="w-full h-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="spinner">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </div>
    `;
        this.clear();
        this._parentEl.insertAdjacentHTML('afterbegin', markup);
    }

    renderError(errorMessage = this._errorMessage) {
        this._parentEl.innerHTML = `
        <div class="mt-4 flex w-full items-center justify-center gap-3 col-span-full max-w-sm justify-self-center px-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-16">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
            </svg>
			<p class="text-zinc-50 font-open-sans-medium">${errorMessage}</p>
		</div>
        `;
    }

    renderSuccess() {
        this._parentEl.innerHTML = `<p class="text-center flex w-full h-full items-center justify-center text-zinc-50 font-open-sans-medium">${this._successMessage}</p>`;
    }
}
