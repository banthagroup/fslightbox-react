/**
 * @class
 * @param { FsLightbox.injector.source.getSourceTypeGetter | function(): SourceTypeGetter } getSourceTypeGetter
 * @param { FsLightbox.injector.source.getSourceComponentGetter | function(): RefactoredSourceComponentGetter } getSourceComponentGetter
 */
export function SourcesFactory(
    {
        data,
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
            source: {
                getSourceTypeGetter,
                getSourceComponentGetter
            }
        }
    }
) {
    const sourceComponentGetter = getSourceComponentGetter();
    let currentlyCreatedSourceIndex;

    this.createSourcesAndAddThemToProperArrays = () => {
        for (let i = 0; i < data.urls.length; i++) {
            const sourceTypeGetter = getSourceTypeGetter();
            sourceTypeGetter.setUrlToCheck(data.urls[i]);
            sourceTypeGetter.getSourceType().then((sourceType) => {
                addSourceComponentToProperArrayByTypeAndIndex(sourceType, i);
            });
        }
    };

    const addSourceComponentToProperArrayByTypeAndIndex = (sourceType, index) => {
        currentlyCreatedSourceIndex = index;
        sourceComponentGetter.setSourceIndex(index);
        sourceComponentGetter.setSourceType(sourceType);
        sourcesComponents[index] = sourceComponentGetter.getSourceComponent();
        // console.log('source type get: ' + index + ' ' + source-type);
        updateSourceHolderIfIsMounted();
    };

    const updateSourceHolderIfIsMounted = () => {
        // if lightbox is open we can update state
        if (data.isMounted && getIsLightboxOpen()) {
            shouldSourceHolderBeUpdatedStateCollection[currentlyCreatedSourceIndex].set(true);
        }
    };
}
