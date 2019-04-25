/**
 * @class
 * @param { FsLightbox.data.urls | Array } urls
 * @param { FsLightbox.getters.getIsOpen | function(): boolean } getIsLightboxOpen
 * @param { FsLightbox.componentsStates.shouldSourceHolderBeUpdatedCollection | Array<{set: function(boolean)}> } shouldSourceHolderBeUpdatedStateCollection
 * @param { FsLightbox.elements.sourcesComponents | Array } sourcesComponents
 * @param { FsLightbox.injector.source.getSourceTypeGetter | function(): SourceTypeGetter } getSourceTypeGetter
 * @param { FsLightbox.injector.source.getSourceComponentGetter | function(): SourceComponentGetter } getSourceComponentGetter
 */
export function SourcesFactory(
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
            source: {
                getSourceTypeGetter,
                getSourceComponentGetter
            }
        }
    }
) {
    const sourceComponentGetter = getSourceComponentGetter();
    let currentlyCreatedSourceIndex;
    
    this.createSourcesAndAddThemToSourcesComponentsArray = () => {
        for (let i = 0; i < urls.length; i++) {
            const sourceTypeGetter = getSourceTypeGetter();
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
