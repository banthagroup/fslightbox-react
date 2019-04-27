/**
 * @constructor
 */
export function ScrollbarRecompensor(
    {
        data: {
            scrollbarWidth
        }
    }
) {
    this.addRecompense = () => {
        setMarginRightOfDocumentElementTo(scrollbarWidth);
    };

    this.removeRecompense = () => {
        setMarginRightOfDocumentElementTo(0);
    };

    const setMarginRightOfDocumentElementTo = (marginRight) => {
        document.documentElement.style.marginRight = marginRight + 'px';
    };
}