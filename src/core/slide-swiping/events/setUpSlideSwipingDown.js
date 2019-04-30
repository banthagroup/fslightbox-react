import { CURSOR_GRABBING_CLASS_NAME } from "../../../constants/cssConstants";

export function setUpSlideSwipingDown(
    {
        data,
        elements: {
            container
        },
        core: {
            slideSwiping: {
                down: self
            }
        }
    }, swipingProps) {
    /** @var { MouseEvent | TouchEvent } event */
    let event;

    self.listener = (e) => {
        event = e;
        preventDefaultIfNeeded();
        setIsSourceDownEventTargetIfTargetIsSource();
        setIsSwipingSlidesToTrue();
        ifThereIsMoreThanOneSlideAddCursorGrabbingClassToContainer();
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
    };

    const ifThereIsMoreThanOneSlideAddCursorGrabbingClassToContainer = () => {
        if (data.totalSlides > 1) {
            container.current.classList.add(CURSOR_GRABBING_CLASS_NAME);
        }
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


