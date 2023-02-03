export function setUpSlideChangeFacade(
    {
        core: {
            slideChangeFacade: self,
            slideIndexChanger,
        },
        props: { sources },
	st
    }
) {
    if (sources.length > 1) {
        self.changeToPrevious = () => {
            slideIndexChanger.jumpTo(st.getPreviousSlideIndex());
        };

        self.changeToNext = () => {
            slideIndexChanger.jumpTo(st.getNextSlideIndex());
        };
    } else {
        self.changeToPrevious = () => {};
        self.changeToNext = () => {};
    }
}
