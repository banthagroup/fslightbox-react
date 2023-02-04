export function setUpSourceDisplayFacade(
    {
        core: { sourceDisplayFacade: self },
        stageIndexes,
        props: { loadOnlyCurrentSource },
	sawu
    }
) {
    self.displaySourcesWhichShouldBeDisplayed = () => {
        if (loadOnlyCurrentSource) {
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
