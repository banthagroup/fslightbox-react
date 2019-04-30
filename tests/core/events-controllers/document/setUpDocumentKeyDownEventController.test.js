import { setUpDocumentKeyDownEventController } from "../../../../src/core/events-controllers/document/setUpDocumentKeyDownEventController";

const documentKeyDownEventController = {};
const fsLightbox = {
    core: {
        eventsControllers: {
            document: {
                keyDown: documentKeyDownEventController
            }
        },
        keyboardController: {
            handleKeyDown: () => {},
        }
    }
};

setUpDocumentKeyDownEventController(fsLightbox);

describe('attaching keydown listener to document', () => {
    beforeAll(() => {
        document.addEventListener = jest.fn();
        documentKeyDownEventController.attachListener();
    });

    it('should call addEventListener with keydown and handleKeyDown method', () => {
        expect(document.addEventListener).toBeCalledWith('keydown', fsLightbox.core.keyboardController.handleKeyDown);
    });
});

describe('removing keydown listener from document', () => {
    beforeAll(() => {
        document.removeEventListener = jest.fn();
        documentKeyDownEventController.removeListener();
    });

    it('should call removeEventListener with keydown and handleKeyDown method', () => {
        expect(document.removeEventListener).toBeCalledWith('keydown', fsLightbox.core.keyboardController.handleKeyDown);
    });
});