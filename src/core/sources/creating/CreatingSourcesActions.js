import { SourceComponentGetter } from "./SourceComponentGetter";

/**
 * @constructor
 */
export function CreatingSourcesActions(
    {
        getState: getLightboxState,
        componentsStates: {
            shouldSourceHolderBeUpdatedCollection: shouldSourceHolderBeUpdatedStateCollection
        },
        elements: { sourcesComponents },
        injector: { injectDependency }
    }
) {
    const sourceComponentGetter = injectDependency(SourceComponentGetter);
    let sourceIndex;
    let sourceType;

    this.runActionsForSourceTypeAndIndex = (type, index) => {
        sourceIndex = index;
        sourceType = type;
        createSourceComponent();
        updateSourceHolderIfLightboxIsOpen();
    };

    const createSourceComponent = () => {
        sourceComponentGetter.setSourceIndex(sourceIndex);
        sourceComponentGetter.setSourceType(sourceType);
        sourcesComponents[sourceIndex] = sourceComponentGetter.getSourceComponent();
    };

    const updateSourceHolderIfLightboxIsOpen = () => {
        if (getLightboxState().isOpen) {
            shouldSourceHolderBeUpdatedStateCollection[sourceIndex].set(true);
        }
    };
}
