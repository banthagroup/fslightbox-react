export class TransformSetter {
    constructor(data) {
        this.data = data;
    }

    minus(element) {
        element.style.transform = 'translate(' + (-this.data.slideDistance * window.innerWidth) + 'px,0)';
    }

    zero(element) {
        element.style.transform = 'translate(0,0)';
    }

    plus(element) {
        element.style.transform = 'translate(' + this.data.slideDistance * window.innerWidth + 'px,0)';
    }
}