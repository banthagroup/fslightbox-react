
/**
 * @class SlideSwipingDown
 */
export function SlideSwipingDown
(
    fsLightbox
) {
    /** @var {Event} event */
    let event;

    this.listener = (e) => {
        event = e;
        preventDefaultIfNeeded();
        fsLightbox.setters.setState({
            isSwipingSlides: true
        });
    };

    const preventDefaultIfNeeded = () => {
        if(!event.target.tagName)
            return;
        if(event.target.tagName === 'VIDEO' || fsLightbox.data.isMobile === true)
            return;
        event.preventDefault();
    };
}


