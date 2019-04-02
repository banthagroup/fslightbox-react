import { FsLightboxMock } from "../../../../__mocks__/components/fsLightboxMock";

const fsLightboxMock = new FsLightboxMock();
const fsLightbox = fsLightboxMock.getFsLightbox();

describe('attaching swiping listeners', () => {
    beforeEach(() => {
        // due to object in facade are private we are testing attaching listeners behaviorally
        window.addEventListener = jest.fn();
        fsLightbox.core.eventsControllers.window.swiping.attachListeners();
    });

    describe('attaching window move listeners', () => {
        it('should attach mousemove listener', () => {
            expect(window.addEventListener)
                .toHaveBeenCalledWith('mousemove', fsLightbox.core.slideSwiping.move.listener);
        });

        it('should attach touchmove listener', () => {
            expect(window.addEventListener)
                .toHaveBeenCalledWith('touchmove', fsLightbox.core.slideSwiping.move.listener, { passive: true });
        });
    });

    describe('attaching window up listeners', () => {
        it('should attach mouseup listener', () => {
            expect(window.addEventListener)
                .toHaveBeenCalledWith('mouseup', fsLightbox.core.slideSwiping.up.listener);
        });

        it('should attach touchend listener', () => {
            expect(window.addEventListener)
                .toHaveBeenCalledWith('touchend', fsLightbox.core.slideSwiping.up.listener, { passive: true });
        });
    });
});


describe('removing swiping listeners', () => {
    beforeEach(() => {
        // due to object in facade are private we are testing attaching listeners behaviorally
        window.removeEventListener = jest.fn();
        fsLightbox.core.eventsControllers.window.swiping.removeListeners();
    });

    describe('removing window move listeners', () => {
        it('should remove mousemove listener', () => {
            expect(window.removeEventListener)
                .toHaveBeenCalledWith('mousemove', fsLightbox.core.slideSwiping.move.listener);
        });

        it('should remove touchmove listener', () => {
            expect(window.removeEventListener)
                .toHaveBeenCalledWith('touchmove', fsLightbox.core.slideSwiping.move.listener, { passive: true });
        });
    });

    describe('removing window up listeners', () => {
        it('should remove mouseup listener', () => {
            expect(window.removeEventListener)
                .toHaveBeenCalledWith('mouseup', fsLightbox.core.slideSwiping.up.listener);
        });

        it('should remove touchend listener', () => {
            expect(window.removeEventListener)
                .toHaveBeenCalledWith('touchend', fsLightbox.core.slideSwiping.up.listener, { passive: true });
        });
    });
});