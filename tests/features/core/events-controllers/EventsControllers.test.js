import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";
import { WindowResizeEventController } from "../../../../src/core/events-controllers/window/resize/WindowResizeEventController";
import { SwipingEventsControllersFacade } from "../../../../src/core/events-controllers/facades/SwipingEventsControllersFacade";

const fsLightboxMock = new FsLightboxMock();
const fsLightbox = fsLightboxMock.getFsLightbox();

describe('attaching to window object correct window event controllers', () => {
    it('should attach window resize event controller', () => {
        expect(fsLightbox.core.eventsControllers.window.resize).toBeInstanceOf(WindowResizeEventController);
    });

    it('should attach window swiping events controller facade', () => {
        expect(fsLightbox.core.eventsControllers.window.swiping).toBeInstanceOf(SwipingEventsControllersFacade);
    });
});