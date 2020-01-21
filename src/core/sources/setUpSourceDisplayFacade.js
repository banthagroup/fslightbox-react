export function setUpSourceDisplayFacade(
    {
        core: { sourceDisplayFacade: self },
        componentsServices: { updateSourceInnerCollection },
        stageIndexes,
        props: { loadOnlySelectedImage }
    }
) {
    self.displayStageSourcesIfNotYet = () => {
        if (loadOnlySelectedImage) {
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
