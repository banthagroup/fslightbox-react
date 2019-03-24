import { mount } from "enzyme";
import React from "react";
import Svg from "../../../src/components/Helpers/Svg";

describe('SVG', () => {
    it('should have correct attributes from props', () => {
        const size = '1em';
        const viewBox = '0 0 20 20';
        const d = "14M.A 4F";
        const svg = mount(
            <Svg size={ size } viewBox={ viewBox } d={ d }/>
        );

        expect(svg.getDOMNode().attributes.getNamedItem('width').value).toEqual(size);
        expect(svg.getDOMNode().attributes.getNamedItem('height').value).toEqual(size);
        expect(svg.getDOMNode().attributes.getNamedItem('viewBox').value).toEqual(viewBox);
        expect(svg.contains(<path className="fslightbox-svg-path" d={ d }></path>)).toBeTruthy();
    });
});
