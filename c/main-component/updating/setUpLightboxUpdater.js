import { LightboxUpdateActioner } from "./LightboxUpdateActioner";

export function setUpLightboxUpdater(fsLightbox) {
    const {
        core: { lightboxUpdater: self, },
        resolve,
    } = fsLightbox;

    const actioner = resolve(LightboxUpdateActioner);

    self.handleUpdate = (previousProps) => {
        // cannot destructure props in LightboxUpdater param, because this object is overwritten on props update
        const currentProps = fsLightbox.props;

        if (currentProps.source !== undefined) {
            actioner.runCurrentStageIndexUpdateActionsFor(currentProps.sources.indexOf(currentProps.source));
        } else if (currentProps.sourceIndex !== undefined) {
            actioner.runCurrentStageIndexUpdateActionsFor(currentProps.sourceIndex);
        } else if (currentProps.slide !== undefined) {
            actioner.runCurrentStageIndexUpdateActionsFor(currentProps.slide - 1);
        }

        if (previousProps.toggler !== currentProps.toggler) {
            actioner.runTogglerUpdateActions();
        }
    };
}
