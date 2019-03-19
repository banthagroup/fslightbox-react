import { SlideChanger } from "../../../../src/core/Slide/SlideChanger";
import { FADE_IN_CLASS_NAME, FADE_OUT_CLASS_NAME } from "../../../../src/constants/CssConstants";
import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";

const fsLightboxMock = new FsLightboxMock();
const fsLightbox = fsLightboxMock.getFsLightbox();

describe('changeSlideTo', () => {
    const slideChanger = new SlideChanger(fsLightbox);
    const sources = fsLightboxMock.setAllSourcesToDivs().getSourcesArray();
    const sourceHolders = fsLightboxMock.setAllSourceHoldersToDivs().getSourceHoldersArray();

    beforeEach(() => {
        fsLightbox.state.slide = 1;
    });

    it('should change slide', () => {
        slideChanger.changeSlideTo(2);
        expect(fsLightbox.state.slide).toEqual(2);
    });

    it('should transform stage sourceHolders with timeout', () => {
        fsLightbox.sourcesData.slideDistance = 1;
        global.window.innerWidth = 100;
        jest.useFakeTimers();
        slideChanger.changeSlideTo(2);
        jest.runAllTimers();
        expect(sourceHolders[0].current.style.transform).toEqual('translate(-100px,0)');
        expect(sourceHolders[1].current.style.transform).toEqual('translate(0,0)');
        expect(sourceHolders[2].current.style.transform).toEqual('translate(100px,0)');
    });

    describe('animate sources', () => {
        beforeEach(() => {
            fsLightbox.state.slide = 1;
        });

        it('should remove fadeIn class from previous source', () => {
            sources[0].current.classList.add(FADE_IN_CLASS_NAME);
            slideChanger.changeSlideTo(2);
            expect(sources[0].current.classList.contains(FADE_IN_CLASS_NAME)).toBeFalsy();
        });

        it('should add fadeOut class to previous source', () => {
            slideChanger.changeSlideTo(2);
            expect(sources[0].current.classList.contains(FADE_OUT_CLASS_NAME)).toBeTruthy();
        });


        it('should remove fadeOut class from current source', () => {
            sources[1].current.classList.add(FADE_OUT_CLASS_NAME);
            slideChanger.changeSlideTo(2);
            expect(sources[1].current.classList.contains(FADE_OUT_CLASS_NAME)).toBeFalsy();
        });

        it('should add fadeIn class to current source', () => {
            slideChanger.changeSlideTo(2);
            expect(sources[1].current.classList.contains(FADE_IN_CLASS_NAME)).toBeTruthy();
        });
    });
});