/**
 * @constructor
 */
export function SourceSizeAdjusterIterator({ collections: { sourceSizeAdjusters } }) {
    let index;

    this.adjustAllSourcesSizes = () => {
        index = 0;
        while (hasNext()) {
            adjustSourceSize();
            index++;
        }
    };

    const hasNext = () => {
        return index < sourceSizeAdjusters.length;
    };

    const adjustSourceSize = () => {
        if (!isNull()) {
            sourceSizeAdjusters[index].adjustSourceSize();
        }
    };

    const isNull = () => {
        return !sourceSizeAdjusters[index];
    };
}
