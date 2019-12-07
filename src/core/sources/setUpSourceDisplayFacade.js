export function setUpSourceDisplayFacade(
    {
        core: { sourceDisplayFacade: self },
        componentsServices: { updateSourceInnerCollection },
        stageIndexes
    }
) {
    self.displayStageSourcesIfNotYet = () => {
        for (let i in stageIndexes) {
            if (stageIndexes[i] !== undefined) {
                updateSourceInnerCollection[stageIndexes[i]]();
            }
        }
    };
}
