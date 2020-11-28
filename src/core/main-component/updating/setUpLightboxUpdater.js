import { LightboxUpdateActioner } from "./LightboxUpdateActioner";
import { getLightboxUpdaterConditioner } from "./getLightboxUpdaterConditioner";

export function setUpLightboxUpdater(fsLightbox) {
    const {
        core: { lightboxUpdater: self, },
        resolve,
    } = fsLightbox;

    const actioner = resolve(LightboxUpdateActioner);
    const lightboxUpdaterConditioner = getLightboxUpdaterConditioner();

    self.handleUpdate = (previousProps) => {
        // cannot destructure props in LightboxUpdater param, because this object is overwritten on props update
        const currentProps = fsLightbox.props;

        lightboxUpdaterConditioner.setPrevProps(previousProps);
        lightboxUpdaterConditioner.setCurrProps(currentProps);

        if (lightboxUpdaterConditioner.hasTogglerPropChanged()) {
            actioner.runTogglerUpdateActions();
        }

        if (lightboxUpdaterConditioner.hasSourcePropChanged()) {
            actioner.runCurrentStageIndexUpdateActionsFor(currentProps.sources.indexOf(currentProps.source));
        } else if (lightboxUpdaterConditioner.hasSourceIndexPropChanged()) {
            actioner.runCurrentStageIndexUpdateActionsFor(currentProps.sourceIndex);
        } else if (lightboxUpdaterConditioner.hasSlidePropChanged()) {
            actioner.runCurrentStageIndexUpdateActionsFor(currentProps.slide - 1);
        }
    };
}
