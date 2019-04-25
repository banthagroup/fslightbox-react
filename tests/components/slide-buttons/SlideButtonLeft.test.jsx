import React from 'react';
import { shallow } from 'enzyme/build';
import SlideButtonLeft from "../../../src/components/slide-buttons/SlideButtonLeft";

const previousSlideNumber = 4;
const fsLightbox = {
    core: {
        stageSources: {
            getPreviousSlideNumber: jest.fn(() => previousSlideNumber)
        },
        slideChanger: {
            changeSlideTo: jest.fn()
        }
    }
};

const slideButtonLeft = shallow(<SlideButtonLeft fsLightbox={ fsLightbox }/>);

describe('SlideButtonLeft DOM', () => {
    it('should match snapshot', () => {
        expect(slideButtonLeft).toMatchSnapshot();
    });
});

describe('after clicking SlideButtonLeft calling changeSlideTo with slide number received from getPreviousSlideNumber', () => {
    beforeAll(() => {
        slideButtonLeft.simulate('click');
    });

    it('should call getPreviousSlideNumber', () => {
        expect(fsLightbox.core.stageSources.getPreviousSlideNumber).toBeCalled();
    });

    it('should call changeSlideTo with previous slide number', () => {
        expect(fsLightbox.core.slideChanger.changeSlideTo).toBeCalledWith(previousSlideNumber);
    });
});

