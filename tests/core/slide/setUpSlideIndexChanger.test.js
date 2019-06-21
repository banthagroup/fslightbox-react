import { setUpSlideIndexChanger } from "../../../src/core/slide/setUpSlideIndexChanger";
import { TimeoutQueue } from "../../../src/core/timeouts/TimeoutQueue";
import { ANIMATION_TIME } from "../../../src/constants/css-constants";

const fsLightbox = {
    stageIndexes: {
        previous: undefined,
        current: undefined,
        next: undefined
    },
    collections: {
        sourcesHoldersTransformers: []
    },
    core: {
        slideIndexChanger: {},
        slideNumberUpdater: {
            updateSlideNumber: () => {},
        },
        sourceAnimator: {
            animateSourceFromIndex: () => {}
        },
        stageManager: {
            updateStageIndexes: () => {}
        }
    },
    injector: {
        injectDependency: () => ({})
    }
};
const slideIndexChanger = fsLightbox.core.slideIndexChanger;
const sourceAnimator = fsLightbox.core.sourceAnimator;

const sourcesHoldersTransformersCollection = fsLightbox.collections.sourcesHoldersTransformers;

describe('changeTo', () => {
    let updateSlideNumber;
    let updateStageIndexes;

    beforeAll(() => {
        fsLightbox.stageIndexes.current = 0;

        // mocking actions to working only if new current index is set - order matters!
        // we will be testing changing slide index to 2
        updateStageIndexes = jest.fn();
        updateSlideNumber = jest.fn();
        fsLightbox.core.stageManager.updateStageIndexes = () => {
            if (fsLightbox.stageIndexes.current === 2) {
                updateStageIndexes();
            }
        };
        fsLightbox.core.slideNumberUpdater.updateSlideNumber = () => {
            if (fsLightbox.stageIndexes.current === 2) {
                updateSlideNumber();
            }
        };

        setUpSlideIndexChanger(fsLightbox);
        slideIndexChanger.changeTo(2);
    });

    it('should set current index to 2', () => {
        expect(fsLightbox.stageIndexes.current).toBe(2);
    });

    it('should call updateStageIndexes', () => {
        expect(updateStageIndexes).toBeCalled();
    });

    it('should call updateSlideNumber', () => {
        expect(updateSlideNumber).toBeCalled();
    });
});

describe('changeToWithActions', () => {
    let previousSourceAnimator;
    let newSourceAnimator;

    const removeFadeOutQueue = {};

    let setTimeoutParams;

    // we will be testing changing slide from 3 to 0
    beforeAll(() => {
        fsLightbox.stageIndexes.current = 3;

        removeFadeOutQueue.startTimeout = jest.fn();
        fsLightbox.injector.injectDependency = (constructorDependency) => {
            if (constructorDependency === TimeoutQueue) {
                return removeFadeOutQueue;
            }
        };

        window.setTimeout = (...params) => {
            setTimeoutParams = params;
        };
        sourcesHoldersTransformersCollection[0] = {
            zero: jest.fn()
        };
        sourcesHoldersTransformersCollection[3] = {
            negative: jest.fn()
        };

        previousSourceAnimator = {
            removeFadeIn: jest.fn(),
            fadeOut: jest.fn()
        };
        newSourceAnimator = {
            removeFadeOut: jest.fn(),
            fadeIn: jest.fn()
        };
        sourceAnimator.animateSourceFromIndex = (index) => {
            if (index === 3) {
                return previousSourceAnimator;
            }
            if (index === 0) {
                return newSourceAnimator;
            }
        };

        setUpSlideIndexChanger(fsLightbox);
        slideIndexChanger.changeTo = jest.fn();
        slideIndexChanger.changeToWithActions(0);
    });

    it('should call changeTo with 4', () => {
        expect(slideIndexChanger.changeTo).toBeCalledWith(0)
    });

    describe('actions', () => {
        describe('removeFadeOutQueue action', () => {
            beforeAll(() => {
                sourceAnimator.removeFadeOutFromAllSources = jest.fn();
                removeFadeOutQueue.action();
            });

            it('should call sourceAnimator.removeFadeOutFromAllSources', () => {
                expect(sourceAnimator.removeFadeOutFromAllSources).toBeCalled();
            });
        });

        describe('transformSourcesHolders', () => {
            it('should call zero for new slide sourcesHoldersTransformer', () => {
                expect(sourcesHoldersTransformersCollection[0].zero).toBeCalled();
            });

            describe('setTimeout', () => {
                describe('callback', () => {
                    it(`should not call transform negative at previous slide SourceHolderTransformer, 
                        due to at call moment previous slide index is equals to slideIndexes.current`, () => {
                        fsLightbox.stageIndexes.current = 3;
                        setTimeoutParams[0](3);
                        expect(sourcesHoldersTransformersCollection[3].negative).not.toBeCalled();
                    });

                    it(`should call transform negative at previous slide SourceHolderTransformer, 
                        due to at call moment previous slide index was not equal to slideIndexes.current`, () => {
                        fsLightbox.stageIndexes.current = 0;
                        setTimeoutParams[0](3);
                        expect(sourcesHoldersTransformersCollection[3].negative).toBeCalled();
                    });
                });

                describe('timeout ms', () => {
                    it('should be animation time', () => {
                        expect(setTimeoutParams[1]).toBe(ANIMATION_TIME);
                    });
                });
            });
        });

        describe('animateSourceHolders', () => {
            it('should call removeFadeIn for previous slide source', () => {
                expect(previousSourceAnimator.removeFadeIn).toBeCalled();
            });

            it('should call fadeOut for previous slide source', () => {
                expect(previousSourceAnimator.fadeOut).toBeCalled();
            });

            it('should call removeFadeOut from new slide source', () => {
                expect(newSourceAnimator.removeFadeOut).toBeCalled();
            });

            it('should call fadeIn for new slide source', () => {
                expect(newSourceAnimator.fadeIn).toBeCalled();
            });
        });

        describe('removeFadeOutFromAllSourcesAfterQueueEnd', () => {
            it('should call startTimeout', () => {
                expect(removeFadeOutQueue.startTimeout).toBeCalled();
            });
        });
    });
});
