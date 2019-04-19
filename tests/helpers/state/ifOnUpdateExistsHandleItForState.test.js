import { ifOnUpdateExistsHandleItForState } from "../../../src/helpers/state/ifOnUpdateExistsHandleItForState";

const toBeCalled = jest.fn();
const state = {
    onUpdate: () => {
        toBeCalled();
    }
};

describe('calling on update', () => {
    beforeAll(() => {
        ifOnUpdateExistsHandleItForState(state);
    });

    it('should call onUpdate', () => {
        expect(toBeCalled).toBeCalled();
    });
});

describe('it should delete onUpdate', () => {
    beforeAll(() => {
        ifOnUpdateExistsHandleItForState(state);
    });

    it('should delete on update', () => {
        expect(state.onUpdate).toBeUndefined();
    });
});