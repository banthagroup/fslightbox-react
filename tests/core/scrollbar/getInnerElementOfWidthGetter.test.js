import { getInnerElementOfWidthGetter } from "../../../src/core/scrollbar/getInnerElementOfWidthGetter";

let inner;

describe('returning div element with right styles', () => {
    beforeAll(() => {
        inner = getInnerElementOfWidthGetter();
    });

    it('should have width style set to 100%', () => {
        expect(inner.style.width).toBe('100%');
    });

    it('should be div', () => {
        expect(inner.tagName).toBe('DIV');
    });
});