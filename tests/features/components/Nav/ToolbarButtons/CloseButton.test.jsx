import React from 'react';
import { shallow } from 'enzyme';
import ToolbarButton from "../../../../../src/components/Nav/ToolbarButton";
import CloseButton from "../../../../../src/components/Nav/ToolbarButtons/CloseButton";

const fsLightbox = {
    core: {
        closeOpenLightbox: {
            closeLightbox: jest.fn()
        }
    }
};
const closeButton = shallow(<CloseButton
    fsLightbox={ fsLightbox }
/>);
const toolbarButton = closeButton.find('ToolbarButton');


describe('ToolbarButton, testing if it is in CloseButton and if contains right props', () => {
    it('should have ToolbarButton', () => {
        expect(toolbarButton.length).toEqual(1);
    });

    it('should have right onClick function', () => {
        expect(toolbarButton.prop('onClick')).toEqual(fsLightbox.core.closeOpenLightbox.closeLightbox);
    });

    it('should have right viewBox', () => {
        expect(toolbarButton.prop('viewBox')).toEqual('0 0 24 24');
    });

    it('should have right size', () => {
        expect(toolbarButton.prop('size')).toEqual('20px');
    });

    it('should have right d', () => {
        expect(toolbarButton.prop('d')).toEqual('M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z');
    });

    it('should have right title', () => {
        expect(toolbarButton.prop('title')).toEqual('Close');
    });

    it('should not have more child (in this component)', () => {
        expect(toolbarButton.children().length).toBe(0);
    });
});

describe('closing lightbox on clicking close button', () => {
    beforeAll(() => {
        toolbarButton.simulate('click');
    });

    it('should call closeLightbox', () => {
        expect(fsLightbox.core.closeOpenLightbox.closeLightbox).toBeCalled();
    });
});