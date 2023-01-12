export function setUpSourceDisplayFacade(
    {
        core: { sourceDisplayFacade: self },
        componentsServices: { updateSourceDirectWrapperCollection },
        stageIndexes,
        props: { loadOnlyCurrentSource }
    }
) {
    self.displaySourcesWhichShouldBeDisplayed = () => {
        if (loadOnlyCurrentSource) {
            updateSourceDirectWrapperCollection[stageIndexes.current]();
            return;
        }

        for (let i in stageIndexes) {
            if (stageIndexes[i] !== undefined) {
                updateSourceDirectWrapperCollection[stageIndexes[i]]();
            }
        }
    };
}
