import { SlideSwipingMoveActions } from "../../../../../src/core/slide-swiping/actions/move/SlideSwipingMoveActions";
import { CURSOR_GRABBING_CLASS_NAME } from "../../../../../src/constants/css-constants";

const fsLightbox = {
    data: {
        sourcesCount: 0
    },
    componentsStates: {
        hasMovedWhileSwiping: {
            get: () => {},
            set: () => {}
        }
    },
    core: {
        sourcesHoldersTransformer: {
            transformByValue: () => {}
        }
    },
    elements: {
        container: {
            current: document.createElement('div')
        }
    }
};
let mockEvent;
// initial set of swiping props will be edited in tests
let mockSwipingProps = {
    downClientX: null,
    swipedDifference: null,
};
let slideSwipingMoveActions;

const mockTransformStageSourceHoldersAndCreateNewSlideSwipingMoveActions = () => {
    fsLightbox.core.sourcesHoldersTransformer.transformByValue = jest.fn();
    slideSwipingMoveActions = new SlideSwipingMoveActions(fsLightbox, mockSwipingProps)
};

describe('setting hasMovedWhileSwipingState to true if not already set', () => {
    beforeAll(() => {
        mockTransformStageSourceHoldersAndCreateNewSlideSwipingMoveActions();
        fsLightbox.componentsStates.hasMovedWhileSwiping.set = jest.fn();
        slideSwipingMoveActions.setMoveEvent({});
    });

    describe('not setting (already set)', () => {
        beforeAll(() => {
            fsLightbox.componentsStates.hasMovedWhileSwiping.get = () => true;
            slideSwipingMoveActions.runActions();
        });

        it('should not call set', () => {
            expect(fsLightbox.componentsStates.hasMovedWhileSwiping.set).not.toBeCalled();
        });
    });

    describe('setting (not yet set)', () => {
        beforeAll(() => {
            fsLightbox.componentsStates.hasMovedWhileSwiping.get = () => false;
            slideSwipingMoveActions.runActions();
        });

        it('should call set with true', () => {
            expect(fsLightbox.componentsStates.hasMovedWhileSwiping.set).toBeCalledWith(true);
        });
    });
});

describe('event is mousedown', () => {
    beforeEach(() => {
        mockTransformStageSourceHoldersAndCreateNewSlideSwipingMoveActions();
        mockEvent = {
            clientX: 500,
        };
        mockSwipingProps.downClientX = 256;
        slideSwipingMoveActions.setMoveEvent(mockEvent);
        slideSwipingMoveActions.runActions();
    });

    it('should set swiped difference to clientX and downClientX difference', () => {
        expect(mockSwipingProps.swipedDifference).toEqual(mockEvent.clientX - mockSwipingProps.downClientX);
    });

    it('should call transformByValue with swiped difference at param', () => {
        expect(fsLightbox.core.sourcesHoldersTransformer.transformByValue)
            .toBeCalledWith(mockEvent.clientX - mockSwipingProps.downClientX);
    });
});

describe('event is touchstart', () => {
    beforeEach(() => {
        mockTransformStageSourceHoldersAndCreateNewSlideSwipingMoveActions();
        mockEvent = {
            touches: [{
                clientX: 240
            }],
        };
        mockSwipingProps.downClientX = 768;
        slideSwipingMoveActions.setMoveEvent(mockEvent);
        slideSwipingMoveActions.runActions();
    });

    it('should set swiped difference to clientX and downClientX difference', () => {
        expect(mockSwipingProps.swipedDifference).toEqual(mockEvent.touches[0].clientX - mockSwipingProps.downClientX);
    });

    it('should call transformByValue with swiped difference at param', () => {
        expect(fsLightbox.core.sourcesHoldersTransformer.transformByValue)
            .toBeCalledWith(mockEvent.touches[0].clientX - mockSwipingProps.downClientX);
    });
});

slideSwipingMoveActions = new SlideSwipingMoveActions(fsLightbox, mockSwipingProps);
slideSwipingMoveActions.setMoveEvent({
    clientX: 0
});

describe(`adding cursor grabbing class to container if there are at least 2 slides 
        and class is not yet added`, () => {
    let containerClassList = fsLightbox.elements.container.current.classList;
    beforeEach(() => {
        slideSwipingMoveActions.setMoveEvent({
            clientX: 0
        });
        containerClassList.add = jest.fn();
    });

    describe('not adding class', () => {
        describe('due to there less than two slides even if class is not yed added', () => {
            beforeEach(() => {
                containerClassList.contains = () => false;
                fsLightbox.data.sourcesCount = 1;
                slideSwipingMoveActions.runActions();
            });

            it('should not call add class', () => {
                expect(containerClassList.add).not.toBeCalled();
            });
        });

        describe('dut to class is already added even if there are at least two slides', () => {
            beforeEach(() => {
                containerClassList.contains = () => true;
                fsLightbox.data.sourcesCount = 2;
                slideSwipingMoveActions.runActions();
            });

            it('should not call add class ', () => {
                expect(containerClassList.add).not.toBeCalled();
            });
        });
    });

    describe('adding class', () => {
        describe('there are at least two slides and class is not already added', () => {
            beforeEach(() => {
                containerClassList.contains = () => false;
                fsLightbox.data.sourcesCount = 2;
                slideSwipingMoveActions.runActions();
            });

            it('should call add class with cursor grabbing class', () => {
                expect(containerClassList.add).toBeCalledWith(CURSOR_GRABBING_CLASS_NAME);
            });
        });
    });
});
