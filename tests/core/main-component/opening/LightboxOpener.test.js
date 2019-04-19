import { documentElementClassList } from "../../../../src/helpers/dom/documentElementClassList";
import { FSLIGHTBOX_OPEN_CLASS_NAME } from "../../../../src/constants/cssConstants";
import { LightboxOpener } from "../../../../src/core/main-component/opening/LightboxOpener";

const openingActions = {
    runActions: jest.fn(),
};
const fsLightbox = {
    injector: {
        mainComponent: {
            getOpeningActions: () => openingActions
        }
    }
};
const lightboxOpener = new LightboxOpener(fsLightbox);

describe('addOpenClassToDocumentElement', () => {
    beforeAll(() => {
        if (documentElementClassList.contains(FSLIGHTBOX_OPEN_CLASS_NAME))
            documentElementClassList.remove(FSLIGHTBOX_OPEN_CLASS_NAME)
        lightboxOpener.addOpenClassToDocumentElement();
    });

    it('should add open class name do document', () => {
        expect(documentElementClassList.contains(FSLIGHTBOX_OPEN_CLASS_NAME)).toBeTruthy();
    });
});

describe('openLightbox', () => {
    beforeAll(() => {
        lightboxOpener.addOpenClassToDocumentElement = jest.fn();
        lightboxOpener.openLightbox();
    });

    it('should call runActions', () => {
        expect(openingActions.runActions).toBeCalled();
    });

    it('should call addOpenClassToDocument', () => {
        expect(lightboxOpener.addOpenClassToDocumentElement).toBeCalled();
    });
});