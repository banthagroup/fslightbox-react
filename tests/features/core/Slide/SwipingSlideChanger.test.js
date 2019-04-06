import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";
import { SwipingSlideChanger } from "../../../../src/core/Slide/SwipingSlideChanger";

const fsLightboxMock = new FsLightboxMock();
/** @var { FsLightbox } fsLightbox */
let fsLightbox;
/** @var { SwipingSlideChanger } swipingSlideChanger */
let swipingSlideChanger;

beforeEach(() => {
    fsLightbox = fsLightboxMock.getFsLightbox();
    // we are transforming source holders in swipingSlideChanger so we need to mock them
    fsLightboxMock.setAllSourceHoldersToDivs();
});

const createNewSlideChangerAndChangeSlideTo = (slide) => {
    swipingSlideChanger = new SwipingSlideChanger(fsLightbox);
    swipingSlideChanger.changeSlideTo(2);
};

describe('changing slide', () => {
    beforeEach(() => {
        fsLightbox.state.slide = 1;
        createNewSlideChangerAndChangeSlideTo(2);
    });

    it('should change slide', () => {
        expect(fsLightbox.state.slide).toEqual(2);
    });
});

describe('transforming sources (for swiping with timeout)', () => {
    let withoutTimeout;

    beforeEach(() => {
        withoutTimeout = jest.fn();
        fsLightbox.core.sourceHoldersTransformer.transformStageSourceHolders = jest.fn(() => ({
            withoutTimeout: withoutTimeout
        }));
        createNewSlideChangerAndChangeSlideTo(2)
    });

    it('should call transformStageSourceHolders', () => {
        expect(fsLightbox.core.sourceHoldersTransformer.transformStageSourceHolders.mock.calls.length).toEqual(1);
    });

    it('should call withTimeout', () => {
        expect(withoutTimeout).toBeCalled();
    });
});


describe('animating sources', () => {

});