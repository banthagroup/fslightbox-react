import { SourceComponentGetter } from "./SourceComponentGetter";
import { SourceTypeGetter } from "./SourceTypeGetter";

export function setUpSourcesFactory(
    {
        data: { urls },
        getters: {
            getIsOpen: getIsLightboxOpen
        },
        componentsStates: {
            shouldSourceHolderBeUpdatedCollection: shouldSourceHolderBeUpdatedStateCollection
        },
        elements: {
            sourcesComponents
        },
        injector: {
            injectDependency
        },
        core: {
            sourcesFactory: self
        }
    }
) {
    const sourceComponentGetter = injectDependency(SourceComponentGetter);
    let currentlyCreatedSourceIndex;

    self.createSourcesAndAddThemToSourcesComponentsArray = () => {
        for (let i = 0; i < urls.length; i++) {
            const sourceTypeGetter = injectDependency(SourceTypeGetter);
            sourceTypeGetter.setUrlToCheck(urls[i]);
            sourceTypeGetter.getSourceType((sourceType) => {
                addSourceComponentToProperArrayByTypeAndIndex(sourceType, i);
            });
        }
    };

    const addSourceComponentToProperArrayByTypeAndIndex = (sourceType, index) => {
        currentlyCreatedSourceIndex = index;
        sourceComponentGetter.setSourceIndex(index);
        sourceComponentGetter.setSourceType(sourceType);
        sourcesComponents[index] = sourceComponentGetter.getSourceComponent();
        updateSourceHolderIfLightboxIsOpen();
    };

    const updateSourceHolderIfLightboxIsOpen = () => {
        if (getIsLightboxOpen()) {
            shouldSourceHolderBeUpdatedStateCollection[currentlyCreatedSourceIndex].set(true);
        }
    };
}
