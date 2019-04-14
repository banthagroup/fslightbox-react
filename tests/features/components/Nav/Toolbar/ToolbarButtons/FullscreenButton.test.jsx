import React from 'react';
import { shallow } from 'enzyme';
import FullscreenButton from "../../../../../../src/components/Nav/Toolbar/ToolbarButtons/FullscreenButton";

const fsLightbox = {
    componentsStates: {
        isFullscreenOpen: {},
    },
    core: {
        fullscreenToggler: {
            turnOffFullscreen: () => {},
            turnOnFullscreen: () => {}
        }
    }
};
let fullscreenButton;


describe('isFullscreenOpen components state', () => {
    beforeAll(() => {
        fullscreenButton = shallow(<FullscreenButton fsLightbox={ fsLightbox }/>);
    });

    describe('getter returning false by default', () => {
        it('should return false', () => {
            expect(fsLightbox.componentsStates.isFullscreenOpen.get()).toBeFalsy();
        });
    });

    describe('after setting true getter should return true', () => {
        beforeAll(() => {
            fsLightbox.componentsStates.isFullscreenOpen.set(true);
        });

        it('should return true', () => {
            expect(fsLightbox.componentsStates.isFullscreenOpen.get()).toBeTruthy();
        });
    });

    describe('after setting to true and than to false getter should return false', () => {
        beforeAll(() => {
            fsLightbox.componentsStates.isFullscreenOpen.set(true);
            fsLightbox.componentsStates.isFullscreenOpen.set(false);
        });

        it('should return false', () => {
            expect(fsLightbox.componentsStates.isFullscreenOpen.get()).toBeFalsy();
        });
    });
});


describe('fullscreen is closed', () => {
    beforeAll(() => {
        // as we are using destructuring in props if we want to change some prop
        // we need to recreate FullscreenButton
        fsLightbox.core.fullscreenToggler.turnOnFullscreen = jest.fn();
        fsLightbox.core.fullscreenToggler.turnOffFullscreen = jest.fn();
        fullscreenButton = shallow(<FullscreenButton fsLightbox={ fsLightbox }/>);
    });

    describe('passing right onClick to ToolbarButton', () => {
        let toolbarButton;

        beforeAll(() => {
            toolbarButton = fullscreenButton.find('ToolbarButton');
            toolbarButton.prop('onClick')();
        });

        it('should call turn turnOnFullscreen', () => {
            expect(fsLightbox.core.fullscreenToggler.turnOnFullscreen).toBeCalled();
        });

        it('should not call turnOffFullscreen', () => {
            expect(fsLightbox.core.fullscreenToggler.turnOffFullscreen).not.toBeCalled();
        });
    });

    describe('FullscreenButton DOM', () => {
        it('should match snapshot', () => {
            expect(fullscreenButton).toMatchSnapshot();
        });
    });
});


describe('fullscreen is opened', () => {
    beforeAll(() => {
        // as we are using destructuring in props if we want to change some prop
        // we need to recreate FullscreenButton
        fsLightbox.core.fullscreenToggler.turnOnFullscreen = jest.fn(() => {
            // in turn Fullscreen we set isFullscreenOpen state to true so here we mock it
            fsLightbox.componentsStates.isFullscreenOpen.set(true);
        });
        fsLightbox.core.fullscreenToggler.turnOffFullscreen = jest.fn();
        fullscreenButton = shallow(<FullscreenButton fsLightbox={ fsLightbox }/>);
        // turning fullscreen on
        fullscreenButton.prop('onClick')();
    });

    describe('passing right onClick to ToolbarButton', () => {
        let toolbarButton;

        beforeAll(() => {
            toolbarButton = fullscreenButton.find('ToolbarButton');
            toolbarButton.prop('onClick')()
        });

        it('should call turn turnOffFullscreen', () => {
            expect(fsLightbox.core.fullscreenToggler.turnOffFullscreen).toBeCalled();
        });

        it(`should call turnOnFullscreen only 1 time (initial time to turn on fullscreen, 
            after triggering onClick for second time it should not be called)`, () => {
            expect(fsLightbox.core.fullscreenToggler.turnOnFullscreen).toBeCalledTimes(1);
        });
    });

    describe('FullscreenButton DOM', () => {
        it('should match snapshot', () => {
            expect(fullscreenButton).toMatchSnapshot();
        });
    });
});
