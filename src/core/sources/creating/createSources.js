import { SourceTypeGetter } from "../types/SourceTypeGetter";
import { CreatingSourcesLocalStorageManager } from "./CreatingSourcesLocalStorageManager";
import { DetectedTypeActions } from "../types/DetectedTypeActions";

export function createSources(
    {
        data: {
            sources
        },
        props: {
            types: typesProp,
            type: typeProp,
        },
        injector: { injectDependency }
    }
) {
    const detectedTypeActions = injectDependency(DetectedTypeActions);
    const localStorageManager = injectDependency(CreatingSourcesLocalStorageManager);
    let sourceTypeRetrievedWithoutXhr;
    let sourceIndex;

    for (let i = 0; i < sources.length; i++) {
        sourceIndex = i;

        let typeSetManuallyByClient;
        if (typesProp && typesProp[i]) {
            typeSetManuallyByClient = typesProp[i];
        } else if (typeProp) {
            typeSetManuallyByClient = typeProp;
        }

        // if client set type it's always the most important one
        if (typeSetManuallyByClient) {
            sourceTypeRetrievedWithoutXhr = typeSetManuallyByClient;
            callActionsForSourceTypeRetrievedWithoutXhr();
            continue;
        }

        sourceTypeRetrievedWithoutXhr = localStorageManager.getSourceTypeFromLocalStorageByUrl(sources[i]);
        (sourceTypeRetrievedWithoutXhr) ?
            callActionsForSourceTypeRetrievedWithoutXhr() :
            retrieveTypeWithXhrAndCallActions();
    }

    function callActionsForSourceTypeRetrievedWithoutXhr() {
        detectedTypeActions.runActionsForSourceTypeAndIndex(
            sourceTypeRetrievedWithoutXhr, sourceIndex
        );
    }

    function retrieveTypeWithXhrAndCallActions() {
        // we need to copy index because xhr will for sure come later than next loop iteration
        let rememberedSourceIndex = sourceIndex;
        const sourceTypeGetter = injectDependency(SourceTypeGetter);
        sourceTypeGetter.setUrlToCheck(sources[rememberedSourceIndex]);
        sourceTypeGetter.getSourceType((sourceType) => {
            localStorageManager.handleReceivedSourceTypeForUrl(sourceType, sources[rememberedSourceIndex]);
            detectedTypeActions.runActionsForSourceTypeAndIndex(sourceType, rememberedSourceIndex)
        });
    }
}
