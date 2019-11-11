export function setUpSourceDisplayFacade(
    {
        core: { sourceDisplayFacade: self },
        componentsServices: { updateSourceInnerCollection },
        stageIndexes
    }
) {
    self.displayStageSourcesIfNotYet = () => {
        for (let i in stageIndexes) {
            if (updateSourceInnerCollection[stageIndexes[i]]) {
                updateSourceInnerCollection[stageIndexes[i]]();
            }
        }
    };
}
