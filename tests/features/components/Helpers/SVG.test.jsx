import React from "react";
import { shallow } from "enzyme";
import Svg from "../../../../src/components/Helpers/Svg";

const viewBox = '0 0 20 20';
const size = '26px';
const d = 'M142';
const svg = shallow(<Svg
    viewBox={ viewBox }
    size={ size }
    d={ d }
/>);

describe('Svg wrapper DOM', () => {
    it('should be svg', () => {
        expect(svg.type()).toBe('svg');
    });

    it('should have width from props', () => {
        expect(svg.prop('width')).toBe(size);
    });

    it('should height from props', () => {
        expect(svg.prop('height')).toBe(size);
    });

    it('should viewBox from props', () => {
        expect(svg.prop('viewBox')).toBe(viewBox);
    });

    it('should have proper xmlns prop', () => {
        expect(svg.prop('xmlns')).toBe('http://www.w3.org/2000/svg');
    });

    it('should have one child', () => {
        expect(svg.children().length).toBe(1);
    });

    describe('path (child of svg)', () => {
        const path = svg.childAt(0);

        it('should be path', () => {
            expect(path.type()).toBe('path');
        });

        it('should have right className', () => {
            expect(path.prop('className')).toBe('fslightbox-svg-path');
        });

        it('should have d from component props', () => {
            expect(path.prop('d')).toBe(d);
        });

        it('should not have more children', () => {
            expect(path.children().length).toBe(0);
        });
    });
});