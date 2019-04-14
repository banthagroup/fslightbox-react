/**
 * @class
 * @param { FsLightbox.injector.source.getSourceTypeGetter | function(): SourceTypeGetter } getSourceTypeGetter
 * @param { FsLightbox.injector.source.getSourceComponentGetter | function(): RefactoredSourceComponentGetter } getSourceComponentGetter
 */
export function SourcesFactory(
    {
        data: { urls },
        componentsStates: {
            sourcesComponents: sourceComponentsState
        },
        elements: {
            createdButNotRenderedSourcesComponents
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
    let currentlyCreatedSourceComponent;
    let currentlyCreatedSourceIndex;

    this.createSourcesAndAddThemToProperArrays = () => {
        for (let i = 0; i < urls.length; i++) {
            const sourceTypeGetter = getSourceTypeGetter();
            sourceTypeGetter.setUrlToCheck(urls[i]);
            sourceTypeGetter.getSourceType().then((sourceType) => {
                addSourceComponentToProperArrayByTypeAndIndex(sourceType, i);
            });
        }
    };

    const addSourceComponentToProperArrayByTypeAndIndex = (sourceType, index) => {
        sourceComponentGetter.setSourceIndex(index);
        sourceComponentGetter.setSourceType(sourceType);
        currentlyCreatedSourceIndex = index;
        currentlyCreatedSourceComponent = sourceComponentGetter.getSourceComponent();
        (sourceComponentsState.set) ?
            addSourceComponentToSourceComponentsState() :
            addSourceComponentToCreatedButNotRenderedSourcesComponentsArray()

    };

    const addSourceComponentToSourceComponentsState = () => {
        const newSourceComponentsState = sourceComponentsState.get();
        newSourceComponentsState[currentlyCreatedSourceIndex] = currentlyCreatedSourceComponent;
        sourceComponentsState.set(newSourceComponentsState);
    };

    const addSourceComponentToCreatedButNotRenderedSourcesComponentsArray = () => {
        createdButNotRenderedSourcesComponents[currentlyCreatedSourceIndex] = currentlyCreatedSourceComponent;
    };
}
