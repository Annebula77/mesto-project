export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = containerSelector;
        this._items = items;
    };
    //Метод добавляет элементы в разметку
    addItem(item) {
        this._container.prepend(item)
    };
    //Метод отрисовывает элементы
    rendererItems() {
        this._items.reverse().forEach(element => this._renderer(element));
    };
};
