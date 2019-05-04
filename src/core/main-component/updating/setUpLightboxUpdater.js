import { LightboxUpdatingActions } from "./LightboxUpdatingActions";

export function setUpLightboxUpdater(
    {
        getters: {
            props: {
                getToggler: getTogglerProp,
                getSlide: getSlideProp
            }
        },
        componentsStates: {
            slide: slideState
        },
        injector: {
            injectDependency
        },
        core: {
            lightboxUpdater: self
        }
    }
) {
    const updatingActions = injectDependency(LightboxUpdatingActions);
    let previousProps;

    self.handleUpdate = (prevProps) => {
        previousProps = prevProps;
        handleToggle();
        handleSlide();
    };

    const handleToggle = () => {
        if (previousProps.toggler !== getTogglerProp()) {
            updatingActions.runIsOpenUpdateActions();
        }
    };

    const handleSlide = () => {
        if (previousProps.slide !== getSlideProp() && !isSlideStateAndCurrentSlidePropEqual()) {
            updatingActions.runSlideUpdateActions();
        }
    };

    const isSlideStateAndCurrentSlidePropEqual = () => {
        return (slideState.get) ? getSlideProp() === slideState.get() : false;
    };
}