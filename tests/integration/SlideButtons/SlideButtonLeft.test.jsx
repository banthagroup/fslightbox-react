import React from 'react';
import { mount } from 'enzyme';
import SlideButtonLeft from "../../../src/components/slideButtons/SlideButtonLeft";
import FsLightbox from "../../../src";
import { testProps } from "../../schemas/testVariables";

const fsLightbox = new FsLightbox(testProps);
fsLightbox.slide = 1;
fsLightbox.totalSlides = 3;
const slideButtonLeft = mount(<SlideButtonLeft
    _={ fsLightbox }
/>)
fsLightbox.slideChanger.changeSlide = jest.fn();

it('should call changeSlide with previous slide number', () => {
    slideButtonLeft.instance().goToPreviousSlide();
    expect(fsLightbox.slideChanger.changeSlide).toBeCalledWith(3);
});
