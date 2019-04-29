/**
 * @constructor
 * @param { FsLightbox.data | { isInitialized: boolean } } data
 * @param { FsLightbox.core.sourcesFactory | SourcesFactory } sourcesFactory
 */
export function LightboxInitializer(
    {
        data,
        core: {
            sourcesFactory,
        }
    }
) {
    this.initialize = () => {
        data.isInitialized = true;
        sourcesFactory.createSourcesAndAddThemToSourcesComponentsArray();
    }
}