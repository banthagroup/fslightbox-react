import Source from "../../../../src/components/Sources/Source";

/**
 * @class SourceMock
 * @param { FsLightbox } fsLightbox
 */
export function SourceMock(fsLightbox) {
    /**
     * @var {Source} source
     */
    let source;
    let index;

    this.setIndex = (sourceIndex) => {
        index = sourceIndex;
    };

    this.getSource = () => {
        source = new Source({
            i: index ? index : 0,
            collections: fsLightbox.collections,
            core: fsLightbox.core,
            data: fsLightbox.data,
            elements: fsLightbox.elements,
            slide: fsLightbox.state.slide,
            sourcesData: fsLightbox.sourcesData
        });
        return source;
    };
}