import { LightboxUpdateActions } from "./LightboxUpdateActions";
import { getLightboxUpdaterConditioner } from "./getLightboxUpdaterConditioner";

export function setUpLightboxUpdater(
    {
        core: { lightboxUpdater: self, },
        data: { sources },
        getProps,
        injector: { resolve }
    }
) {
    const updatingActions = resolve(LightboxUpdateActions);
    const lightboxUpdaterConditioner = getLightboxUpdaterConditioner();

    self.handleUpdate = (previousProps) => {
        const currentProps = getProps();
        lightboxUpdaterConditioner.setPrevProps(previousProps);
        lightboxUpdaterConditioner.setCurrProps(currentProps);

        if (lightboxUpdaterConditioner.hasTogglerPropChanged()) {
            updatingActions.runTogglerUpdateActions();
        }

        if (lightboxUpdaterConditioner.hasSourcePropChanged()) {
            updatingActions.runCurrentStageIndexUpdateActionsFor(sources.indexOf(currentProps.source));
        } else if (lightboxUpdaterConditioner.hasSourceIndexPropChanged()) {
            updatingActions.runCurrentStageIndexUpdateActionsFor(currentProps.sourceIndex);
        } else if (lightboxUpdaterConditioner.hasSlidePropChanged()) {
            updatingActions.runCurrentStageIndexUpdateActionsFor(currentProps.slide - 1);
        }
    };
}
