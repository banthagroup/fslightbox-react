import { FsLightboxMock } from "../../../../__mocks__/components/fsLightboxMock";
import { SwipingTransitioner } from "../../../../../src/core/slide-swiping/actions/up/SwipingTransitioner";
import { TRANSFORM_TRANSITION_CLASS_NAME } from "../../../../../src/constants/css-constants";

const fsLightboxMock = new FsLightboxMock();
const fsLightbox = fsLightboxMock.getFsLightbox();
const swipingTransitioner = new SwipingTransitioner(fsLightbox);
let mockStageSourcesIndexes;

beforeEach(() => {
    fsLightboxMock.setAllSourceHoldersToDivs();
    mockStageSourcesIndexes = {
        previous: 1,
        current: 2,
        next: 3
    };
    swipingTransitioner.setStageSourcesIndexes(mockStageSourcesIndexes);
});

describe('adding transitions', () => {
    it('should add transition to current sources holder', () => {
        swipingTransitioner.addTransitionToCurrent();
        expect(fsLightbox.elements.sourceHolders[2].current.classList.contains(TRANSFORM_TRANSITION_CLASS_NAME))
            .toBeTruthy();
    });

    it('should add transition to current and previous', () => {
        swipingTransitioner.addTransitionToCurrentAndPrevious();
        expect(fsLightbox.elements.sourceHolders[2].current.classList.contains(TRANSFORM_TRANSITION_CLASS_NAME))
            .toBeTruthy();
        expect(fsLightbox.elements.sourceHolders[1].current.classList.contains(TRANSFORM_TRANSITION_CLASS_NAME))
            .toBeTruthy();
    });

    it('should add transition to current and next', () => {
        swipingTransitioner.addTransitionToCurrentAndNext();
        expect(fsLightbox.elements.sourceHolders[2].current.classList.contains(TRANSFORM_TRANSITION_CLASS_NAME))
            .toBeTruthy();
        expect(fsLightbox.elements.sourceHolders[3].current.classList.contains(TRANSFORM_TRANSITION_CLASS_NAME))
            .toBeTruthy();
    });
});

describe('removing transitions', () => {
    beforeEach(() => {
        fsLightbox.elements.sourceHolders[1].current.classList.add(TRANSFORM_TRANSITION_CLASS_NAME);
        fsLightbox.elements.sourceHolders[2].current.classList.add(TRANSFORM_TRANSITION_CLASS_NAME);
        fsLightbox.elements.sourceHolders[3].current.classList.add(TRANSFORM_TRANSITION_CLASS_NAME);
    });

    it('should remove all transition from stage sources', () => {
        swipingTransitioner.removeAllTransitionsFromStageSources();
        expect(fsLightbox.elements.sourceHolders[1].current.classList.contains(TRANSFORM_TRANSITION_CLASS_NAME))
            .toBeFalsy();
        expect(fsLightbox.elements.sourceHolders[2].current.classList.contains(TRANSFORM_TRANSITION_CLASS_NAME))
            .toBeFalsy();
        expect(fsLightbox.elements.sourceHolders[3].current.classList.contains(TRANSFORM_TRANSITION_CLASS_NAME))
            .toBeFalsy();
    });
});
