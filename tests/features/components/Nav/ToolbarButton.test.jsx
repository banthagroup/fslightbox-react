import React from 'react';
import { shallow } from 'enzyme';
import ToolbarButton from "../../../../src/components/Nav/ToolbarButton";

const mockOnClick = jest.fn();
const viewBox = '0 0 20 20';
const size = '26px';
const d = 'M1425';
const title = 'title';

const toolbarButton = shallow(<ToolbarButton
    onClick={ mockOnClick }
    viewBox={ viewBox }
    size={ size }
    d={ d }
    title={ title }
/>);


describe('ToolbarButton DOM', () => {
    it('should have right className', () => {
        expect(toolbarButton.prop('className')).toBe('fslightbox-toolbar-button fslightbox-flex-centered');
    });

    it('should have right title from props', () => {
        expect(toolbarButton.prop('title')).toBe(title);
    });

    it('should have one child', () => {
        expect(toolbarButton.children().length).toBe(1);
    });

    describe('Svg component (the only child of ToolbarButton)', () => {
        const svg = toolbarButton.find('Svg');

        it('should be svg', () => {
            expect(svg.length).toBe(1);
        });

        it('should have right viewBox from props', () => {
            expect(svg.prop('viewBox')).toBe(viewBox);
        });

        it('should have right size from props', () => {
            expect(svg.prop('size')).toBe(size);
        });

        it('should have right d from props', () => {
            expect(svg.prop('d')).toBe(d);
        });

        it('should not have more children(in this component)', () => {
            expect(svg.children().length).toBe(0);
        });
    });
});

describe('calling onClick received from props', () => {
    beforeEach(() => {
        toolbarButton.simulate('click');
    });

    it('should call ', () => {
        expect(mockOnClick).toBeCalled();
    });
});