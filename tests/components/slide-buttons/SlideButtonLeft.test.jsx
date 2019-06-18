import React from 'react';
import { shallow } from 'enzyme/build';
import SlideButtonPrevious from "../../../src/components/slide-buttons/SlideButtonPrevious";

const previousSlideNumber = 4;
const fsLightbox = {
    core: {
        stage: {
            getPreviousSlideNumber: jest.fn(() => previousSlideNumber)
        },
        slideChanger: {
            changeSlideTo: jest.fn()
        }
    }
};

const slideButtonLeft = shallow(<SlideButtonPrevious fsLightbox={ fsLightbox }/>);

describe('SlideButtonPrevious DOM', () => {
    it('should match snapshot', () => {
        expect(slideButtonLeft).toMatchSnapshot();
    });
});

describe('after clicking SlideButtonPrevious calling changeSlideTo with slide number received from getPreviousSlideNumber', () => {
    beforeAll(() => {
        slideButtonLeft.simulate('click');
    });

    it('should call getPreviousSlideNumber', () => {
        expect(fsLightbox.core.stage.getPreviousSlideNumber).toBeCalled();
    });

    it('should call changeSlideTo with previous slide number', () => {
        expect(fsLightbox.core.slideChanger.changeSlideTo).toBeCalledWith(previousSlideNumber);
    });
});

