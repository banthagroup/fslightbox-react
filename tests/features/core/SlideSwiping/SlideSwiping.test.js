import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";
import { SlideSwipingDown } from "../../../../src/core/SlideSwiping/SwipingEvents/SlideSwipingDown";
import { SlideSwipingMove } from "../../../../src/core/SlideSwiping/SwipingEvents/SlideSwipingMove";
import { SlideSwipingUp } from "../../../../src/core/SlideSwiping/SwipingEvents/SlideSwipingUp";

const fsLightboxMock = new FsLightboxMock();
const fsLightbox = fsLightboxMock.getFsLightbox();

describe('adding swiping event properties (down, move, up)', () => {
    it('should be instance of SlideSwipingDown', () => {
        expect(fsLightbox.core.slideSwiping.down).toBeInstanceOf(SlideSwipingDown);
    });

    it('should be instance of SlideSwipingMove', () => {
        expect(fsLightbox.core.slideSwiping.move).toBeInstanceOf(SlideSwipingMove);
    });

    it('should be instance of SlideSwipingUp', () => {
        expect(fsLightbox.core.slideSwiping.up).toBeInstanceOf(SlideSwipingUp);
    });
});