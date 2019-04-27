/**
 * @constructor
 * @param { FsLightbox.data | { isInitialized: boolean } } data
 * @param { FsLightbox.core.sourcesFactory.createSourcesAndAddThemToSourcesComponentsArray | Function } createSourcesAndAddThemToSourcesComponentsArray
 */
export function LightboxInitializer(
    {
        data,
        core: {
            sourcesFactory: { createSourcesAndAddThemToSourcesComponentsArray }
        }
    }
) {
    this.initialize = () => {
        data.isInitialized = true;
        createSourcesAndAddThemToSourcesComponentsArray();
    }
}