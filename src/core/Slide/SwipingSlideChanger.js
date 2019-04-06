/**
 * @class
 */
export function SwipingSlideChanger(
    {
        setters: {
            setState
        },
        getters: {
            getSlide
        },
        core: {
            sourceHoldersTransformer: { transformStageSourceHolders },
            sourceAnimator
        }
    }
) {
    let previousSlideNumber;
    let newSlideNumber;

    this.changeSlideTo = (slideNumber) => {
        setState({
            slide: slideNumber
        }, callTransforms);
    };

    const callTransforms = () => {
        transformStageSourceHolders().withoutTimeout();
    };
}