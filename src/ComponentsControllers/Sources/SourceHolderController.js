import { SourceTypeChecker } from "../../core/Source/SourceType/SourceTypeChecker";

/**
 * @class
 */
export function SourceHolderController(fsLightbox) {
    let isMounted;
    let isTypeCheckedAndSourceIsNotCreated;
    let index;

    this.setIndex = (i) => {
        index = i;
    };

    this.init = () => {
        if (!fsLightbox.sourcesData.sourcesTypes[index])
            this.initRequest();
        isMounted = false;
        isTypeCheckedAndSourceIsNotCreated = false;
    };

    this.initRequest = () => {
        const sourceTypeChecker = new SourceTypeChecker();
        sourceTypeChecker.setUrlToCheck(fsLightbox.data.urls[index]);
        sourceTypeChecker.getSourceType()
            .then(this.processReceivedSourceType);
    };

    this.processReceivedSourceType = (sourceType) =>
    {
        fsLightbox.sourcesData.sourcesTypes[index] = sourceType;
        if (isMounted) {
            console.log('source type received')
            if (fsLightbox.elements.sourceHolders[index].current === null) {
                fsLightbox.sourcesData.sourcesToCreateOnConstruct[index] = true;
                return;
            }
            fsLightbox.componentsControllers.sources[index].createSource();
        } else {
            isTypeCheckedAndSourceIsNotCreated = true;
        }
    };

    this.componentDidMount = () => {
        isMounted = true;
        if (!fsLightbox.core.stageSources.isSourceInStage(index)) {
            fsLightbox.core.sourceHoldersTransformer.transformStageSourceHolderAtIndex(index).negative();
        }
        if (isTypeCheckedAndSourceIsNotCreated) {
            fsLightbox.componentsControllers.sources[index].createSource();
        }
    }
}