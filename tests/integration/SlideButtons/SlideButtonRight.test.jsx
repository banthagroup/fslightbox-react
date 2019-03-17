import React from 'react';
import { mount } from 'enzyme';
import FsLightbox from "../../../src";
import { testProps } from "../../schemas/testVariables";
import SlideButtonRight from "../../../src/components/slideButtons/SlideButtonRight";

const fsLightbox = new FsLightbox(testProps);
fsLightbox.slide = 1;
fsLightbox.totalSlides = 3;
const slideButtonRight = mount(<SlideButtonRight
    _={ fsLightbox }
/>)
fsLightbox.core.slideChanger.changeSlideTo = jest.fn();

it('should call changeSlide with previous slide number', () => {
    slideButtonRight.instance().goToNextSlide();
    expect(fsLightbox.core.slideChanger.changeSlideTo).toBeCalledWith(2);
});
