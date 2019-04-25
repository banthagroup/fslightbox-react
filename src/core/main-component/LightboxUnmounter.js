/**
 * @class
 * @param { FsLightbox.collections.xhrs | Array } xhrs
 */
export function LightboxUnmounter({ collections: { xhrs } }) {
    this.runActions = () => {
        abortXhrs();
    };

    const abortXhrs = () => {
        for (let i = 0; i < xhrs.length; i++) {
            xhrs[i].abort();
        }
    };
}