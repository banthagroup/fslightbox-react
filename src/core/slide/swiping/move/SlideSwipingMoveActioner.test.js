import { SlideSwipingMoveActioner } from "./SlideSwipingMoveActioner";
import { CURSOR_GRABBING_CLASS_NAME } from "../../../../constants/classes-names";
import * as getClientXFromEventObject from "../../../../helpers/events/getScreenXFromEvent";

const fsLightbox = {
    componentsServices: { showSlideSwipingHovererIfNotYet: jest.fn() },
    collections: {
        sourceMainWrapperTransformers: [
            {
                byValue: () => ({
                    negative: () => {},
                    zero: () => {},
                    positive: () => {}
                })
            }
        ]
    },
    elements: { container: { current: { classList: { add: jest.fn() } } } },
    slideSwipingProps: { downScreenX: null, swipedX: null, },
    stageIndexes: {
        previous: 0,
        current: 0,
        next: 0
    }
};
let slideSwipingMoveActions;

const setUpAndCallRunActionsForEventWithEmptyEvent = () => {
    slideSwipingMoveActions = new SlideSwipingMoveActioner(fsLightbox);
    slideSwipingMoveActions.runActionsForEvent({});
};

test('simple actions', () => {
    const e = {};

    fsLightbox.slideSwipingProps.downScreenX = 500;
    getClientXFromEventObject.getScreenXFromEvent = (event) => {
        if (Object.is(event, e)) {
            return 450;
        }
    };
    slideSwipingMoveActions = new SlideSwipingMoveActioner(fsLightbox);
    slideSwipingMoveActions.runActionsForEvent(e);

    expect(fsLightbox.componentsServices.showSlideSwipingHovererIfNotYet).toBeCalled();
    expect(fsLightbox.elements.container.current.classList.add).toBeCalledWith(CURSOR_GRABBING_CLASS_NAME);
    expect(fsLightbox.slideSwipingProps.swipedX).toBe(-50);
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
        fsLightbox.collections.sourceMainWrapperTransformers[3] = {
            byValue: (value) => {
                if (value === expectedByValue) {
                    return {
                        negative: negative
                    }
                }
            }
        };
        fsLightbox.collections.sourceMainWrapperTransformers[5] = {
            byValue: (value) => {
                if (value === expectedByValue) {
                    return {
                        zero: zero
                    }
                }
            }
        };
        fsLightbox.collections.sourceMainWrapperTransformers[9] = {
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
            getClientXFromEventObject.getScreenXFromEvent = () => 750;
            fsLightbox.slideSwipingProps.downScreenX = 350;
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
            getClientXFromEventObject.getScreenXFromEvent = () => 100;
            fsLightbox.slideSwipingProps.downScreenX = 400;
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
            getClientXFromEventObject.getScreenXFromEvent = () => 500;
            fsLightbox.slideSwipingProps.downScreenX = 400;
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
            getClientXFromEventObject.getScreenXFromEvent = () => 500;
            fsLightbox.slideSwipingProps.downScreenX = 250;
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
            getClientXFromEventObject.getScreenXFromEvent = () => 400;
            fsLightbox.slideSwipingProps.downScreenX = 1000;
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
