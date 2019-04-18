import React from 'react';
import { shallow } from 'enzyme';
import CloseButton from "../../../../../../src/components/nav/toolbar/toolbar-buttons/CloseButton";

const fsLightbox = {
    core: {
        lightboxCloser: {
            closeLightbox: jest.fn()
        }
    }
};
const closeButton = shallow(<CloseButton fsLightbox={ fsLightbox }/>);

describe('CloseButton DOM', () => {
    it('should match snapshot', () => {
        expect(closeButton).toMatchSnapshot();
    });
});

describe('closing lightbox on clicking close button', () => {
    beforeAll(() => {
        closeButton.simulate('click');
    });

    it('should call closeLightbox', () => {
        expect(fsLightbox.core.lightboxCloser.closeLightbox).toBeCalled();
    });
});