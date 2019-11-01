import React from 'react';
import { mountedLightbox } from "../__tests-vars__/mountedLightbox";
import { mount } from "enzyme";
import FsLightbox from "../../src/FsLightbox";
import {
    testSources,
} from "../__tests-vars__/testVariables";
import { ANIMATION_TIME } from "../../src/constants/css-constants";

it('should render each type of source without error', () => {
    expect(mountedLightbox.find('Image')).toHaveLength(1);
    expect(mountedLightbox.find('Video')).toHaveLength(1);
    expect(mountedLightbox.find('Invalid')).toHaveLength(1);
    expect(mountedLightbox.find('Youtube')).toHaveLength(0);
    expect(mountedLightbox.find('.custom-source')).toHaveLength(0);

    mountedLightbox.find('.fslightbox-slide-btn-container').at(1).simulate('click');
    expect(mountedLightbox.find('Youtube')).toHaveLength(1);
    expect(mountedLightbox.find('.custom-source')).toHaveLength(0);
    mountedLightbox.find('.fslightbox-slide-btn-container').at(1).simulate('click');
    expect(mountedLightbox.find('.custom-source')).toHaveLength(1);
});

it('should not throw error when detecting type manually on each type of source and closing soon after', () => {
    const fsLightboxWrapper = mount(<FsLightbox
        toggler={ false }
        openOnMount={ true }
        disableLocalStorage={ true }
        sources={ testSources }
    />);
    jest.useFakeTimers();
    fsLightboxWrapper.find('CloseButton').simulate('click');
    jest.runTimersToTime(ANIMATION_TIME - 30);
    fsLightboxWrapper.update();
    expect(fsLightboxWrapper.children().getElements()).toEqual([]);
});
