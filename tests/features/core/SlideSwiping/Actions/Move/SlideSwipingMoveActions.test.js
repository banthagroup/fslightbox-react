import { FsLightboxMock } from "../../../../../__mocks__/components/fsLightboxMock";
import { SlideSwipingMoveActions } from "../../../../../../src/core/SlideSwiping/Actions/Move/SlideSwipingMoveActions";

const fsLightboxMock = new FsLightboxMock();
const fsLightbox = fsLightboxMock.getFsLightbox();
fsLightboxMock.setAllSourceHoldersToDivs();
let mockEvent;
// initial set of swiping props will be edited in tests
let mockSwipingProps = {
    downClientX: null,
    swipedDifference: null,
};
let transformStageSourceHoldersByValue;
let slideSwipingMoveActions;

beforeEach(() => {
    // because we are using destructuring in SlideSwipingMoveActions we need to
    // instantiate it every test with new jest.fn()
    transformStageSourceHoldersByValue = jest.fn();
    fsLightbox.core.sourceHoldersTransformer.transformStageSourceHoldersByValue = transformStageSourceHoldersByValue;
    slideSwipingMoveActions = new SlideSwipingMoveActions(fsLightbox, mockSwipingProps)
});

describe('event is mousedown', () => {
    beforeEach(() => {
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

    it('should call transformStageSourceHoldersByValue with swiped difference at param', () => {
        expect(transformStageSourceHoldersByValue)
            .toBeCalledWith(mockEvent.clientX - mockSwipingProps.downClientX);
    });
});

describe('event is touchstart', () => {
    beforeEach(() => {
        mockEvent = {
            touches:[{
                clientX: 240
            }],
        };
        mockSwipingProps.downClientX =  768;
        slideSwipingMoveActions.setMoveEvent(mockEvent);
        slideSwipingMoveActions.runActions();
    });

    it('should set swiped difference to clientX and downClientX difference', () => {
        expect(mockSwipingProps.swipedDifference).toEqual(mockEvent.touches[0].clientX - mockSwipingProps.downClientX);
    });

    it('should call transformStageSourceHoldersByValue with swiped difference at param', () => {
        expect(transformStageSourceHoldersByValue)
            .toBeCalledWith(mockEvent.touches[0].clientX - mockSwipingProps.downClientX);
    });
});