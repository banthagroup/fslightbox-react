import { ON_INIT } from "../../../constants/eventsConstants";

export function setUpLightboxInitializer(
    {
        data,
        eventsDispatcher: {
            dispatch
        },
        core: {
            sourcesFactory,
            lightboxInitializer: self
        }
    }
) {
    self.initialize = () => {
        data.isInitialized = true;
        sourcesFactory.createSourcesAndAddThemToSourcesComponentsArray();
        dispatch(ON_INIT);
    }
}