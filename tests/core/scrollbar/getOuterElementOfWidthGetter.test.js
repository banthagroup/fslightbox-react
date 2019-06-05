import { getOuterElementOfWidthGetter } from "../../../src/core/scrollbar/getOuterElementOfWidthGetter";

let outer;

describe('returning div with proper stylesElement', () => {
    beforeAll(() => {
        outer = getOuterElementOfWidthGetter();
    });

    it('should have visibility hidden', () => {
        expect(outer.style.visibility).toBe('hidden');
    });

    it('should have width 100px', () => {
        expect(outer.style.width).toBe('100px');
    });

    it('should have msOverflowStyle scrollbar', () => {
        expect(outer.style.msOverflowStyle).toBe('scrollbar');
    });

    it('should have overflow scroll', () => {
        expect(outer.style.overflow).toBe('scroll');
    });

    it('should be div', () => {
        expect(outer.tagName).toBe('DIV');
    });
});
