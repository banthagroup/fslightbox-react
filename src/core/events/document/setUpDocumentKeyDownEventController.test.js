import { setUpDocumentKeyDownEventController } from "./setUpDocumentKeyDownEventController";

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

test('attaching keydown listener to document', () => {
    document.addEventListener = jest.fn();
    documentKeyDownEventController.attachListener();
    expect(document.addEventListener)
        .toBeCalledWith('keydown', fsLightbox.core.keyboardController.handleKeyDown);
});

test('removing keydown listener from document', () => {
    document.removeEventListener = jest.fn();
    documentKeyDownEventController.removeListener();
    expect(document.removeEventListener)
        .toBeCalledWith('keydown', fsLightbox.core.keyboardController.handleKeyDown);
});
