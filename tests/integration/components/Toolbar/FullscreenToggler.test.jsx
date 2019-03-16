import React from 'react';
import Toolbar from "../../../../src/components/nav/Toolbar";
import FsLightbox from "../../../../src";
import { testProps } from "../../../schemas/testVariables";
import { mount } from "enzyme";

const fsLightbox = new FsLightbox(testProps);
const toolbar = mount(<Toolbar
    fsLightbox={ fsLightbox }
/>);
fsLightbox.fullscreenToggler.turnOffFullscreen = jest.fn();
fsLightbox.fullscreenToggler.turnOnFullscreen = jest.fn();


it('should turn off fullscreen', () => {
    fsLightbox.info.isFullscreenOpen = true;
    toolbar.instance().fullscreen();
    expect(fsLightbox.fullscreenToggler.turnOffFullscreen).toBeCalled();
});

it('should turn on fullscreen', () => {
    fsLightbox.info.isFullscreenOpen = false;
    toolbar.instance().fullscreen();
    expect(fsLightbox.fullscreenToggler.turnOnFullscreen).toBeCalled();
});