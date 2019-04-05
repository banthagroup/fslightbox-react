import { SlideChanger } from "../../../../src/core/Slide/SlideChanger";
import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";

const fsLightboxMock = new FsLightboxMock();
const fsLightbox = fsLightboxMock.getFsLightbox();
/** @var  { SlideChanger } slideChanger */
let slideChanger;
let sourceHolders;

beforeEach(() => {
    slideChanger = new SlideChanger(fsLightbox);
});

describe('changeSlideTo', () => {
    beforeEach(() => {
        fsLightboxMock.setAllSourcesToDivs();
        sourceHolders = fsLightboxMock.setAllSourceHoldersToDivs().getSourceHoldersArray();
        fsLightbox.state.slide = 1;
    });

    it('should change slide', () => {
        slideChanger.changeSlideTo(2);
        expect(fsLightbox.state.slide).toEqual(2);
    });

    it('should transform stage sourceHolders with timeout', () => {
        window.innerWidth = 100;
        jest.useFakeTimers();
        slideChanger.changeSlideTo(2);
        jest.runAllTimers();
        expect(sourceHolders[0].current.style.transform).toEqual('translate(-130px,0)');
        expect(sourceHolders[1].current.style.transform).toEqual('translate(0px,0)');
        expect(sourceHolders[2].current.style.transform).toEqual('translate(130px,0)');
    });

    describe('animating source holders', () => {
        let removeFadeIn;
        let fadeOut;
        let removeFadeOut;
        let fadeIn;
        let animateSourceFromSlideMockProperty;

        beforeEach(() => {
            removeFadeIn = jest.fn();
            fadeOut = jest.fn();
            removeFadeOut = jest.fn();
            fadeIn = jest.fn();
            fsLightbox.core.sourceAnimator.animateSourceFromSlide = jest.fn(() => ({
                removeFadeIn: removeFadeIn,
                fadeOut: fadeOut,
                removeFadeOut: removeFadeOut,
                fadeIn: fadeIn
            }));
            animateSourceFromSlideMockProperty = fsLightbox.core.sourceAnimator.animateSourceFromSlide.mock;
            slideChanger.changeSlideTo(2);
        });

        it('should call fade in on previous slide number', () => {
            console.log(animateSourceFromSlideMockProperty)
        });
    });
});