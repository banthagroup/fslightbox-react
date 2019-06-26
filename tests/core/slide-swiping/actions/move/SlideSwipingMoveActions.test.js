import { SlideSwipingMoveActions } from "../../../../../src/core/slide-swiping/actions/move/SlideSwipingMoveActions";
import { CURSOR_GRABBING_CLASS_NAME } from "../../../../../src/constants/classes-names";
import * as getClientXFromEventObject from "../../../../../src/helpers/events/getClientXFromEvent";
import { LIGHTBOX_CONTAINER } from "../../../../../src/constants/elements";

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

describe('setting hasMovedWhileSwipingState to true if not already set', () => {
    beforeAll(() => {
        fsLightbox.componentsStates.hasMovedWhileSwiping.set = jest.fn();
    });

    describe('not setting (already set)', () => {
        beforeAll(() => {
            fsLightbox.componentsStates.hasMovedWhileSwiping.get = () => true;
            setUpAndCallRunActionsForEventWithEmptyEvent();
        });

        it('should not call set', () => {
            expect(fsLightbox.componentsStates.hasMovedWhileSwiping.set).not.toBeCalled();
        });
    });

    describe('setting (not yet set)', () => {
        beforeAll(() => {
            fsLightbox.componentsStates.hasMovedWhileSwiping.get = () => false;
            setUpAndCallRunActionsForEventWithEmptyEvent();
        });

        it('should call set with true', () => {
            expect(fsLightbox.componentsStates.hasMovedWhileSwiping.set).toBeCalledWith(true);
        });
    });
});

describe(`adding cursor grabbing class list to container`, () => {
    let addClass;

    beforeEach(() => {
        addClass = jest.fn();
        fsLightbox.core.classListManager.manageElement = (elementName) => {
            if (elementName === LIGHTBOX_CONTAINER) {
                return {
                    add: addClass
                }
            }
        };
        setUpAndCallRunActionsForEventWithEmptyEvent();
    });

    it('should call ifElementHasClassRemoveIt with container and cursor grabbing class', () => {
        expect(addClass).toBeCalledWith(CURSOR_GRABBING_CLASS_NAME);
    });
});

describe('calculating swiped difference', () => {
    const event = { key: 'test-event' };

    beforeAll(() => {
        swipingProps.downClientX = 500;
        getClientXFromEventObject.getClientXFromEvent = (e) => {
            if (e === event) {
                return 450;
            }
        };
        slideSwipingMoveActions = new SlideSwipingMoveActions(fsLightbox, swipingProps);
        slideSwipingMoveActions.runActionsForEvent(event);
    });

    it('should set swipedDifference to move event clientX - down event clientX', () => {
        expect(swipingProps.swipedDifference).toBe(-50);
    });
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
        describe('there is no previous stage index - negative should not be called', () => {
            beforeAll(() => {
                fsLightbox.stageIndexes = {
                    current: 5
                };
                setUpTransformMockFunctions();
                setUpAndCallRunActionsForEventWithEmptyEvent();
            });

            it('should not call negative', () => {
                expect(negative).not.toBeCalled();
            });
        });

        describe('client is swiping forward - previous source holder should not be transformed', () => {
            beforeAll(() => {
                getClientXFromEventObject.getClientXFromEvent = () => 100;
                swipingProps.downClientX = 400;
                expectedByValue = -300;

                fsLightbox.stageIndexes = {
                    previous: 3,
                    current: 5
                };

                setUpTransformMockFunctions();
                setUpAndCallRunActionsForEventWithEmptyEvent();
            });

            it('should not call negative', () => {
                expect(negative).not.toBeCalled();
            });
        });

        describe('client is swiping backward - previous source holder should be transfored', () => {
            beforeAll(() => {
                getClientXFromEventObject.getClientXFromEvent = () => 500;
                swipingProps.downClientX = 400;
                expectedByValue = 100;

                fsLightbox.stageIndexes = {
                    previous: 3,
                    current: 5
                };

                setUpTransformMockFunctions();
                setUpAndCallRunActionsForEventWithEmptyEvent();
            });

            it('should call negative', () => {
                expect(negative).toBeCalled();
            });
        });
    });


    describe('new slide next source holder', () => {
        describe('there is no next stage index - positive should not be called', () => {
            beforeAll(() => {
                fsLightbox.stageIndexes = {
                    current: 5
                };
                setUpTransformMockFunctions();
                setUpAndCallRunActionsForEventWithEmptyEvent();
            });

            it('should not call positive', () => {
                expect(positive).not.toBeCalled();
            });
        });

        describe('client is swiping backward - next source holder should not be transformed', () => {
            beforeAll(() => {
                getClientXFromEventObject.getClientXFromEvent = () => 500;
                swipingProps.downClientX = 250;
                expectedByValue = 250;

                fsLightbox.stageIndexes = {
                    current: 5,
                    next: 9
                };

                setUpTransformMockFunctions();
                setUpAndCallRunActionsForEventWithEmptyEvent();
            });

            it('should not call positive', () => {
                expect(positive).not.toBeCalled();
            });
        });

        describe('client is swiping forward - next source holder should be transformed', () => {
            beforeAll(() => {
                getClientXFromEventObject.getClientXFromEvent = () => 400;
                swipingProps.downClientX = 1000;
                expectedByValue = -600;

                fsLightbox.stageIndexes = {
                    current: 5,
                    next: 9
                };

                setUpTransformMockFunctions();
                setUpAndCallRunActionsForEventWithEmptyEvent();
            });

            it('should call positive', () => {
                expect(positive).toBeCalled();
            });
        });
    })
});
