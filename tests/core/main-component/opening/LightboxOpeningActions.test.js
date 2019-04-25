import { LightboxOpeningActions } from "../../../../src/core/main-component/opening/LightboxOpeningActions";

let fsLightboxState = {
    isOpen: false
};
const setState = jest.fn((state, callback) => {
    callback();
    fsLightboxState = state;
});
const withoutTimeout = jest.fn();
const fsLightbox = {
    setters: {
        setState: setState,
    },
    core: {
        globalResizingController: {
            runAllResizingActions: jest.fn()
        },
        eventsControllers: {
            window: {
                resize: {
                    attachListener: jest.fn()
                },
                swiping: {
                    attachListeners: jest.fn()
                }
            }
        },
        sourceHoldersTransformer: {
            transformStageSourceHolders: jest.fn(() => ({
                withoutTimeout: withoutTimeout
            }))
        }
    }
};

const lightboxOpeningActions = new LightboxOpeningActions(fsLightbox);

describe('calling methods', () => {
    beforeAll(() => {
        lightboxOpeningActions.runActions();
    });

    describe('setting isOpen state to true', () => {
        it('should call setState', () => {
            expect(fsLightbox.setters.setState).toBeCalled();
        });

        it('should set fsLightboxState true (mocked here state)', () => {
            expect(fsLightboxState).toEqual({isOpen: true});
        });
    });

    describe('attaching window resize listener', () => {
        it('should call attachListener', () => {
            expect(fsLightbox.core.eventsControllers.window.resize.attachListener).toBeCalled();
        });
    });

    describe('attaching swiping listeners', () => {
        it('should call attachListeners', () => {
            expect(fsLightbox.core.eventsControllers.window.swiping.attachListeners).toBeCalled();
        });
    });

    describe('transforming stage source holders without timeout', () => {
        it('should call transformStageSourceHolders', () => {
            expect(fsLightbox.core.sourceHoldersTransformer.transformStageSourceHolders).toBeCalled();
        });

        it('should call withoutTimeout', () => {
            expect(withoutTimeout).toBeCalled();
        });
    });
});