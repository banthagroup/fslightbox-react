import { SourceController } from "../../../src/core/sources/SourceController";
import { OPACITY_0_CLASS_NAME } from "../../../src/constants/cssConstants";

const source = document.createElement('div');
const sourceSizeAdjuster = {
    setIndex: () => {},
    setMaxDimensions: () => {},
    adjustSourceSize: () => {}
};
const fsLightbox = {
    sourcesData: {
        isSourceAlreadyInitializedArray: []
    },
    elements: {
        sources: [{
            current: source
        }],
    },
    collections: {
        sourceSizeAdjusters: [],
    },
    core: {
        sourceAnimator: {
            animateSourceFromIndex: () => {},
        },
        stageSources: {
            isSourceInStage: () => {},
        },
    },
    injector: {
        source: {
            getSourceSizeAdjuster: () => sourceSizeAdjuster
        }
    }
};

/** @var { SourceController } sourceController */
let sourceController;

const recreateSourceControllerSet0IndexAndCallInitialLoad = () => {
    sourceController = new SourceController(fsLightbox);
    sourceController.setIndex(0);
    sourceController.initialLoad();
};

describe('normalLoad', () => {
    beforeAll(() => {
        sourceController = new SourceController(fsLightbox);
    });

    describe('not removing opacity 0 className', () => {
        beforeAll(() => {
            source.classList.contains = jest.fn(() => false);
            source.classList.remove = jest.fn();
            sourceController.setIndex(0);
            sourceController.normalLoad();
        });

        it('should call contains with opacity 0 class name', () => {
            expect(source.classList.contains).toBeCalledWith(OPACITY_0_CLASS_NAME);
        });

        it('should not call remove', () => {
            expect(source.classList.remove).not.toBeCalled();
        });
    });

    describe('removing opacity 0 className', () => {
        beforeAll(() => {
            source.classList.contains = jest.fn(() => true);
            source.classList.remove = jest.fn();
            sourceController.setIndex(0);
            sourceController.normalLoad();
        });

        it('should call contains with opacity 0 class name', () => {
            expect(source.classList.contains).toBeCalledWith(OPACITY_0_CLASS_NAME);
        });

        it('should call remove with opacity 0 class name', () => {
            expect(source.classList.remove).toBeCalledWith(OPACITY_0_CLASS_NAME);
        });
    });
});

describe('initialLoad', () => {
    describe('handling opacity 0 class name', () => {
        describe('not removing opacity 0 className', () => {
            beforeAll(() => {
                source.classList.contains = jest.fn(() => false);
                source.classList.remove = jest.fn();
                recreateSourceControllerSet0IndexAndCallInitialLoad();
            });

            it('should call contains with opacity 0 class name', () => {
                expect(source.classList.contains).toBeCalledWith(OPACITY_0_CLASS_NAME);
            });

            it('should not call remove', () => {
                expect(source.classList.remove).not.toBeCalled();
            });
        });

        describe('removing opacity 0 className', () => {
            beforeAll(() => {
                source.classList.contains = jest.fn(() => true);
                source.classList.remove = jest.fn();
                recreateSourceControllerSet0IndexAndCallInitialLoad()
            });

            it('should call contains with opacity 0 class name', () => {
                expect(source.classList.contains).toBeCalledWith(OPACITY_0_CLASS_NAME);
            });

            it('should call remove with opacity 0 class name', () => {
                expect(source.classList.remove).toBeCalledWith(OPACITY_0_CLASS_NAME);
            });
        });
    });

    describe('setUpSourceSizeAdjuster', () => {
        beforeAll(() => {
            sourceSizeAdjuster.setIndex = jest.fn();
            sourceSizeAdjuster.setMaxDimensions = jest.fn();
            let sourceController = new SourceController(fsLightbox);
            sourceController.setSourceWidth(1500);
            sourceController.setSourceHeight(1000);
            sourceController.setIndex(0);
            sourceController.initialLoad();
        });

        it('should call setIndex with 0', () => {
            expect(sourceSizeAdjuster.setIndex).toBeCalledWith(0);
        });

        it('should call setMaxDimensions with 1500 and 1000', () => {
            expect(sourceSizeAdjuster.setMaxDimensions).toBeCalledWith(1500, 1000);
        });

        it('should add sourceSizeAdjuster sourceSizeAdjusters array', () => {
            expect(fsLightbox.collections.sourceSizeAdjusters[0]).toEqual(sourceSizeAdjuster);
        });
    });

    describe('adjustSourceSize', () => {
        beforeAll(() => {
            sourceSizeAdjuster.adjustSourceSize = jest.fn();
            recreateSourceControllerSet0IndexAndCallInitialLoad();
        });

        it('should call adjustSourceSize on proper SourceSizeAdjuster in array', () => {
            expect(fsLightbox.collections.sourceSizeAdjusters[0].adjustSourceSize).toBeCalled();
        });
    });

    describe('longFadeInSourceIfItsInStage', () => {
        let longFadeIn;

        describe('source is not in stage', () => {
            beforeAll(() => {
                longFadeIn = jest.fn();
                fsLightbox.core.stageSources.isSourceInStage = jest.fn(() => false);
                fsLightbox.core.sourceAnimator.animateSourceFromIndex = jest.fn(() => ({
                    longFadeIn: longFadeIn
                }));
                recreateSourceControllerSet0IndexAndCallInitialLoad();
            });

            it('should call isSourceInStage with 0 ', () => {
                expect(fsLightbox.core.stageSources.isSourceInStage).toBeCalledWith(0);
            });

            it('should not call animateSourceFromIndex', () => {
                expect(fsLightbox.core.sourceAnimator.animateSourceFromIndex).not.toBeCalled();
            });
        });

        describe('source is in stage', () => {
            beforeAll(() => {
                longFadeIn = jest.fn();
                fsLightbox.core.stageSources.isSourceInStage = jest.fn(() => true);
                fsLightbox.core.sourceAnimator.animateSourceFromIndex = jest.fn(() => ({
                    longFadeIn: longFadeIn
                }));
                recreateSourceControllerSet0IndexAndCallInitialLoad();
            });

            it('should call isSourceInStageWith 0', () => {
                expect(fsLightbox.core.stageSources.isSourceInStage).toBeCalledWith(0);
            });

            it('should call animateSourceFromIndex with 0', () => {
                expect(fsLightbox.core.sourceAnimator.animateSourceFromIndex).toBeCalledWith(0);
            });

            it('should call longFadeIn', () => {
                expect(longFadeIn).toBeCalled();
            });
        });
    });

    describe('setIsSourceAlreadyInitializedToTrue', () => {
        beforeAll(() => {
            fsLightbox.sourcesData.isSourceAlreadyInitializedArray[0] = false;
            recreateSourceControllerSet0IndexAndCallInitialLoad();
        });

        it('should true at 0 index in setIsSourceAlreadyInitialized array', () => {
            expect(fsLightbox.sourcesData.isSourceAlreadyInitializedArray[0]).toBe(true)
        });
    });
});



