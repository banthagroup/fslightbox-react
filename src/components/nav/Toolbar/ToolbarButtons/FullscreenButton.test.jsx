import React from 'react';
import { shallow } from "enzyme";
import FullscreenButton from "../../toolbar/toolbar-buttons/FullscreenButton";
import { testComponentStateForStateChainAndFsLightbox } from "../../../../../tests/__tests-helpers__/testComponentStateForStateChainAndFsLightbox";

const fsLightbox = {
    componentsStates: { toolbarButtons: { fullscreen: {} } },
    core: { fullscreenToggler: { enterFullscreen: jest.fn(), exitFullscreen: jest.fn() } }
};
const fullscreenButton = shallow(<FullscreenButton fsLightbox={ fsLightbox } />);

testComponentStateForStateChainAndFsLightbox('toolbarButtons.fullscreen', fsLightbox);

test('test toggling fullscreen', () => {
    fullscreenButton.simulate('click');
    expect(fsLightbox.core.fullscreenToggler.enterFullscreen).toBeCalled();
    expect(fsLightbox.core.fullscreenToggler.exitFullscreen).not.toBeCalled();

    fsLightbox.componentsStates.toolbarButtons.fullscreen.set(true);
    fullscreenButton.simulate('click');
    expect(fsLightbox.core.fullscreenToggler.enterFullscreen).toBeCalledTimes(1);
    expect(fsLightbox.core.fullscreenToggler.exitFullscreen).toBeCalled();
});
