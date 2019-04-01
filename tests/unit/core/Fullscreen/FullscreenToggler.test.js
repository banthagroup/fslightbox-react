import FsLightbox from "../../../../src";
import { testProps } from "../../../schemas/testVariables";
import { FullscreenToggler } from "../../../../src/core/Fullscreen/FullscreenToggler";

const fsLightbox = new FsLightbox(testProps);
const fullscreen = new FullscreenToggler(fsLightbox);

describe('requestFullscreen', () => {
    it('should turn on fullscreen', () => {
        document.documentElement.requestFullscreen = jest.fn();
        fullscreen.turnOnFullscreen();
        expect(document.documentElement.requestFullscreen).toBeCalled();
    });

    it('should turn off fullscreen', () => {
        document.exitFullscreen = jest.fn();
        fullscreen.turnOffFullscreen();
        expect(document.exitFullscreen).toBeCalled();
    });
});

describe('mozRequestFullScreen', () => {
    beforeEach(() => {
        document.documentElement.requestFullscreen = null;
        document.exitFullscreen = null;
    });

    it('should turn on fullscreen', () => {
        document.documentElement.mozRequestFullScreen = jest.fn();
        fullscreen.turnOnFullscreen();
        expect(document.documentElement.mozRequestFullScreen).toBeCalled();
    });

    it('should turn off fullscreen', () => {
        document.mozCancelFullScreen = jest.fn();
        fullscreen.turnOffFullscreen();
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
        fullscreen.turnOnFullscreen();
        expect(document.documentElement.webkitRequestFullscreen).toBeCalled();
    });

    it('should turn off fullscreen', () => {
        document.webkitExitFullscreen = jest.fn();
        fullscreen.turnOffFullscreen();
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
        fullscreen.turnOnFullscreen();
        expect(document.documentElement.msRequestFullscreen).toBeCalled();
    });

    it('should turn off fullscreen', () => {
        document.msExitFullscreen = jest.fn();
        fullscreen.turnOffFullscreen();
        expect(document.msExitFullscreen).toBeCalled();
    });
});