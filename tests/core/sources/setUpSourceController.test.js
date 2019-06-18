import { OPACITY_0_CLASS_NAME } from "../../../src/constants/css-constants";
import { setUpSourceController } from "../../../src/core/sources/setUpSourceController";
import { SourceSizeAdjuster } from "../../../src/core/sizes/SourceSizeAdjuster";

const sourceController = {};
const source = document.createElement('div');
const sourceSizeAdjuster = {
    setIndex: () => {},
    setMaxDimensions: () => {},
    adjustSourceSize: () => {}
};
const fsLightbox = {
    elements: {
        sources: [{
            current: source
        }],
    },
    collections: {
        sourceSizeAdjusters: [],
    },
    injector: {
        injectDependency: () => sourceSizeAdjuster
    },
    core: {
        sourceAnimator: {
            animateSourceFromIndex: () => {},
        },
        stage: {
            isSourceInStage: () => {},
        },
        sourcesHoldersTransformer: {
            transformSourceHolderAtIndex: () => ({
                negative: () => {}
            })
        },
        sourceController: sourceController
    }
};

setUpSourceController(fsLightbox);

const recreateSourceControllerSet0IndexAndCallInitialLoad = () => {
    setUpSourceController(fsLightbox);
    sourceController.setIndex(0);
    sourceController.runInitialLoadActions();
};

const setIndexAndCallInitialLoad = () => {
    sourceController.setIndex(0);
    sourceController.runInitialLoadActions();
};

describe('runNormalLoadActions', () => {
    describe('opacity 0 class', () => {
        describe('not removing opacity 0 className', () => {
            beforeAll(() => {
                source.classList.contains = jest.fn(() => false);
                source.classList.remove = jest.fn();
                sourceController.setIndex(0);
                sourceController.runNormalLoadActions();
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
                sourceController.runNormalLoadActions();
            });

            it('should call contains with opacity 0 class name', () => {
                expect(source.classList.contains).toBeCalledWith(OPACITY_0_CLASS_NAME);
            });

            it('should call remove with opacity 0 class name', () => {
                expect(source.classList.remove).toBeCalledWith(OPACITY_0_CLASS_NAME);
            });
        });
    });

    describe('transforming source negative if not in stage', () => {
        describe('not calling transform (source is in stage)', () => {
            beforeAll(() => {
                fsLightbox.core.stage.isSourceInStage = () => true;
                fsLightbox.core.sourcesHoldersTransformer.transformSourceHolderAtIndex = jest.fn();
                sourceController.setIndex(0);
                sourceController.runNormalLoadActions();
            });

            it('should not call transformAtIndex', () => {
                expect(fsLightbox.core.sourcesHoldersTransformer.transformSourceHolderAtIndex).not.toBeCalled();
            });
        });

        describe('calling transform (source is not in stage)', () => {
            let negative;

            beforeAll(() => {
                negative = jest.fn();
                fsLightbox.core.stage.isSourceInStage = () => false;
                fsLightbox.core.sourcesHoldersTransformer.transformSourceHolderAtIndex = jest.fn(() => ({
                    negative: negative
                }));
                sourceController.setIndex(0);
                sourceController.runNormalLoadActions();
            });

            it('should call transformAtIndex', () => {
                expect(fsLightbox.core.sourcesHoldersTransformer.transformSourceHolderAtIndex).toBeCalled();
            });

            it('should call negative', () => {
                expect(negative).toBeCalled();
            });
        });
    });
});

describe('runInitialLoadActions', () => {
    describe('calling runNormalLoadActions ', () => {
        beforeAll(() => {
            sourceController.runNormalLoadActions = jest.fn();
            setIndexAndCallInitialLoad();
        });

        it('should call runNormalLoadActions', () => {
            expect(sourceController.runNormalLoadActions).toBeCalled();
        });
    });

    describe('setUpSourceSizeAdjuster', () => {
        beforeAll(() => {
            fsLightbox.injector.injectDependency = jest.fn(() => sourceSizeAdjuster);
            sourceSizeAdjuster.setIndex = jest.fn();
            sourceSizeAdjuster.setMaxDimensions = jest.fn();
            setUpSourceController(fsLightbox);
            sourceController.setSourceWidth(1500);
            sourceController.setSourceHeight(1000);
            sourceController.setIndex(0);
            sourceController.runInitialLoadActions();
        });

        it('should inject SourceSizeAdjuster', () => {
            expect(fsLightbox.injector.injectDependency).toBeCalledWith(SourceSizeAdjuster);
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

        afterAll(() => {
            fsLightbox.injector.injectDependency = () => sourceSizeAdjuster;
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
                fsLightbox.core.stage.isSourceInStage = jest.fn(() => false);
                fsLightbox.core.sourceAnimator.animateSourceFromIndex = jest.fn(() => ({
                    longFadeIn: longFadeIn
                }));
                recreateSourceControllerSet0IndexAndCallInitialLoad();
            });

            it('should call isSourceInStage with 0 ', () => {
                expect(fsLightbox.core.stage.isSourceInStage).toBeCalledWith(0);
            });

            it('should not call animateSourceFromIndex', () => {
                expect(fsLightbox.core.sourceAnimator.animateSourceFromIndex).not.toBeCalled();
            });
        });

        describe('source is in stage', () => {
            beforeAll(() => {
                longFadeIn = jest.fn();
                fsLightbox.core.stage.isSourceInStage = jest.fn(() => true);
                fsLightbox.core.sourceAnimator.animateSourceFromIndex = jest.fn(() => ({
                    longFadeIn: longFadeIn
                }));
                recreateSourceControllerSet0IndexAndCallInitialLoad();
            });

            it('should call isSourceInStageWith 0', () => {
                expect(fsLightbox.core.stage.isSourceInStage).toBeCalledWith(0);
            });

            it('should call animateSourceFromIndex with 0', () => {
                expect(fsLightbox.core.sourceAnimator.animateSourceFromIndex).toBeCalledWith(0);
            });

            it('should call longFadeIn', () => {
                expect(longFadeIn).toBeCalled();
            });
        });
    });
});
