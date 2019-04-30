import { setUpStage } from "../../../src/core/stage/setUpStage";
import { exportSpecifier } from "@babel/types";

const stage = {};
let slide;
const fsLightbox = {
    componentsStates: {
        slide: {
            get: () => slide,
            set: (number) => slide = number
        }
    },
    data: {
        totalSlides: 0
    },
    core: {
        stage: stage
    }
};

setUpStage(fsLightbox);
fsLightbox.data.totalSlides = 10;


describe('isSourceInStage', () => {
    it('should detect that sources in stage when its middle slide', () => {
        fsLightbox.componentsStates.slide.set(5);
        expect(stage.isSourceInStage(0)).toBeFalsy();
        expect(stage.isSourceInStage(1)).toBeFalsy();
        expect(stage.isSourceInStage(2)).toBeFalsy();
        expect(stage.isSourceInStage(3)).toBeTruthy();
        expect(stage.isSourceInStage(4)).toBeTruthy();
        expect(stage.isSourceInStage(5)).toBeTruthy();
        expect(stage.isSourceInStage(6)).toBeFalsy();
        expect(stage.isSourceInStage(7)).toBeFalsy();
        expect(stage.isSourceInStage(8)).toBeFalsy();
        expect(stage.isSourceInStage(9)).toBeFalsy();
    });

    it('should detect that previous sources is in stage when slide = 1', () => {
        fsLightbox.componentsStates.slide.set(1);
        expect(stage.isSourceInStage(9)).toBeTruthy();
    });

    it('should detect that next sources is in stage when slide = totalSlides', () => {
        fsLightbox.componentsStates.slide.set(10);
        expect(stage.isSourceInStage(0)).toBeTruthy();
    });
});

describe('StageSourcesIndexes', () => {
    it('should return previous slide array index', () => {
        fsLightbox.componentsStates.slide.set(5);
        expect(stage.getPreviousSlideIndex()).toEqual(fsLightbox.componentsStates.slide.get() - 2);
        fsLightbox.componentsStates.slide.set(1);
        expect(stage.getPreviousSlideIndex()).toEqual(fsLightbox.data.totalSlides - 1)
    });

    it('should return next slide array index', () => {
        expect(stage.getNextSlideIndex()).toEqual(fsLightbox.componentsStates.slide.get());
        fsLightbox.componentsStates.slide.set(fsLightbox.data.totalSlides);
        expect(stage.getNextSlideIndex()).toEqual(0);
    });

    it('should return object width previous, current and next slide array index', () => {
        fsLightbox.componentsStates.slide.set(5);
        expect(stage.getAllStageIndexes()).toEqual({
            previous: fsLightbox.componentsStates.slide.get() - 2,
            current: fsLightbox.componentsStates.slide.get() - 1,
            next: fsLightbox.componentsStates.slide.get()
        });

        fsLightbox.componentsStates.slide.set(1);
        expect(stage.getAllStageIndexes()).toEqual({
            previous: fsLightbox.data.totalSlides - 1,
            current: fsLightbox.componentsStates.slide.get() - 1,
            next: fsLightbox.componentsStates.slide.get()
        });

        fsLightbox.componentsStates.slide.set(fsLightbox.data.totalSlides);
        expect(stage.getAllStageIndexes()).toEqual({
            previous: fsLightbox.componentsStates.slide.get() - 2,
            current: fsLightbox.componentsStates.slide.get() - 1,
            next: 0
        });
    });

    describe('there are only 2 sources', () => {
        it('should return only current and next sources index (current slide is 1)', () => {
            fsLightbox.data.totalSlides = 2;
            fsLightbox.componentsStates.slide.set(1);
            expect(stage.getAllStageIndexes()).toEqual({
                current: 0,
                next: 1
            });
        });

        it('should return only current and previous sources index (current slide is 2)', () => {
            fsLightbox.data.totalSlides = 2;
            fsLightbox.componentsStates.slide.set(2);
            expect(stage.getAllStageIndexes()).toEqual({
                current: 1,
                previous: 0
            });
        });
    });

    it('should return only 1 index from getAllStageIndexes due to only 1 slide', () => {
        fsLightbox.data.totalSlides = 1;
        fsLightbox.componentsStates.slide.set(1);
        expect(stage.getAllStageIndexes()).toEqual({
            current: 0,
        });
    });
});


describe('getPreviousSlideNumber', () => {
    it('should return previous slide index + 1', () => {
        expect(stage.getPreviousSlideNumber()).toBe(stage.getPreviousSlideIndex() + 1);
    });
});

describe('getNextSlideNumber', () => {
    it('should return previous slide number + 1', () => {
        expect(stage.getNextSlideNumber()).toBe(stage.getNextSlideIndex() + 1);
    });
});