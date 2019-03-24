import { FsLightboxMock } from "../../../../__mocks__/components/fsLightboxMock";

const fsLightboxMock = new FsLightboxMock();
const fsLightbox = fsLightboxMock.getFsLightbox();
const slideSwipingDown = fsLightbox.core.slideSwiping.down;

describe('calling or not calling preventDefault', () => {
    let mockEvent;

    beforeEach(() => {
        mockEvent = {
            target: {},
            preventDefault: jest.fn(),
        }
    });

    describe('not calling preventDefault', () => {
        it('should not call prevent default due to tag name not set', () => {
            mockEvent.target.tagName = undefined;
            slideSwipingDown.listener(mockEvent);
            expect(mockEvent.preventDefault).not.toBeCalled();
        });

        it('should not call preventDefault due to tag name equals VIDEO', () => {
            mockEvent.target.tagName = 'VIDEO';
            slideSwipingDown.listener(mockEvent);
            expect(mockEvent.preventDefault).not.toBeCalled();
        });

        // we are using passive events so we cannot preventDefault it on mobile device
        it('should not call preventDefault due to user is on mobile device', () => {
            fsLightbox.data.isMobile = true;
            slideSwipingDown.listener(mockEvent);
            !expect(mockEvent.preventDefault).not.toBeCalled();
        });

        // we are using passive events so we cannot preventDefault it on mobile device
        it(`should not call preventDefault due to user is on mobile device,
             even if tag name is set and it's not VIDEO`, () => {
            fsLightbox.data.isMobile = true;
            mockEvent.target.tagName = 'IMAGE';
            slideSwipingDown.listener(mockEvent);
            expect(mockEvent.preventDefault).not.toBeCalled();
        });

        it(`should call preventDefault due to tagName equals VIDEO,
        even if user is not on mobile device`, () => {
            fsLightbox.data.isMobile = false;
            mockEvent.target.tagName = 'VIDEO';
            slideSwipingDown.listener(mockEvent);
            expect(mockEvent.preventDefault).not.toBeCalled();
        });
    });

    describe('calling prevent default', () => {
        it('should call preventDefault because tag name isnt video and user is not on mobile device', () => {
            mockEvent.target.tagName = 'IMAGE';
            slideSwipingDown.listener(mockEvent);
            expect(mockEvent.preventDefault).toBeCalled();
        });
    });
});
