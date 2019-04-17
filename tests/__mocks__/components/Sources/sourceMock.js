import Source from "../../../../src/components/sources/sources";

/**
 * @class SourceMock
 * @param { FsLightbox } fsLightbox
 */
export function SourceMock(fsLightbox) {
    /**
     * @var {sources} sources
     */
    let source;
    let index;

    this.setIndex = (sourceIndex) => {
        index = sourceIndex;
    };

    this.getSource = () => {
        source = new Source({
            fsLightbox: fsLightbox,
            index: index ? index : 0,
        });
        return source;
    };
}