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
            fsLightbox: fsLightbox,
            i: index ? index : 0,
        });
        return source;
    };
}