import { setUpSlideSwipingDown } from "./setUpSlideSwipingDown";
import { SOURCES_OUTERS } from "../../../../constants/elements";
import { TRANSFORM_TRANSITION_CLASS_NAME } from "../../../../constants/classes-names";
import * as getClientXFromEventObject from "../../../../helpers/events/getClientXFromEvent";

const fsLightbox = {
    core: {
        classFacade: { removeFromEachElementClassIfContains: jest.fn() },
        slideSwipingDown: {},
    },
    slideSwipingProps: {}
};
const slideSwipingDown = fsLightbox.core.slideSwipingDown;
const e = {
    target: { classList: { contains: () => {} } },
    touches: [],
    preventDefault: jest.fn()
};

getClientXFromEventObject.getClientXFromEvent = jest.fn(() => 'client-x');

setUpSlideSwipingDown(fsLightbox);

test('listener', () => {
    e.target.tagName = 'VIDEO';
    e.target.classList.contains = () => false;
    slideSwipingDown.listener(e);
    expect(fsLightbox.slideSwipingProps.isSwiping).toBe(true);
    expect(fsLightbox.slideSwipingProps.swipedX).toBe(0);
    expect(getClientXFromEventObject.getClientXFromEvent).toBeCalledWith(e);
    expect(fsLightbox.slideSwipingProps.downClientX).toBe('client-x');
    expect(e.preventDefault).not.toBeCalled();
    expect(fsLightbox.slideSwipingProps.isSourceDownEventTarget).toBe(false);
    expect(fsLightbox.core.classFacade.removeFromEachElementClassIfContains).toBeCalledWith(
        SOURCES_OUTERS, TRANSFORM_TRANSITION_CLASS_NAME
    );

    e.touches = [{ clientX: 0 }];
    e.target.tagName = 'IMAGE';
    e.target.classList.contains = () => true;
    slideSwipingDown.listener(e);
    expect(e.preventDefault).not.toBeCalled();
    expect(fsLightbox.slideSwipingProps.isSourceDownEventTarget).toBe(true);

    e.target.tagName = 'VIDEO';
    slideSwipingDown.listener(e);
    expect(e.preventDefault).not.toBeCalled();

    e.target.tagName = 'IMAGE';
    e.touches = undefined;
    slideSwipingDown.listener(e);
    expect(e.preventDefault).toBeCalled();
});
