export function setUpSlideChangeFacade(
    {
        core: {
            slideChangeFacade: self,
            slideIndexChanger,
            stageManager
        },
        data: {
            sourcesCount
        }
    }
) {
    if (sourcesCount > 1) {
        self.changeToPrevious = () => {
            slideIndexChanger.changeToWithActions(stageManager.getPreviousSlideIndex());
        };

        self.changeToNext = () => {
            slideIndexChanger.changeToWithActions(stageManager.getNextSlideIndex());
        };
    } else {
        self.changeToPrevious = () => {};
        self.changeToNext = () => {};
    }
}
