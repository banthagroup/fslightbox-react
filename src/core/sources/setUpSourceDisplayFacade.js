export function setUpSourceDisplayFacade(
    {
        core: { sourceDisplayFacade: self },
        componentsServices: { updateSourceInnerCollection },
        stageIndexes,
        props: { loadOnlyCurrentSource }
    }
) {
    self.displayStageSourcesIfNotYet = () => {
        if (loadOnlyCurrentSource) {
            updateSourceInnerCollection[stageIndexes.current]();
            return;
        }

        for (let i in stageIndexes) {
            if (stageIndexes[i] !== undefined) {
                updateSourceInnerCollection[stageIndexes[i]]();
            }
        }
    };
}
