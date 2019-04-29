import { CURSOR_GRABBING_CLASS_NAME } from "../../../constants/cssConstants";

/**
 * @constructor
 * @param { FsLightbox.data | { isSwipingSlides: boolean } } isSwipingSlidesState
 * @param { FsLightbox.componentsStates.hasMovedWhileSwiping | { set: function(boolean) } } isSwipingSlidesState
 * @param { {downClientX, isAfterSwipeAnimationRunning, swipedDifference, isSourceDownEventTarget} } swipingProps
 */
export function SlideSwipingDown(
    {
        data,
        componentsStates: {
            isSwipingSlides: isSwipingSlidesState
        },
        elements: {
            container
        }
    }, swipingProps) {
    /** @var { MouseEvent | TouchEvent } event */
    let event;

    this.listener = (e) => {
        event = e;
        preventDefaultIfNeeded();
        setIsSourceDownEventTargetIfTargetIsSource();
        setIsSwipingSlidesToTrue();
        setDownClientX();
        resetSwipedDifference();
    };

    const preventDefaultIfNeeded = () => {
        if (!event.target.tagName)
            return;
        if (event.target.tagName === 'VIDEO' || event.touches)
            return;
        event.preventDefault();
    };

    const setIsSourceDownEventTargetIfTargetIsSource = () => {
        (event.target.classList.contains('fslightbox-source')) ?
            swipingProps.isSourceDownEventTarget = true :
            swipingProps.isSourceDownEventTarget = false;
    };

    const setIsSwipingSlidesToTrue = () => {
        data.isSwipingSlides = true;
        container.current.classList.add(CURSOR_GRABBING_CLASS_NAME);
    };

    const setDownClientX = () => {
        (event.touches) ?
            swipingProps.downClientX = event.touches[0].clientX :
            swipingProps.downClientX = event.clientX;
    };

    const resetSwipedDifference = () => {
        swipingProps.swipedDifference = 0;
    }
}


