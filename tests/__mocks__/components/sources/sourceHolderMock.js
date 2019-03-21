import SourceHolder from "../../../../src/components/sources/SourceHolder";

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
            i: index ? index : 0,
            collections: fsLightbox.collections,
            core: fsLightbox.core,
            data: fsLightbox.data,
            elements: fsLightbox.elements,
            slide: fsLightbox.state.slide,
            sourcesData: fsLightbox.sourcesData
        });
        return sourceHolder;
    };
}