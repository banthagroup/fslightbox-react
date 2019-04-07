import { FsLightboxMock } from "../../../../__mocks__/components/fsLightboxMock";
import { SlideSwipingDown } from "../../../../../src/core/SlideSwiping/Events/SlideSwipingDown";
import { switchCase } from "@babel/types";

const fsLightboxMock = new FsLightboxMock();
const fsLightbox = fsLightboxMock.getFsLightbox();

describe('calling or not calling preventDefault', () => {
    let mockEvent;
    /** @var { SlideSwipingDown } slideSwipingDown */
    const slideSwipingDown = fsLightbox.core.slideSwiping.down;

    beforeEach(() => {
        mockEvent = {
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
            mockEvent.target.tagName = undefined;
            slideSwipingDown.listener(mockEvent);
            expect(mockEvent.preventDefault).not.toBeCalled();
        });

        it('should not call preventDefault due to tag name equals VIDEO', () => {
            mockEvent.target.tagName = 'VIDEO';
            slideSwipingDown.listener(mockEvent);
            expect(mockEvent.preventDefault).not.toBeCalled();
        });

        // we are using passive events so we cannot preventDefault if event is touch event
        it(`should not call preventDefault due to event is touchstart,
             even if tag name is set and it's not VIDEO`, () => {
            // if we set touch event we need to set clientX because it is required in listener
            mockEvent.touches = [{ clientX: 0 }];
            mockEvent.target.tagName = 'IMAGE';
            slideSwipingDown.listener(mockEvent);
            expect(mockEvent.preventDefault).not.toBeCalled();
        });

        it(`should call preventDefault due to tagName equals VIDEO,
        even if event is not touchstart`, () => {
            mockEvent.target.tagName = 'VIDEO';
            slideSwipingDown.listener(mockEvent);
            expect(mockEvent.preventDefault).not.toBeCalled();
        });
    });

    describe('calling prevent default', () => {
        it('should call preventDefault because tag name isnt video and user is not on mobile device', () => {
            mockEvent.target.tagName = 'IMAGE';
            slideSwipingDown.listener(mockEvent);
            expect(mockEvent.preventDefault).toBeCalled();
        });
    });
});


describe('setting isSourceDownEventTarget if source is target', () => {
    /** @var { SlideSwipingDown } slideSwipingDown */
    let slideSwipingDown;
    let mockSwipingProps;
    let mockEvent;

    beforeEach(() => {
        mockSwipingProps = {
            downClientX: 0,
            isAfterSwipeAnimationRunning: false,
            swipedDifference: 0,
            isSourceDownEventTarget: false,
        };
        slideSwipingDown = new SlideSwipingDown(fsLightbox, mockSwipingProps);
        mockEvent = {
            target: {
                classList: {
                    contains: () => {
                    }
                }
            }
        }
    });

    describe('not setting isSourceDownEventTarget', () => {
        beforeEach(() => {
            mockEvent.target.classList.contains = () => false;
            slideSwipingDown.listener(mockEvent);
        });

        it('should not set isSourceDownEventTarget', () => {
            expect(mockSwipingProps.isSourceDownEventTarget).toBeFalsy();
        });
    });

    describe('setting isSourceDownEventTarget', () => {
        beforeEach(() => {
            mockEvent.target.classList.contains = () => true;
            slideSwipingDown.listener(mockEvent);
        });

        it('should set isSourceDownEventTarget to true', () => {
            expect(mockSwipingProps.isSourceDownEventTarget).toBeTruthy();
        });
    });

    describe('setting isSourceDownEventTarget from true to false', () => {
        beforeEach(() => {
            mockSwipingProps.isSourceDownEventTarget = true;
            mockEvent.target.classList.contains = () => false;
            slideSwipingDown.listener(mockEvent);
        });

        it('should set isSourceDownEventTarget to true', () => {
            expect(mockSwipingProps.isSourceDownEventTarget).toBeFalsy();
        });
    });
});



describe('setting isSwipingSlides state to true', () => {
    // by default isSwipingSlides state should be false
    fsLightbox.setters.setState({
        isSwipingSlides: false
    });

    it('should set isSwipingSlides state to true', () => {
        // because we are calling listener we need to mock event of it will throw error
        const mockEvent = {
            target: {
                classList: {
                    contains: () => {
                    }
                }
            }
        };
        fsLightbox.core.slideSwiping.down.listener(mockEvent);
        expect(fsLightbox.state.isSwipingSlides).toBeTruthy();
    });
});


/** @var { SlideSwipingDown } slideSwipingDown */
let slideSwipingDown;
let mockSwipingProps;

describe('setting down client x', () => {
    beforeEach(() => {
        mockSwipingProps = {
            downClientX: 0,
            isAfterSwipeAnimationRunning: false,
            swipedDifference: 0,
        };
        slideSwipingDown = new SlideSwipingDown(fsLightbox, mockSwipingProps);
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
            expect(mockSwipingProps.downClientX).toEqual(1000);
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
            expect(mockSwipingProps.downClientX).toEqual(1500);
        });
    });
});

describe('resetting swipedDifference', () => {
    beforeEach(() => {
        mockSwipingProps = {
            downClientX: 0,
            isAfterSwipeAnimationRunning: false,
            swipedDifference: 1000,
        };
        slideSwipingDown = new SlideSwipingDown(fsLightbox, mockSwipingProps);
    });

    it('should set swipedDifference swiping prop to 0', () => {
        slideSwipingDown.listener(
            {
                target: {
                    classList: {
                        contains: () => {
                        }
                    }
                },
            }
        );
        expect(mockSwipingProps.swipedDifference).toEqual(0);
    });
});
