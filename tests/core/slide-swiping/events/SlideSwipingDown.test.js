import { SlideSwipingDown } from "../../../../src/core/slide-swiping/events/SlideSwipingDown";

let isSwipingSlides;
const fsLightbox = {
    componentsStates: {
        hasMovedWhileSwiping: {
            get: () => isSwipingSlides,
            set: (boolean) => isSwipingSlides = boolean
        }
    }
};

/** @var { SlideSwipingDown } slideSwipingDown */
let slideSwipingDown;
let event = {
    target: {
        classList: {
            contains: () => {}
        }
    }
};
let swipingProps = {
    isSourceDownEventTarget: false,
};

const recreateSlideSwipingDownAndCallListener = () => {
    slideSwipingDown = new SlideSwipingDown(fsLightbox, swipingProps);
    slideSwipingDown.listener(event);
};

describe('calling or not calling preventDefault', () => {
    beforeEach(() => {
        slideSwipingDown = new SlideSwipingDown(fsLightbox, swipingProps);
        event = {
            target: {
                classList: {
                    contains: () => {
                    }
                }
            },
            preventDefault: jest.fn(),
        };
    });

    describe('not calling preventDefault', () => {
        it('should not call prevent default due to tag name not set', () => {
            event.target.tagName = undefined;
            slideSwipingDown.listener(event);
            expect(event.preventDefault).not.toBeCalled();
        });

        it('should not call preventDefault due to tag name equals VIDEO', () => {
            event.target.tagName = 'VIDEO';
            slideSwipingDown.listener(event);
            expect(event.preventDefault).not.toBeCalled();
        });

        // we are using passive events so we cannot preventDefault if event is touch event
        it(`should not call preventDefault due to event is touchstart,
             even if tag name is set and it's not VIDEO`, () => {
            // if we set touch event we need to set clientX because it is required in listener
            event.touches = [{ clientX: 0 }];
            event.target.tagName = 'IMAGE';
            slideSwipingDown.listener(event);
            expect(event.preventDefault).not.toBeCalled();
        });

        it(`should call preventDefault due to tagName equals VIDEO,
        even if event is not touchstart`, () => {
            event.target.tagName = 'VIDEO';
            slideSwipingDown.listener(event);
            expect(event.preventDefault).not.toBeCalled();
        });
    });

    describe('calling prevent default', () => {
        it('should call preventDefault because tag name isnt video and user is not on mobile device', () => {
            event.target.tagName = 'IMAGE';
            slideSwipingDown.listener(event);
            expect(event.preventDefault).toBeCalled();
        });
    });
});


describe('setting isSourceDownEventTarget if sources is target', () => {
    beforeAll(() => {
        swipingProps = {
            downClientX: 0,
            isAfterSwipeAnimationRunning: false,
            swipedDifference: 0,
            isSourceDownEventTarget: false,
        };
        slideSwipingDown = new SlideSwipingDown(fsLightbox, swipingProps);
    });

    describe('not setting isSourceDownEventTarget', () => {
        beforeAll(() => {
            event.target.classList.contains = () => false;
            slideSwipingDown.listener(event);
        });

        it('should not set isSourceDownEventTarget', () => {
            expect(swipingProps.isSourceDownEventTarget).toBeFalsy();
        });
    });

    describe('setting isSourceDownEventTarget', () => {
        beforeAll(() => {
            event.target.classList.contains = () => true;
            slideSwipingDown.listener(event);
        });

        it('should set isSourceDownEventTarget to true', () => {
            expect(swipingProps.isSourceDownEventTarget).toBeTruthy();
        });
    });

    describe('setting isSourceDownEventTarget from true to false', () => {
        beforeAll(() => {
            swipingProps.isSourceDownEventTarget = true;
            event.target.classList.contains = () => false;
            slideSwipingDown.listener(event);
        });

        it('should set isSourceDownEventTarget to true', () => {
            expect(swipingProps.isSourceDownEventTarget).toBeFalsy();
        });
    });
});



describe('setting hasMovedWhileSwiping state to true', () => {
    beforeAll(() => {
        recreateSlideSwipingDownAndCallListener();
    });

    it('should set hasMovedWhileSwiping state to true', () => {
        expect(isSwipingSlides).toBeTruthy();
    });
});


describe('setting down client x', () => {
    beforeEach(() => {
        swipingProps = {
            downClientX: 0,
            isAfterSwipeAnimationRunning: false,
            swipedDifference: 0,
        };
        slideSwipingDown = new SlideSwipingDown(fsLightbox, swipingProps);
    });

    describe('event is mousedown', () => {
        // no touches property in event so it is mouse down
        const mouseDownEvent = {
            target: {
                classList: {
                    contains: () => {
                    }
                }
            },
            clientX: 1000
        };
        it('should set clientX to 1000 due to its the value in event', () => {
            slideSwipingDown.listener(mouseDownEvent);
            expect(swipingProps.downClientX).toEqual(1000);
        });
    });

    describe('event is touchstart', () => {
        // there is touch property with clientX so it is touchstart event
        const touchStartEvent = {
            target: {
                classList: {
                    contains: () => {
                    }
                }
            },
            touches: [{ clientX: 1500 }]
        };
        it('should set clientX to 1500 due to its the value in event', () => {
            slideSwipingDown.listener(touchStartEvent);
            expect(swipingProps.downClientX).toEqual(1500);
        });
    });
});

describe('resetting swipedDifference', () => {
    beforeEach(() => {
        swipingProps = {
            downClientX: 0,
            isAfterSwipeAnimationRunning: false,
            swipedDifference: 1000,
        };
        recreateSlideSwipingDownAndCallListener();
    });

    it('should set swipedDifference swiping prop to 0', () => {
        expect(swipingProps.swipedDifference).toEqual(0);
    });
});
