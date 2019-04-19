import { StageSources } from "../../../src/core/stage/StageSources";
import { FsLightboxMock } from "../../__mocks__/components/fsLightboxMock";

describe('StageSources', () => {
    const mock = new FsLightboxMock();
    const fsLightbox = mock.getFsLightbox();
    const stageSources = new StageSources(fsLightbox);
    fsLightbox.data.totalSlides = 10;

    it('should detect that sources in stage when its middle slide', () => {
        fsLightbox.componentsStates.slide.set(5);
        expect(stageSources.isSourceInStage(0)).toBeFalsy();
        expect(stageSources.isSourceInStage(1)).toBeFalsy();
        expect(stageSources.isSourceInStage(2)).toBeFalsy();
        expect(stageSources.isSourceInStage(3)).toBeTruthy();
        expect(stageSources.isSourceInStage(4)).toBeTruthy();
        expect(stageSources.isSourceInStage(5)).toBeTruthy();
        expect(stageSources.isSourceInStage(6)).toBeFalsy();
        expect(stageSources.isSourceInStage(7)).toBeFalsy();
        expect(stageSources.isSourceInStage(8)).toBeFalsy();
        expect(stageSources.isSourceInStage(9)).toBeFalsy();
    });

    it('should detect that previous sources is in stage when slide = 1', () => {
        fsLightbox.componentsStates.slide.set(1);
        expect(stageSources.isSourceInStage(9)).toBeTruthy();
    });

    it('should detect that next sources is in stage when slide = totalSlides', () => {
        fsLightbox.componentsStates.slide.set(10);
        expect(stageSources.isSourceInStage(0)).toBeTruthy();
    });


    describe('StageSourcesIndexes', () => {
        it('should return previous slide array index', () => {
            fsLightbox.componentsStates.slide.set(5);
            expect(stageSources.getPreviousSlideIndex()).toEqual(fsLightbox.componentsStates.slide.get() - 2);
            fsLightbox.componentsStates.slide.set(1);
            expect(stageSources.getPreviousSlideIndex()).toEqual(fsLightbox.data.totalSlides - 1)
        });

        it('should return next slide array index', () => {
            expect(stageSources.getNextSlideIndex()).toEqual(fsLightbox.componentsStates.slide.get());
            fsLightbox.componentsStates.slide.set(fsLightbox.data.totalSlides);
            expect(stageSources.getNextSlideIndex()).toEqual(0);
        });

        it('should return object width previous, current and next slide array index', () => {
            fsLightbox.componentsStates.slide.set(5);
            expect(stageSources.getAllStageIndexes()).toEqual({
                previous: fsLightbox.componentsStates.slide.get() - 2,
                current: fsLightbox.componentsStates.slide.get() - 1,
                next: fsLightbox.componentsStates.slide.get()
            });

            fsLightbox.componentsStates.slide.set(1);
            expect(stageSources.getAllStageIndexes()).toEqual({
                previous: fsLightbox.data.totalSlides - 1,
                current: fsLightbox.componentsStates.slide.get() - 1,
                next: fsLightbox.componentsStates.slide.get()
            });

            fsLightbox.componentsStates.slide.set(fsLightbox.data.totalSlides);
            expect(stageSources.getAllStageIndexes()).toEqual({
                previous: fsLightbox.componentsStates.slide.get() - 2,
                current: fsLightbox.componentsStates.slide.get() - 1,
                next: 0
            });
        });

        describe('there are only 2 sources', () => {
            it('should return only current and next sources index (current slide is 1)', () => {
                fsLightbox.data.totalSlides = 2;
                fsLightbox.componentsStates.slide.set(1);
                expect(stageSources.getAllStageIndexes()).toEqual({
                    current: 0,
                    next: 1
                });
            });

            it('should return only current and previous sources index (current slide is 2)', () => {
                fsLightbox.data.totalSlides = 2;
                fsLightbox.componentsStates.slide.set(2);
                expect(stageSources.getAllStageIndexes()).toEqual({
                    current: 1,
                    previous: 0
                });
            });
        });

        it('should return only 1 index from getAllStageIndexes due to only 1 slide', () => {
            fsLightbox.data.totalSlides = 1;
            fsLightbox.componentsStates.slide.set(1);
            expect(stageSources.getAllStageIndexes()).toEqual({
                current: 0,
            });
        });
    })
});
