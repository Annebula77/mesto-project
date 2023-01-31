export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
        this._items = items;
    };

    addItem(item) {
        this._container.prepend(item);
    };

    renderItems() {
        this._items.reverse().forEach(element => {this._renderer(element)});
    };

};
