import { setUpEventsDispatcher } from "../../../src/core/events/setUpEventsDispatcher";
import { ON_OPEN } from "../../../src/constants/eventsConstants";

const fsLightbox = {
    core: {
        eventsDispatcher: {}
    },
    props: {
        onOpen: jest.fn()
    }
};

const eventsDispatcher = fsLightbox.core.eventsDispatcher;

setUpEventsDispatcher(fsLightbox);

describe('calling method form props by name', () => {
    beforeAll(() => {
        eventsDispatcher.dispatch(ON_OPEN);
    });

    it('should call onOpen', () => {
        expect(fsLightbox.props.onOpen).toBeCalled();
    });
});

describe('not throwing method when prop method does not exist', () => {
    it('should not throw error', () => {
        expect(() => {
            eventsDispatcher.dispatch('imaNotEvent');
        }).not.toThrowError();
    });
});
