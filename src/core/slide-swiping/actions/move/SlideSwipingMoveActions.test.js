import { SlideSwipingMoveActions } from "./SlideSwipingMoveActions";
import { CURSOR_GRABBING_CLASS_NAME } from "../../../../constants/classes-names";
import * as getClientXFromEventObject from "../../../../helpers/events/getClientXFromEvent";
import { LIGHTBOX_CONTAINER } from "../../../../constants/elements";

const fsLightbox = {
    componentsStates: {
        hasMovedWhileSwiping: {
            get: () => {},
            set: () => {}
        }
    },
    collections: {
        sourcesHoldersTransformers: [
            {
                byValue: () => ({
                    negative: () => {},
                    zero: () => {},
                    positive: () => {}
                })
            }
        ]
    },
    core: {
        classListManager: {
            manageElement: () => ({
                add: () => {}
            })
        }
    },
    data: {
        sourcesCount: 0
    },
    stageIndexes: {
        previous: 0,
        current: 0,
        next: 0
    }
};
// initial set of swiping props will be edited in tests
const swipingProps = {
    downClientX: null,
    swipedDifference: null,
};
let slideSwipingMoveActions;

const setUpAndCallRunActionsForEventWithEmptyEvent = () => {
    slideSwipingMoveActions = new SlideSwipingMoveActions(fsLightbox, swipingProps);
    slideSwipingMoveActions.runActionsForEvent({});
};

test('setting hasMovedWhileSwipingState to true if not already set', () => {
    fsLightbox.componentsStates.hasMovedWhileSwiping.set = jest.fn();

    fsLightbox.componentsStates.hasMovedWhileSwiping.get = () => true;
    setUpAndCallRunActionsForEventWithEmptyEvent();
    expect(fsLightbox.componentsStates.hasMovedWhileSwiping.set).not.toBeCalled();

    fsLightbox.componentsStates.hasMovedWhileSwiping.get = () => false;
    setUpAndCallRunActionsForEventWithEmptyEvent();
    expect(fsLightbox.componentsStates.hasMovedWhileSwiping.set).toBeCalledWith(true);
});

test(`adding cursor grabbing class list to container`, () => {
    const addClass = jest.fn();
    fsLightbox.core.classListManager.manageElement = (elementName) => {
        if (elementName === LIGHTBOX_CONTAINER) {
            return {
                add: addClass
            }
        }
    };
    setUpAndCallRunActionsForEventWithEmptyEvent();

    expect(addClass).toBeCalledWith(CURSOR_GRABBING_CLASS_NAME);
});

test('calculating swiped difference', () => {
    const event = { key: 'test-event' };

    swipingProps.downClientX = 500;
    getClientXFromEventObject.getClientXFromEvent = (e) => {
        if (e === event) {
            return 450;
        }
    };
    slideSwipingMoveActions = new SlideSwipingMoveActions(fsLightbox, swipingProps);
    slideSwipingMoveActions.runActionsForEvent(event);

    expect(swipingProps.swipedDifference).toBe(-50);
});

describe('transforming stage sources holders by swiped difference value', () => {
    let negative;
    let zero;
    let positive;
    let expectedByValue;

    const setUpTransformMockFunctions = () => {
        negative = jest.fn();
        zero = jest.fn();
        positive = jest.fn();
    };

    beforeAll(() => {
        fsLightbox.collections.sourcesHoldersTransformers[3] = {
            byValue: (value) => {
                if (value === expectedByValue) {
                    return {
                        negative: negative
                    }
                }
            }
        };
        fsLightbox.collections.sourcesHoldersTransformers[5] = {
            byValue: (value) => {
                if (value === expectedByValue) {
                    return {
                        zero: zero
                    }
                }
            }
        };
        fsLightbox.collections.sourcesHoldersTransformers[9] = {
            byValue: (value) => {
                if (value === expectedByValue) {
                    return {
                        positive: positive
                    }
                }
            }
        };
    });

    describe('new slide current source holder', () => {
        beforeAll(() => {
            getClientXFromEventObject.getClientXFromEvent = () => 750;
            swipingProps.downClientX = 350;
            expectedByValue = 400;

            fsLightbox.stageIndexes = {
                current: 5
            };
            setUpTransformMockFunctions();
            setUpAndCallRunActionsForEventWithEmptyEvent();
        });

        it('should call zero', () => {
            expect(zero).toBeCalled();
        });
    });

    describe('new slide previous source holder', () => {
        test('there is no previous stage index - negative should not be called', () => {
            fsLightbox.stageIndexes = {
                current: 5
            };
            setUpTransformMockFunctions();
            setUpAndCallRunActionsForEventWithEmptyEvent();

            expect(negative).not.toBeCalled();
        });

        test('client is swiping forward - previous source holder should not be transformed', () => {
            getClientXFromEventObject.getClientXFromEvent = () => 100;
            swipingProps.downClientX = 400;
            expectedByValue = -300;

            fsLightbox.stageIndexes = {
                previous: 3,
                current: 5
            };

            setUpTransformMockFunctions();
            setUpAndCallRunActionsForEventWithEmptyEvent();

            expect(negative).not.toBeCalled();
        });

        test('client is swiping backward - previous source holder should be transfored', () => {
            getClientXFromEventObject.getClientXFromEvent = () => 500;
            swipingProps.downClientX = 400;
            expectedByValue = 100;

            fsLightbox.stageIndexes = {
                previous: 3,
                current: 5
            };

            setUpTransformMockFunctions();
            setUpAndCallRunActionsForEventWithEmptyEvent();

            expect(negative).toBeCalled();
        });
    });


    describe('new slide next source holder', () => {
        test('there is no next stage index - positive should not be called', () => {
            fsLightbox.stageIndexes = {
                current: 5
            };
            setUpTransformMockFunctions();
            setUpAndCallRunActionsForEventWithEmptyEvent();

            expect(positive).not.toBeCalled();
        });

        test('client is swiping backward - next source holder should not be transformed', () => {
            getClientXFromEventObject.getClientXFromEvent = () => 500;
            swipingProps.downClientX = 250;
            expectedByValue = 250;

            fsLightbox.stageIndexes = {
                current: 5,
                next: 9
            };

            setUpTransformMockFunctions();
            setUpAndCallRunActionsForEventWithEmptyEvent();

            expect(positive).not.toBeCalled();
        });

        test('client is swiping forward - next source holder should be transformed', () => {
            getClientXFromEventObject.getClientXFromEvent = () => 400;
            swipingProps.downClientX = 1000;
            expectedByValue = -600;

            fsLightbox.stageIndexes = {
                current: 5,
                next: 9
            };

            setUpTransformMockFunctions();
            setUpAndCallRunActionsForEventWithEmptyEvent();

            expect(positive).toBeCalled();
        });
    })
});
