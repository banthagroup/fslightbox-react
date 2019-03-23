import React from 'react';
import { mount } from 'enzyme';
import SlideButtonLeft from "../../../src/components/SlideButtons/SlideButtonLeft";
import FsLightbox from "../../../src";
import { TestFsLightboxProps } from "../../__mocks__/components/TestFsLightboxProps";

const fsLightbox = new FsLightbox(new TestFsLightboxProps().withNumberOfUrls(4));
fsLightbox.slide = 1;
const slideButtonLeft = mount(<SlideButtonLeft
    core={ fsLightbox.core }
/>);
fsLightbox.core.slideChanger.changeSlideTo = jest.fn();

it('should call changeSlide with previous slide number', () => {
    slideButtonLeft.instance().goToPreviousSlide();
    expect(fsLightbox.core.slideChanger.changeSlideTo).toBeCalledWith(4);
});
