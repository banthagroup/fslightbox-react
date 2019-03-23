import React from 'react';
import Toolbar from "../../../../src/components/Nav/Toolbar";
import FsLightbox from "../../../../src";
import { testProps } from "../../../schemas/testVariables";
import { mount } from "enzyme";

const fsLightbox = new FsLightbox(testProps);
const toolbar = mount(<Toolbar
    core={ fsLightbox.core }
    data={ fsLightbox.data }
/>);
fsLightbox.core.fullscreenToggler.turnOffFullscreen = jest.fn();
fsLightbox.core.fullscreenToggler.turnOnFullscreen = jest.fn();

it('should turn off fullscreen', () => {
    fsLightbox.data.isFullscreenOpen = true;
    toolbar.instance().fullscreen();
    expect(fsLightbox.core.fullscreenToggler.turnOffFullscreen).toBeCalled();
});

it('should turn on fullscreen', () => {
    fsLightbox.data.isFullscreenOpen = false;
    toolbar.instance().fullscreen();
    expect(fsLightbox.core.fullscreenToggler.turnOnFullscreen).toBeCalled();
});