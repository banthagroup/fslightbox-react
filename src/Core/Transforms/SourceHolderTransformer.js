/**
 * @class SourceHolderTransformer
 * @param { FsLightbox.sourcesData.slideDistance } slideDistance
 */
export function SourceHolderTransformer({ sourcesData: { slideDistance } }) {
    let sourceHolderStyle;
    let transformValue = 0;

    this.setSourceHolder = (sourceHolder) => {
        transformValue = 0;
        sourceHolderStyle = sourceHolder.current.style;
    };

    /** @return { this } */
    this.byValue = (value) => {
        transformValue = value;
        return this;
    };

    this.negative = () => {
        sourceHolderStyle.transform = getTransformStringForValue(-getDefaultTransformDistance());
    };

    this.zero = () => {
        sourceHolderStyle.transform = getTransformStringForValue(0);
    };

    this.positive = () => {
        sourceHolderStyle.transform = getTransformStringForValue(getDefaultTransformDistance());
    };

    const getDefaultTransformDistance = () => slideDistance * window.innerWidth;
    const getTransformStringForValue = (value) => `translate(${ value + transformValue }px,0)`;
}