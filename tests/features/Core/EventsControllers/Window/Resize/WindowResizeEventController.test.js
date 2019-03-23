import { FsLightboxMock } from "../../../../../__mocks__/components/fsLightboxMock";
import { TransformStageSourcesMock } from "../../../../../__mocks__/core/TransformStageSourcesMock";


const fsLightboxMock = new FsLightboxMock();
/** @var { FsLightbox } fsLightbox */
let fsLightbox;

beforeEach(() => {
    fsLightboxMock.instantiateNewFsLightbox();
    fsLightbox = fsLightboxMock.getFsLightbox();
});

describe('adding and removing resize listener from window', () => {
    // we can test if listener works by testing one method that should be called when event occurs
    beforeEach(() => {
        // setting source Holders to divs due to resize listener resizes source Holders and we don't use enzyme
        fsLightboxMock.setAllSourceHoldersToDivs();
        fsLightbox.core.sizeController.controlAll = jest.fn();
    });

    describe('adding resize listener to window', () => {
        it('should not call control all size', () => {
            global.dispatchEvent(new Event('resize'));
            expect(fsLightbox.core.sizeController.controlAll).not.toBeCalled();
        });

        it('should add resize event listener', () => {
            fsLightbox.core.eventsControllers.window.resize.attachListener();
            global.dispatchEvent(new Event('resize'));
            expect(fsLightbox.core.sizeController.controlAll).toBeCalled();
        });
    });

    describe('removing resize listener from window', () => {
        beforeEach(() => {
            fsLightbox.core.eventsControllers.window.resize.attachListener();
        });

        it('should call control all sizes due to listener is not removed', () => {
            global.dispatchEvent(new Event('resize'));
            expect(fsLightbox.core.sizeController.controlAll).toBeCalled();
        });

        it('should not call control all sizes because listener is removed', () => {
            fsLightbox.core.eventsControllers.window.resize.removeListener();
            global.dispatchEvent(new Event('resize'));
            expect(fsLightbox.core.sizeController.controlAll).not.toBeCalled();
        });
    });
});


describe('checking if methods that supposed to be called when event occurs are called', () => {
    let transformStageSourcesMock;
    beforeEach(() => {
        fsLightbox.core.eventsControllers.window.resize.attachListener();
        fsLightbox.core.sizeController.controlAll = jest.fn();
        fsLightbox.core.sourceSizeAdjusterIterator.adjustAllSourcesSizes = jest.fn();
        transformStageSourcesMock = new TransformStageSourcesMock(fsLightbox);
        global.dispatchEvent(new Event('resize'));
    });


    it('should call controll all sizes', () => {
        expect(fsLightbox.core.sizeController.controlAll).toBeCalled();
    });

    it('should adjust all Sources sizes', () => {
        expect(fsLightbox.core.sourceSizeAdjusterIterator.adjustAllSourcesSizes).toBeCalled();
    });

    it('should should transform all stage source Holders', () => {
        expect(transformStageSourcesMock.withoutTimeout).toBeCalled();
    });
});