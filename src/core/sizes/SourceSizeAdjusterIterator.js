/**
 * @constructor
 */
export function SourceSizeAdjusterIterator({ collections: { sourcesSizesAdjusters } }) {
    let index;

    this.adjustAllSourcesSizes = () => {
        index = 0;
        while (hasNext()) {
            adjustSourceSize();
            index++;
        }
    };

    const hasNext = () => {
        return index < sourcesSizesAdjusters.length;
    };

    const adjustSourceSize = () => {
        if (!isNull()) {
            sourcesSizesAdjusters[index].adjustSourceSize();
        }
    };

    const isNull = () => {
        return !sourcesSizesAdjusters[index];
    };
}
