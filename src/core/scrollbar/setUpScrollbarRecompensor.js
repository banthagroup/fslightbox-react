export function setUpScrollbarRecompensor(
    {
        data: {
            scrollbarWidth
        },
        core: {
            scrollbarRecompensor: self
        }
    }
) {
    self.addRecompense = () => {
        if (document.body.offsetHeight > window.innerHeight)
            setMarginRightOfDocumentElementTo(scrollbarWidth);
    };

    self.removeRecompense = () => {
        setMarginRightOfDocumentElementTo(0);
    };

    const setMarginRightOfDocumentElementTo = (marginRight) => {
        document.documentElement.style.marginRight = marginRight + 'px';
    };
}