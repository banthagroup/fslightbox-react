import { EventsDispatcher } from "../../../src/core/main-component/EventsDispatcher";
import { ON_OPEN } from "../../../src/constants/eventsConstants";

const fsLightbox = {
    props: {
        onOpen: jest.fn()
    }
};

const eventsDispatcher = new EventsDispatcher(fsLightbox);

describe('calling method form props by name', () => {
    beforeAll(() => {
        eventsDispatcher.dispatch(ON_OPEN);
    });

    it('should call onOpen', () => {
        expect(fsLightbox.props.onOpen).toBeCalled();
    });
});
