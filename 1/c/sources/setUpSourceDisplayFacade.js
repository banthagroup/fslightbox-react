export function setUpSourceDisplayFacade(
    {
        core: { sourceDisplayFacade: self },
        stageIndexes,
        props: { loadOnlyCurrentSource },
	saw
    }
) {
    self.displaySourcesWhichShouldBeDisplayed = () => {
        if (loadOnlyCurrentSource) {
            saw[stageIndexes.current].u();
            return;
        }

        for (let i in stageIndexes) {
	    var j=stageIndexes[i];
            if (j !== undefined) {
                saw[j].u();
            }
        }
    };
}
