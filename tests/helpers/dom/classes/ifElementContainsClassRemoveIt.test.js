import { ifElementContainsClassRemoveIt } from "../../../../src/helpers/dom/classes/IfElementContainsClassRemoveIt";

const el = {
    current: {
        classList: {
            contains: () => {},
            remove: () => {}
        }
    }
};

const className = 'class-name';

describe('element does not contains class', () => {
    beforeAll(() => {
        el.current.classList.contains = () => false;
        el.current.classList.remove = jest.fn();
        ifElementContainsClassRemoveIt(el, className);
    });

    it('should not call remove', () => {
        expect(el.current.classList.remove).not.toBeCalled();
    });
});

describe('element has class', () => {
    beforeAll(() => {
        el.current.classList.contains = () => true;
        el.current.classList.remove = jest.fn();
        ifElementContainsClassRemoveIt(el, className);
    });

    it('should call remove with className', () => {
        expect(el.current.classList.remove).toBeCalledWith(className);
    });
});