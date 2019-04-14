import { FsLightboxMock } from "../../../../../__mocks__/components/fsLightboxMock";
import { TransformStageSourcesMock } from "../../../../../__mocks__/core/TransformStageSourcesMock";
import { WindowResizeEventController } from "../../../../../../src/core/EventsControllers/Window/Resize/WindowResizeEventController";


const fsLightboxMock = new FsLightboxMock();
/** @var { FsLightbox } fsLightbox */
let fsLightbox;

beforeEach(() => {
    fsLightboxMock.instantiateNewFsLightbox();
    fsLightbox = fsLightboxMock.getFsLightbox();
});

describe('adding and removing resize listener from window', () => {
    /** @var { WindowResizeEventController } windowResizeEventController */
    let windowResizeEventController;

    // we can test if listener works by testing one method that should be called when event occurs
    beforeEach(() => {
        // setting source Holders to divs due to resize listener resizes source Holders and we don't use enzyme
        fsLightboxMock.setAllSourceHoldersToDivs();
        // setting media holder to div due to resize listener resizes media Holder and we don't use enzyme
        fsLightboxMock.setMediaHolderToDiv();
        fsLightbox.core.globalResizingController.controlAllSizes = jest.fn();
        windowResizeEventController = new WindowResizeEventController(fsLightbox);

    });

    describe('adding resize listener to window', () => {
        it('should not call control all size', () => {
            dispatchEvent(new Event('resize'));
            expect(fsLightbox.core.globalResizingController.controlAllSizes).not.toBeCalled();
        });

        it('should add resize event listener', () => {
            windowResizeEventController.attachListener();
            dispatchEvent(new Event('resize'));
            expect(fsLightbox.core.globalResizingController.controlAllSizes).toBeCalled();
        });
    });

    describe('removing resize listener from window', () => {
        beforeEach(() => {
            windowResizeEventController.attachListener();
        });

        it('should call control all sizes due to listener is not removed', () => {
            dispatchEvent(new Event('resize'));
            expect(fsLightbox.core.globalResizingController.controlAllSizes).toBeCalled();
        });

        it('should not call control all sizes because listener is removed', () => {
            windowResizeEventController.removeListener();
            dispatchEvent(new Event('resize'));
            expect(fsLightbox.core.globalResizingController.controlAllSizes).not.toBeCalled();
        });
    });
});


describe('checking if methods that supposed to be called when resize event occurs are called', () => {
    let transformStageSourcesMock;
    /** @var { WindowResizeEventController } windowResizeEventController */
    let windowResizeEventController;

    beforeEach(() => {
        transformStageSourcesMock = new TransformStageSourcesMock(fsLightbox);
        fsLightbox.core.globalResizingController.controlAllSizes = jest.fn();
        fsLightbox.core.sourceSizeAdjusterIterator.adjustAllSourcesSizes = jest.fn();
        windowResizeEventController = new WindowResizeEventController(fsLightbox);
        windowResizeEventController.attachListener();
        dispatchEvent(new Event('resize'));
    });


    it('should call controll all sizes', () => {
        expect(fsLightbox.core.globalResizingController.controlAllSizes).toBeCalled();
    });

    it('should adjust all Sources sizes', () => {
        expect(fsLightbox.core.sourceSizeAdjusterIterator.adjustAllSourcesSizes).toBeCalled();
    });

    it('should should transform all stage source Holders', () => {
        expect(transformStageSourcesMock.withoutTimeout).toBeCalled();
    });
});