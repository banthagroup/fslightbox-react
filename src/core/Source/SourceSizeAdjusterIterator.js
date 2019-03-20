/**
 * @class SourceSizeAdjusterIterator
 * @param { FsLightbox.collections.sourceSizeAdjusters } sourceSizeAdjusters
 */
export function SourceSizeAdjusterIterator({ collections }) {
    let index;

    this.adjustAllSourcesSizes = () => {
        index = 0;
        while (hasNext()) {
            adjustSourceSize();
            index++;
        }
    };

    const hasNext = () => {
        return index < collections.sourceSizeAdjusters.length;
    };

    const adjustSourceSize = () => {
        if (!isNull()) {
            collections.sourceSizeAdjusters[index].adjustSourceSize();
        }
    };

    const isNull = () => {
        return !collections.sourceSizeAdjusters[index];
    };
}