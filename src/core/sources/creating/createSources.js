import { SourceTypeGetter } from "../types/SourceTypeGetter";
import { CreatingSourcesLocalStorageManager } from "./CreatingSourcesLocalStorageManager";
import { DetectedTypeActions } from "../types/DetectedTypeActions";

export function createSources(
    {
        props: { urls },
        injector: { injectDependency }
    }
) {
    const detectedTypeActions = injectDependency(DetectedTypeActions);
    const localStorageManager = injectDependency(CreatingSourcesLocalStorageManager);
    let sourceTypeFromLocalStorage;
    let sourceIndex;

    for (let i = 0; i < urls.length; i++) {
        sourceIndex = i;
        sourceTypeFromLocalStorage = localStorageManager.getSourceTypeFromLocalStorageByUrl(urls[sourceIndex]);
        (sourceTypeFromLocalStorage) ?
            callActionsForSourceTypeFromLocalStorage() :
            retrieveTypeWithXhrAndCallActions();
    }

    function callActionsForSourceTypeFromLocalStorage() {
        detectedTypeActions.runActionsForSourceTypeAndIndex(
            sourceTypeFromLocalStorage, sourceIndex
        );
    }

    function retrieveTypeWithXhrAndCallActions() {
        // we need to copy index because xhr will for sure come later than next loop iteration
        let rememberedSourceIndex = sourceIndex;
        const sourceTypeGetter = injectDependency(SourceTypeGetter);
        sourceTypeGetter.setUrlToCheck(urls[rememberedSourceIndex]);
        sourceTypeGetter.getSourceType((sourceType) => {
            localStorageManager.handleReceivedSourceTypeForUrl(sourceType, urls[rememberedSourceIndex]);
            detectedTypeActions.runActionsForSourceTypeAndIndex(sourceType, rememberedSourceIndex)
        });
    }
}
