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

describe('returning right scrollbar width', () => {
    beforeAll(() => {
        outer.offsetWidth = 100;
        inner.offsetWidth = 40;
        getOuterElementOfWidthGetterObject.getOuterElementOfWidthGetter = jest.fn(() => outer);
        getInnerElementOfWidthGetterObject.getInnerElementOfWidthGetter = jest.fn(() => inner);
        document.body.appendChild = jest.fn();
        document.body.removeChild = jest.fn();
        outer.appendChild = jest.fn();
        scrollbarWidth = getScrollbarWidth();
    });

    it('should return 60 (outer.offsetWidth - inner.offsetWidth)', () => {
        expect(scrollbarWidth).toBe(60);
    });
});
