import React from 'react';
import { shallow } from 'enzyme/build';
import SlideButtonRight from "../../../src/components/slide-buttons/SlideButtonRight";

const nextSlideNumber = 4;
const fsLightbox = {
    core: {
        stageSources: {
            getNextSlideNumber: jest.fn(() => nextSlideNumber)
        },
        slideChanger: {
            changeSlideTo: jest.fn()
        }
    }
};

const slideButtonRight = shallow(<SlideButtonRight fsLightbox={ fsLightbox }/>);

describe('SlideButtonRight DOM', () => {
    it('should match snapshot', () => {
        expect(slideButtonRight).toMatchSnapshot();
    });
});

describe('after clicking SlideButtonRight calling changeSlideTo with slide number received from getNextSlideNumber', () => {
    beforeAll(() => {
        slideButtonRight.simulate('click');
    });

    it('should call getNextSlideNumber', () => {
        expect(fsLightbox.core.stageSources.getNextSlideNumber).toBeCalled();
    });

    it('should call changeSlideTo with next slide number', () => {
        expect(fsLightbox.core.slideChanger.changeSlideTo).toBeCalledWith(nextSlideNumber);
    });
});

