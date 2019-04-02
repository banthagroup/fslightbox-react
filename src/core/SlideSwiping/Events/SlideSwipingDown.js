/**
 * @class
 * @param { FsLightbox.data.deviceType } deviceType
 * @param { FsLightbox.setters.setState | Function } setState
 * @param { {downClientX, isAfterSwipeAnimationRunning, swipedDifference} } swipingProps
 */
export function SlideSwipingDown({ setters: { setState } }, swipingProps) {
    /** @var { MouseEvent | TouchEvent } event */
    let event;

    this.listener = (e) => {
        event = e;
        preventDefaultIfNeeded();
        setIsSwipingSlideStateToTrue();
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

    const setIsSwipingSlideStateToTrue = () => {
        setState({
            isSwipingSlides: true
        });
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


