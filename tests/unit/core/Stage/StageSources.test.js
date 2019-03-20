import { FsLightboxEnzymeMock } from "../../../__mocks__/components/fsLightboxEnzymeMock";
import { StageSources } from "../../../../src/core/Stage/StageSources";
import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";

describe('StageSources', () => {
    const mock = new FsLightboxMock();
    const fsLightbox = mock.instantiateFsLightbox().getFsLightbox();
    const stageSources = new StageSources(fsLightbox);
    fsLightbox.data.totalSlides = 10;

    it('should detect that sources in stage when its middle slide', () => {
        fsLightbox.state.slide = 5;
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

    it('should detect that previous source is in stage when slide = 1', () => {
        fsLightbox.state.slide = 1;
        expect(stageSources.isSourceInStage(9)).toBeTruthy();
    });

    it('should detect that next source is in stage when slide = totalSlides', () => {
        fsLightbox.state.slide = 10;
        expect(stageSources.isSourceInStage(0)).toBeTruthy();
    });


    describe('StageSourcesIndexes', () => {
        it('should return previous slide array index', () => {
            fsLightbox.state.slide = 5;
            expect(stageSources.getPreviousSlideIndex()).toEqual(fsLightbox.state.slide - 2);
            fsLightbox.state.slide = 1;
            expect(stageSources.getPreviousSlideIndex()).toEqual(fsLightbox.data.totalSlides - 1)
        });

        it('should return next slide array index', () => {
            expect(stageSources.getNextSlideIndex()).toEqual(fsLightbox.state.slide);
            fsLightbox.state.slide = fsLightbox.data.totalSlides;
            expect(stageSources.getNextSlideIndex()).toEqual(0);
        });

        it('should return object width previous, current and next slide array index', () => {
            fsLightbox.state.slide = 5;
            expect(stageSources.getAllStageIndexes()).toEqual({
                previous: fsLightbox.state.slide - 2,
                current: fsLightbox.state.slide - 1,
                next: fsLightbox.state.slide
            });

            fsLightbox.state.slide = 1;
            expect(stageSources.getAllStageIndexes()).toEqual({
                previous: fsLightbox.data.totalSlides - 1,
                current: fsLightbox.state.slide - 1,
                next: fsLightbox.state.slide
            });

            fsLightbox.state.slide = fsLightbox.data.totalSlides;
            expect(stageSources.getAllStageIndexes()).toEqual({
                previous: fsLightbox.state.slide - 2,
                current: fsLightbox.state.slide - 1,
                next: 0
            });
        });


        it('should return only 2 indexes from getAllStageIndexes due to only 2 slides', () => {
            fsLightbox.data.totalSlides = 2;
            fsLightbox.state.slide = 2;
            expect(stageSources.getAllStageIndexes()).toEqual({
                current: 1,
                next: 0
            });
        });

        it('should return only 1 index from getAllStageIndexes due to only 1 slide', () => {
            fsLightbox.data.totalSlides = 1;
            fsLightbox.state.slide = 1;
            expect(stageSources.getAllStageIndexes()).toEqual({
                current: 0,
            });
        });
    })
});