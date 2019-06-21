/**
 * @constructor
 */
export function SourceHolderTransformer({ data: { slideDistance } }) {
    const realSlideDistance = slideDistance + 1;
    let sourceHolder;
    let additionalTransformValue = 0;

    this.setSourceHolder = (sourceHolderElement) => {
        sourceHolder = sourceHolderElement;
    };

    /** @return { this } */
    this.byValue = (value) => {
        additionalTransformValue = value;
        return this;
    };

    this.negative = () => {
        setFinalTransformAndCleanTransformer(-getDefaultTransformDistance());
    };

    this.clearTransform = () => {
        sourceHolder.current.style.transform = '';
    };

    this.zero = () => {
        setFinalTransformAndCleanTransformer(0);
    };

    this.positive = () => {
        setFinalTransformAndCleanTransformer(getDefaultTransformDistance());
    };

    const setFinalTransformAndCleanTransformer = (value) => {
        sourceHolder.current.style.transform = `translateX(${ value + additionalTransformValue }px)`;
        additionalTransformValue = 0;
    }

    const getDefaultTransformDistance = () => realSlideDistance * innerWidth;
}
