import SourceHolder from "../../../../src/components/Sources/SourceHolder";

/**
 * @class SourceHolderMock
 */
export function SourceHolderMock(fsLightbox) {
    /**
     * @var {SourceHolder} sourceSolder
     */
    let sourceHolder;
    let index;

    this.setIndex = (sourceIndex) => {
        index = sourceIndex;
    };

    this.getSourceHolder = () => {
        sourceHolder = new SourceHolder({
            fsLightbox: fsLightbox
            i: index ? index : 0,
        });
        return sourceHolder;
    };
}