import { FADE_OUT_CLASS_NAME } from "../../../constants/classes-names";

export function setUpSlideSwipingDown(
    {
        stageIndexes,
        data,
        elements: {
            container,
            sources
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

    const setDownClientX = () => {
        (event.touches) ?
            swipingProps.downClientX = event.touches[0].clientX :
            swipingProps.downClientX = event.clientX;
    };

    const resetSwipedDifference = () => {
        swipingProps.swipedDifference = 0;
    };
}


