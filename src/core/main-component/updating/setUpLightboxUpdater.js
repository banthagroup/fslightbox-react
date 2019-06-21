import { LightboxUpdatingActions } from "./LightboxUpdatingActions";

export function setUpLightboxUpdater(
    {
        getProps,
        componentsStates: {
            slide: slideState
        },
        injector: {
            injectDependency
        },
        core: {
            lightboxUpdater: self
        },
    }
) {
    const updatingActions = injectDependency(LightboxUpdatingActions);
    let previousProps;
    let currentProps;

    self.handleUpdate = (prevProps) => {
        previousProps = prevProps;
        currentProps = getProps();
        handleToggle();
        handleSlide();
    };

    const handleToggle = () => {
        if (previousProps.toggler !== currentProps.toggler) {
            updatingActions.runIsOpenUpdateActions();
        }
    };

    const handleSlide = () => {
        // TODO:
        updatingActions.runSlideUpdateActions();
        //     if (previousProps.slide !== currentProps.slide && !isSlideStateAndCurrentSlidePropEqual()) {
        //         updatingActions.runSlideUpdateActions();
        //     }
        // };
    };

    const isSlideStateAndCurrentSlidePropEqual = () => {
        // return (slideState.get) ? currentProps.slide === slideState.get() : false;
    };
}
