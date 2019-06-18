import React from 'react';
import { shallow } from 'enzyme/build';
import SlideButtonNext from "../../../src/components/slide-buttons/SlideButtonNext";

const nextSlideNumber = 4;
const fsLightbox = {
    core: {
        stage: {
            getNextSlideNumber: jest.fn(() => nextSlideNumber)
        },
        slideChanger: {
            changeSlideTo: jest.fn()
        }
    }
};

const slideButtonRight = shallow(<SlideButtonNext fsLightbox={ fsLightbox }/>);

describe('SlideButtonNext DOM', () => {
    it('should match snapshot', () => {
        expect(slideButtonRight).toMatchSnapshot();
    });
});

describe('after clicking SlideButtonNext calling changeSlideTo with slide number received from getNextSlideNumber', () => {
    beforeAll(() => {
        slideButtonRight.simulate('click');
    });

    it('should call getNextSlideNumber', () => {
        expect(fsLightbox.core.stage.getNextSlideNumber).toBeCalled();
    });

    it('should call changeSlideTo with next slide number', () => {
        expect(fsLightbox.core.slideChanger.changeSlideTo).toBeCalledWith(nextSlideNumber);
    });
});

