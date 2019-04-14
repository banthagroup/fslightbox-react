import Source from "../../../../src/components/Sources/Source";

/**
 * @class SourceMock
 * @param { FsLightbox } fsLightbox
 */
export function SourceMock(fsLightbox) {
    /**
     * @var {Sources} source
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