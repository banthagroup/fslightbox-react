import { setUpSlideIndexChanger } from "./setUpSlideIndexChanger";
import { TimeoutQueue } from "../timeouts/TimeoutQueue";
import { ANIMATION_TIME } from "../../constants/css-constants";
import { SOURCES } from "../../constants/elements";
import { FADE_IN_CLASS_NAME, FADE_OUT_CLASS_NAME, LONG_FADE_IN_CLASS_NAME } from "../../constants/classes-names";

const fsLightbox = {
    collections: {
        sourcesHoldersTransformers: []
    },
    componentsStates: {
        slideNumberUpdater: {
            set: () => {},
            get: () => {}
        }
    },
    core: {
        classListManager: {
            manageArrayElementAtIndex: () => ({
                add: () => {},
                remove: () => {},
                removeIfContains: () => {}
            })
        },
        slideIndexChanger: {},
        stageManager: {
            updateStageIndexes: () => {}
        },
        slideNumberUpdater: {
            updateSlideNumber: () => {},
        }
    },
    data: {
        sourcesCount: 0
    },
    injector: {
        injectDependency: () => ({})
    },
    stageIndexes: {
        previous: undefined,
        current: undefined,
        next: undefined
    }
};

const slideNumberUpdaterState = fsLightbox.componentsStates.slideNumberUpdater;

const classListManager = fsLightbox.core.classListManager;
const stageManager = fsLightbox.core.stageManager;

const sourcesHoldersTransformersCollection = fsLightbox.collections.sourcesHoldersTransformers;

const slideIndexChanger = fsLightbox.core.slideIndexChanger;

describe('changeTo', () => {
    let updateSlideNumber;
    let updateStageIndexes;

    beforeAll(() => {
        fsLightbox.stageIndexes.current = 0;

        // mocking actions to working only if new current index is set - order matters!
        // we will be testing changing slide index to 2
        updateStageIndexes = jest.fn();
        updateSlideNumber = jest.fn();
        stageManager.updateStageIndexes = () => {
            if (fsLightbox.stageIndexes.current === 2) {
                updateStageIndexes();
            }
        };
        slideNumberUpdaterState.get = () => false;
        slideNumberUpdaterState.set = (updaterValue) => {
            if (fsLightbox.stageIndexes.current === 2) {
                updateSlideNumber(updaterValue);
            }
        };

        setUpSlideIndexChanger(fsLightbox);
        slideIndexChanger.changeTo(2);
    });

    test('simple actions', () => {
        expect(fsLightbox.stageIndexes.current).toBe(2);
        expect(updateSlideNumber).toBeCalledWith(true);
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


        classListManager.manageArrayElementAtIndex = (elementsArrayName, index) => {
            if (elementsArrayName !== SOURCES) {
                return;
            }
            if (index === 3) {
                return previousSourceAnimator;
            }
            if (index === 0) {
                return newSourceAnimator;
            }
        };
        previousSourceAnimator = {
            removeIfContains: jest.fn(),
            add: jest.fn()
        };
        newSourceAnimator = {
            removeIfContains: jest.fn(),
            add: jest.fn()
        };


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

        setUpSlideIndexChanger(fsLightbox);
        slideIndexChanger.changeTo = jest.fn();
        slideIndexChanger.changeToWithActions(0);
    });

    it('should call changeTo with 4', () => {
        expect(slideIndexChanger.changeTo).toBeCalledWith(0)
    });

    describe('actions', () => {
        describe('removeFadeOutQueue', () => {
            let manageArrayElementAtIndexIndex = -1;
            const removeIfContains = jest.fn();

            beforeAll(() => {
                classListManager.manageArrayElementAtIndex = (elementsArrayName, index) => {
                    manageArrayElementAtIndexIndex++;
                    if (elementsArrayName === SOURCES && index === manageArrayElementAtIndexIndex) {
                        return {
                            removeIfContains: removeIfContains
                        }
                    }
                };
                removeFadeOutQueue.action();
            });

            it('should set time to animation time', () => {
                expect(removeFadeOutQueue.time).toBe(ANIMATION_TIME);
            });

            it('should remove fade out from all sources if they contain it', () => {
                expect(removeIfContains).toBeCalledTimes(fsLightbox.data.sourcesCount);
            });
        });

        test('animating previous slide source', () => {
            expect(previousSourceAnimator.removeIfContains).toBeCalledWith(FADE_IN_CLASS_NAME);
            expect(previousSourceAnimator.removeIfContains).toBeCalledWith(LONG_FADE_IN_CLASS_NAME);
            expect(previousSourceAnimator.add).toBeCalledWith(FADE_OUT_CLASS_NAME);
        });

        test('animating new slide source', () => {
            expect(newSourceAnimator.removeIfContains).toBeCalledWith(FADE_OUT_CLASS_NAME);
            expect(newSourceAnimator.add).toBeCalledWith(FADE_IN_CLASS_NAME);
        });

        test('removeFadeOutFromAllSourcesAfterQueueEnd', () => {
            expect(removeFadeOutQueue.startTimeout).toBeCalled();
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
    });
});
