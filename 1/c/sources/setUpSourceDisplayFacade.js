export function setUpSourceDisplayFacade(
    {
        core: { sourceDisplayFacade: self },
	loc,
        stageIndexes,
	sawu
    }
) {
    self.displaySourcesWhichShouldBeDisplayed = () => {
        if (loc) {
            sawu[stageIndexes.current]();
            return;
        }

        for (let i in stageIndexes) {
	    var j=stageIndexes[i];
            if (j !== undefined) {
                sawu[j]();
            }
        }
    };
}
