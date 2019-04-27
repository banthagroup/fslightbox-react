import { addOpenClassToDocumentElement } from "../../../../src/helpers/dom/document/addOpenClassToDocumentElement";
import { FSLIGHTBOX_OPEN_CLASS_NAME } from "../../../../src/constants/cssConstants";

describe('adding open class to document element', () => {
    beforeAll(() => {
        addOpenClassToDocumentElement();
    });

    it('should have open class', () => {
        expect(document.documentElement.classList.contains(FSLIGHTBOX_OPEN_CLASS_NAME)).toBe(true);
    });
});