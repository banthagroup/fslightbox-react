import * as getOuterElementOfWidthGetterObject from "../../../src/core/scrollbar/getOuterElementOfWidthGetter";
import * as getInnerElementOfWidthGetterObject from "../../../src/core/scrollbar/getInnerElementOfWidthGetter";
import { getScrollbarWidth } from "../../../src/core/scrollbar/getScrollbarWidth";

const outer = {
    offsetWidth: 0,
    appendChild: () => {}
};
const inner = {
    offsetWidth: 0
};
let scrollbarWidth;


describe('calling right functions', () => {
    beforeAll(() => {
        getOuterElementOfWidthGetterObject.getOuterElementOfWidthGetter = jest.fn(() => outer);
        getInnerElementOfWidthGetterObject.getInnerElementOfWidthGetter = jest.fn(() => inner);
        document.body.appendChild = jest.fn();
        document.body.removeChild = jest.fn();
        outer.appendChild = jest.fn();
        scrollbarWidth = getScrollbarWidth();
    });

    describe('calling getOuterElementOfWidthGetter', () => {
        it('should call getOuterElementOfWidthGetter', () => {
            expect(getOuterElementOfWidthGetterObject.getOuterElementOfWidthGetter).toBeCalled();
        });
    });

    describe('calling getInnerElementOfWidthGetter', () => {
        it('should call getInnerElementOfWidthGetter', () => {
            expect(getInnerElementOfWidthGetterObject.getInnerElementOfWidthGetter).toBeCalled();
        });
    });

    describe('calling appendChild on body with outer', () => {
        it('should call appendChild with outer', () => {
            expect(document.body.appendChild).toBeCalledWith(outer);
        });
    });

    describe('calling append child on outer with inner', () => {
        it('should call appendChild with inner', () => {
            expect(outer.appendChild).toBeCalledWith(inner);
        });
    });

    describe('calling removeChild on body with outer', () => {
        it('should call removeChild', () => {
            expect(document.body.removeChild).toBeCalledWith(outer);
        });
    });
});

describe('returning right scrollbar width and managing localStorage', () => {
    const outer = document.createElement('div');
    const inner = document.createElement('div');

    describe('retrieved from divs', () => {
        let retrievedScrollbarWidth;

        beforeAll(() => {
            // clearing local storage to be sure that width comes from detecting service
            localStorage.clear();
            jest.spyOn(outer, 'offsetWidth', 'get').mockReturnValue(30);
            jest.spyOn(inner, 'offsetWidth', 'get').mockReturnValue(10);
            getOuterElementOfWidthGetterObject.getOuterElementOfWidthGetter = () => outer;
            getInnerElementOfWidthGetterObject.getInnerElementOfWidthGetter = () => inner;
            retrievedScrollbarWidth = getScrollbarWidth();
        });

        it('should return 20 scrollbarWidth', () => {
            expect(retrievedScrollbarWidth).toBe(20);
        });

        it('should set scrollbar width to local storage af fslightbox-scrollbar-width index', () => {
            expect(localStorage.getItem('fslightbox-scrollbar-width')).toBe('20');
        });
    });

    describe('retrieved from local storage', () => {
        beforeAll(() => {
            localStorage.setItem('fslightbox-scrollbar-width', '200px');
        });

        it('should be equal to value from local storage', () => {
            expect(getScrollbarWidth()).toBe('200px');
        });
    });
});
