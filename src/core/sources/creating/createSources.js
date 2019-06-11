import { SourceTypeGetter } from "../types/SourceTypeGetter";
import { CreatingSourcesLocalStorageManager } from "./CreatingSourcesLocalStorageManager";
import { DetectedTypeActions } from "../types/DetectedTypeActions";

export function createSources(
    {
        props: {
            urls,
            types: typesSetManuallyByClient
        },
        injector: { injectDependency }
    }
) {
    const detectedTypeActions = injectDependency(DetectedTypeActions);
    const localStorageManager = injectDependency(CreatingSourcesLocalStorageManager);
    let getTypeSetManuallyByClient;
    let sourceTypeRetrievedWithoutXhr;
    let sourceIndex;
    setUpGetTypeSetManuallyByClient();

    for (let i = 0; i < urls.length; i++) {
        sourceIndex = i;
        let typeSetManuallyByClient = getTypeSetManuallyByClient(i);
        // if client set type it's always the most important one
        if (typeSetManuallyByClient) {
            sourceTypeRetrievedWithoutXhr = typeSetManuallyByClient;
            callActionsForSourceTypeRetrievedWithoutXhr();
            continue;
        }
        sourceTypeRetrievedWithoutXhr = localStorageManager.getSourceTypeFromLocalStorageByUrl(urls[sourceIndex]);
        (sourceTypeRetrievedWithoutXhr) ?
            callActionsForSourceTypeRetrievedWithoutXhr() :
            retrieveTypeWithXhrAndCallActions();
    }

    function setUpGetTypeSetManuallyByClient() {
        // if user didn't set types prop we need to prevent from retrieving indexes from undefined
        (typeof typesSetManuallyByClient !== "object") ?
            getTypeSetManuallyByClient = () => null :
            getTypeSetManuallyByClient = (i) => typesSetManuallyByClient[i]
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
        sourceTypeGetter.setUrlToCheck(urls[rememberedSourceIndex]);
        sourceTypeGetter.getSourceType((sourceType) => {
            localStorageManager.handleReceivedSourceTypeForUrl(sourceType, urls[rememberedSourceIndex]);
            detectedTypeActions.runActionsForSourceTypeAndIndex(sourceType, rememberedSourceIndex)
        });
    }
}
