import { LightboxUpdateActioner } from "./LightboxUpdateActioner";

const fsLightbox = {
    componentsServices: { isLightboxOpenManager: { get: () => false } },
    core: {
        lightboxUpdater: {},
        lightboxCloser: { closeLightbox: jest.fn() },
        lightboxOpener: { initializeAndOpenLightbox: jest.fn(), openLightbox: jest.fn() },
        slideIndexChanger: { jumpTo: jest.fn() }
    },
    data: {
        isInitialized: false
    },
    stageIndexes: { current: 0 }
};
const lightboxUpdateActioner = new LightboxUpdateActioner(fsLightbox);

test('handleTogglerUpdate', () => {
    lightboxUpdateActioner.runTogglerUpdateActions();
    expect(fsLightbox.core.lightboxOpener.initializeAndOpenLightbox).toBeCalled();
    expect(fsLightbox.core.lightboxCloser.closeLightbox).not.toBeCalled();
    expect(fsLightbox.core.lightboxCloser.closeLightbox).not.toBeCalled();

    fsLightbox.data.isInitialized = true;
    lightboxUpdateActioner.runTogglerUpdateActions();
    expect(fsLightbox.core.lightboxOpener.initializeAndOpenLightbox).toBeCalledTimes(1);
    expect(fsLightbox.core.lightboxOpener.openLightbox).toBeCalled();
    expect(fsLightbox.core.lightboxCloser.closeLightbox).not.toBeCalled();

    fsLightbox.componentsServices.isLightboxOpenManager.get = () => true;
    lightboxUpdateActioner.runTogglerUpdateActions();
    expect(fsLightbox.core.lightboxOpener.initializeAndOpenLightbox).toBeCalledTimes(1);
    expect(fsLightbox.core.lightboxOpener.openLightbox).toBeCalledTimes(1);
    expect(fsLightbox.core.lightboxCloser.closeLightbox).toBeCalled();
});

test('runCurrentStageIndexUpdateActionsFor', () => {
    fsLightbox.componentsServices.isLightboxOpenManager.get = () => false;

    lightboxUpdateActioner.runCurrentStageIndexUpdateActionsFor(0);
    expect(fsLightbox.core.slideIndexChanger.jumpTo).not.toBeCalled();

    lightboxUpdateActioner.runCurrentStageIndexUpdateActionsFor(1);
    expect(fsLightbox.core.slideIndexChanger.jumpTo).not.toBeCalled();
    expect(fsLightbox.stageIndexes.current).toBe(1);

    fsLightbox.componentsServices.isLightboxOpenManager.get = () => true;
    lightboxUpdateActioner.runCurrentStageIndexUpdateActionsFor(2);
    expect(fsLightbox.core.slideIndexChanger.jumpTo).toBeCalledWith(2);
    expect(fsLightbox.stageIndexes.current).toBe(1);
});
