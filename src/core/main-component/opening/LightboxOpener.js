import { documentElementClassList } from "../../../helpers/dom/documentElementClassList";
import { FSLIGHTBOX_OPEN_CLASS_NAME } from "../../../constants/cssConstants";

/**
 * @class
 * @param { FsLightbox.injector.mainComponent.getOpeningActions| function(): LightboxOpeningActions } getOpeningActions
 */
export function LightboxOpener(
    {
        injector: {
            mainComponent: {
                getOpeningActions
            }
        }
    }
) {
    const lightboxOpeningActions = getOpeningActions();

    this.addOpenClassToDocumentElement = () => {
        documentElementClassList.add(FSLIGHTBOX_OPEN_CLASS_NAME);
    };

    this.openLightbox = () => {
        this.addOpenClassToDocumentElement();
        lightboxOpeningActions.runActions();
    }
}