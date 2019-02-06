export class DOMElement {
    constructor(tag) {
        this.element = document.createElement(tag);
    }

    addClassesFromArray(classesArray) {
        this.element.classList.add(...classesArray);
    }

    getElement() {
        return this.element;
    }
}