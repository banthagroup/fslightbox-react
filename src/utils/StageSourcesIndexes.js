export class StageSourcesIndexes {

    constructor(data) {
        this.data = data;
    }

    previousSlideIndex() {
        let previousSlideIndex;
        (this.data.slide === 1) ?
            previousSlideIndex = this.data.totalSlides - 1:
            previousSlideIndex = this.data.slide - 2;

        return previousSlideIndex;
    }

    nextSlideIndex() {
        let nextSlideIndex;
        (this.data.slide === this.data.totalSlides) ?
            nextSlideIndex = 0:
            nextSlideIndex = this.data.slide;

        return nextSlideIndex;
    }

    allStageIndexes() {
        return {
            previous: this.previousSlideIndex(),
            current: this.data.slide - 1,
            next: this.nextSlideIndex()
        };
    }
}