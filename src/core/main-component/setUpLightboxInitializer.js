export function setUpLightboxInitializer(
    {
        data,
        core: {
            sourcesFactory,
            lightboxInitializer: self
        }
    }
) {
    self.initialize = () => {
        data.isInitialized = true;
        sourcesFactory.createSourcesAndAddThemToSourcesComponentsArray();
    }
}