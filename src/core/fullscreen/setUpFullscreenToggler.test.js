import { setUpFullscreenToggler } from "./setUpFullscreenToggler";

const fullscreenToggler = {};
const fsLightbox = {
    componentsStates: {
        isFullscreenOpen: {
            set: () => {}
        }
    },
    core: {
        fullscreenToggler: fullscreenToggler
    }
};

setUpFullscreenToggler(fsLightbox);

describe('setting isFullscreenOpen component state', () => {
    beforeEach(() => {
        fsLightbox.componentsStates.isFullscreenOpen.set = jest.fn();
    });

    test('turnOnFullscreen', () => {
        fullscreenToggler.turnOnFullscreen();
        expect(fsLightbox.componentsStates.isFullscreenOpen.set).toBeCalledWith(true);
    });

    test('turnOffFullscreen', () => {
        fullscreenToggler.turnOffFullscreen();
        expect(fsLightbox.componentsStates.isFullscreenOpen.set).toBeCalledWith(false);
    });
});

test('requestFullscreen', () => {
    document.documentElement.requestFullscreen = jest.fn();
    fullscreenToggler.turnOnFullscreen();
    expect(document.documentElement.requestFullscreen).toBeCalled();

    document.exitFullscreen = jest.fn();
    fullscreenToggler.turnOffFullscreen();
    expect(document.exitFullscreen).toBeCalled();
});

describe('mozRequestFullScreen', () => {
    beforeEach(() => {
        document.documentElement.requestFullscreen = null;
        document.exitFullscreen = null;
    });

    it('should turn on fullscreen', () => {
        document.documentElement.mozRequestFullScreen = jest.fn();
        fullscreenToggler.turnOnFullscreen();
        expect(document.documentElement.mozRequestFullScreen).toBeCalled();
    });

    it('should turn off fullscreen', () => {
        document.mozCancelFullScreen = jest.fn();
        fullscreenToggler.turnOffFullscreen();
        expect(document.mozCancelFullScreen).toBeCalled();
    });
});


describe('webkitRequestFullscreen', () => {
    beforeEach(() => {
        document.documentElement.requestFullscreen = null;
        document.exitFullscreen = null;
        document.documentElement.mozRequestFullScreen = null;
        document.mozCancelFullScreen = null;
    });

    it('should turn on fullscreen', () => {
        document.documentElement.webkitRequestFullscreen = jest.fn();
        fullscreenToggler.turnOnFullscreen();
        expect(document.documentElement.webkitRequestFullscreen).toBeCalled();
    });

    it('should turn off fullscreen', () => {
        document.webkitExitFullscreen = jest.fn();
        fullscreenToggler.turnOffFullscreen();
        expect(document.webkitExitFullscreen).toBeCalled();
    });
});


describe('msRequestFullscreen', () => {
    beforeEach(() => {
        document.documentElement.requestFullscreen = null;
        document.exitFullscreen = null;
        document.documentElement.mozRequestFullScreen = null;
        document.mozCancelFullScreen = null;
        document.documentElement.webkitRequestFullscreen = null;
        document.webkitExitFullscreen = null;
    });

    it('should turn on fullscreen', () => {
        document.documentElement.msRequestFullscreen = jest.fn();
        fullscreenToggler.turnOnFullscreen();
        expect(document.documentElement.msRequestFullscreen).toBeCalled();
    });

    it('should turn off fullscreen', () => {
        document.msExitFullscreen = jest.fn();
        fullscreenToggler.turnOffFullscreen();
        expect(document.msExitFullscreen).toBeCalled();
    });
});
