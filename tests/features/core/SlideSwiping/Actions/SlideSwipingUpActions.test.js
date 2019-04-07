import { FsLightboxMock } from "../../../../__mocks__/components/fsLightboxMock";
import { SlideSwipingUpActions } from "../../../../../src/core/SlideSwiping/Actions/SlideSwipingUpActions";

const fsLightboxMock = new FsLightboxMock();
let fsLightbox = fsLightboxMock.getFsLightbox();
fsLightboxMock.setAllSourceHoldersToDivs();
/** @var { SlideSwipingUpActions } slideSwipingUpActions */
let slideSwipingUpActions;
let mockSwipingProps = {};

const createNewSlideSwipingUpActionsAndCallMethods = () => {
    slideSwipingUpActions = new SlideSwipingUpActions(fsLightbox, mockSwipingProps);
    slideSwipingUpActions.setUpMethodsAccordingToNumberOfSlides();
    slideSwipingUpActions.runActions();
};

describe('constructor', () => {
    let swipingTransitioner;
    beforeEach(() => {
        swipingTransitioner = {};
        fsLightbox.injector.slideSwiping.getSwipingTransitioner = jest.fn(() => swipingTransitioner);
        fsLightbox.injector.slideSwiping.getSwipingSlideChangerForSwipingTransitioner = jest.fn();
        slideSwipingUpActions = new SlideSwipingUpActions(fsLightbox, mockSwipingProps)
    });

    describe('instantiating SwipingTransitioner', () => {
        it('should call getSwipingTransitioner', () => {
            expect(fsLightbox.injector.slideSwiping.getSwipingTransitioner).toBeCalled();
        });
    });

    describe('instantiating SwipingSlideChanger', () => {
        it('should call getSwipingSlideChangerForSwipingTransitioner with swipingTransitioner', () => {
            expect(fsLightbox.injector.slideSwiping.getSwipingSlideChangerForSwipingTransitioner)
                .toBeCalledWith(swipingTransitioner);
        });
    });
});

describe('setting stage sources indexes', () => {
    let setStageSourcesIndexes;

    beforeEach(() => {
        fsLightboxMock.instantiateNewFsLightbox();
        fsLightboxMock.setAllSourceHoldersToDivs();
        fsLightbox = fsLightboxMock.getFsLightbox();
        fsLightbox.data.totalSlides = 3;
        fsLightbox.state.slide = 1;
        setStageSourcesIndexes = jest.fn();
        mockSwipingProps = {
            swipedDifference: 0
        }
    });

    describe('setting stage sources indexes for SwipingTransitioner', () => {
        beforeEach(() => {
            fsLightbox.injector.slideSwiping.getSwipingTransitioner = () => ({
                setStageSourcesIndexes: setStageSourcesIndexes,
                addTransitionToCurrentAndNext: () => {
                },
                addTransitionToCurrentAndPrevious: () => {
                }
            });
            createNewSlideSwipingUpActionsAndCallMethods();
        });

        it('should call setStageSourcesIndexes with stageSourcesIndexes', () => {
            // as there are 3 slides totally and slide is - indexes will be like previous - 2, current - 0, next -1
            expect(setStageSourcesIndexes).toBeCalledWith({
                previous: 2,
                current: 0,
                next: 1
            });
        });
    });

    describe('setting stage sources indexes for SwipingSlideChanger', () => {
        beforeEach(() => {
            fsLightbox.injector.slideSwiping.getSwipingSlideChangerForSwipingTransitioner = () => ({
                setStageSourcesIndexes: setStageSourcesIndexes,
                changeSlideToPrevious: () => {
                },
                changeSlideToNext: () => {
                }
            });
            createNewSlideSwipingUpActionsAndCallMethods();
        });

        it('should call setStageSourcesIndexes with stageSourcesIndexes', () => {
            // as there are 3 slides totally and slide is - indexes will be like previous - 2, current - 0, next -1
            expect(setStageSourcesIndexes).toBeCalledWith({
                previous: 2,
                current: 0,
                next: 1
            });
        });
    });
});


describe('transforming source holders', () => {
    describe('only current (there is only one slide)', () => {
        let zero;
        let addTransitionToCurrent;

        beforeEach(() => {
            zero = jest.fn();
            addTransitionToCurrent = jest.fn();
            fsLightbox.injector.slideSwiping.getSwipingTransitioner = () => ({
                setStageSourcesIndexes: () => {
                },
                addTransitionToCurrent: addTransitionToCurrent
            });
            fsLightbox.core.sourceHoldersTransformer.transformStageSourceHolderAtIndex = jest.fn(() => ({
                zero: zero
            }));
            fsLightbox.data.totalSlides = 1;
            createNewSlideSwipingUpActionsAndCallMethods();
        });

        it('should call addTransitionToCurrent', () => {
            expect(addTransitionToCurrent).toBeCalled();
        });

        it('should call transformStageSourceHolderAtIndex with 0 as param', () => {
            expect(fsLightbox.core.sourceHoldersTransformer.transformStageSourceHolderAtIndex.mock.calls[0][0])
                .toEqual(0);
        });

        it('should call zero transform zero', () => {
            expect(zero).toBeCalled();
        });
    });

    describe('backward', () => {
        describe('there are more than two slides', () => {
            let swipingSlideChanger;

            beforeEach(() => {

            });
        });
    });
});


describe('setting isAfterSwipeAnimationRunning from swiping props to true', () => {
    beforeEach(() => {
        mockSwipingProps = {
            isAfterSwipeAnimationRunning: false
        };
        createNewSlideSwipingUpActionsAndCallMethods();
    });

    it('should set isAfterSwipeAnimationRunning to true', () => {
        expect(mockSwipingProps.isAfterSwipeAnimationRunning).toBeTruthy();
    });
});

describe('setting isSwipingSlides state to false', () => {
    beforeEach(() => {
        fsLightbox.state.isSwipingSlides = true;
        createNewSlideSwipingUpActionsAndCallMethods();
    });

    it('should set isAfterSwipeAnimationRunning to true', () => {
        expect(fsLightbox.state.isSwipingSlides).toBeFalsy();
    });
});

describe('setting swiped difference from swiping props to 0', () => {
    beforeEach(() => {
        mockSwipingProps = {
            swipedDifference: 100
        };
        createNewSlideSwipingUpActionsAndCallMethods();
    });

    it('should set isAfterSwipeAnimationRunning to true', () => {
        expect(mockSwipingProps.swipedDifference).toBe(0);
    });
});

describe('setTimeout', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    describe('calling removeAllTransitionsFromStageSources at SwipingTransitioner', () => {
        let removeAllTransitionsFromStageSources;
        beforeEach(() => {
            removeAllTransitionsFromStageSources = jest.fn();
            fsLightbox.injector.slideSwiping.getSwipingTransitioner = () => ({
                setStageSourcesIndexes: () => {
                },
                addTransitionToCurrentAndPrevious: () => {
                },
                addTransitionToCurrentAndNext: () => {
                },
                removeAllTransitionsFromStageSources: removeAllTransitionsFromStageSources
            });
            createNewSlideSwipingUpActionsAndCallMethods();
            jest.runAllTimers();
        });

        it('should call removeAllTransitionsFromStageSources', () => {
            expect(removeAllTransitionsFromStageSources).toBeCalled();
        });
    });

    describe('setting isAfterSwipeAnimationRunning to false', () => {
        beforeEach(() => {
            mockSwipingProps = {
                isAfterSwipeAnimationRunning: true
            };
            createNewSlideSwipingUpActionsAndCallMethods();
            jest.runAllTimers();
        });

        it('set isAfterSwipeAnimationRunning to false', () => {
            expect(mockSwipingProps.isAfterSwipeAnimationRunning).toBeFalsy();
        });
    });
});
