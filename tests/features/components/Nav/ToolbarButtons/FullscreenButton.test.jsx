import React from 'react';
import { shallow } from 'enzyme';
import FullscreenButton from "../../../../../src/components/Nav/ToolbarButtons/FullscreenButton";

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

describe('passing correct props to ToolbarButton if fullscreen is closed', () => {
    beforeAll(() => {
        // as we are using destructuring in props if we want to change some prop
        // we need to recreate FullscreenButton
        fsLightbox.core.fullscreenToggler.turnOnFullscreen = jest.fn();
        fsLightbox.core.fullscreenToggler.turnOffFullscreen = jest.fn();
        fullscreenButton = shallow(<FullscreenButton fsLightbox={ fsLightbox }/>);
    });

    describe('passing onClick', () => {
        beforeAll(() => {
            fullscreenButton.prop('onClick')();
        });

        it('should call turn turnOnFullscreen', () => {
            expect(fsLightbox.core.fullscreenToggler.turnOnFullscreen).toBeCalled();
        });

        it('should not call turnOffFullscreen', () => {
            expect(fsLightbox.core.fullscreenToggler.turnOffFullscreen).not.toBeCalled();
        });
    });

    it('should pass viewBox', () => {
        expect(fullscreenButton.prop('viewBox')).toBe('0 0 18 18');
    });

    it('should pass size', () => {
        expect(fullscreenButton.prop('size')).toBe('20px');
    });

    it('should pass d', () => {
        expect(fullscreenButton.prop('d')).toBe('M4.5 11H3v4h4v-1.5H4.5V11zM3 7h1.5V4.5H7V3H3v4zm10.5 6.5H11V15h4v-4h-1.5v2.5zM11 3v1.5h2.5V7H15V3h-4z');
    });

    it('should pass title', () => {
        expect(fullscreenButton.prop('title')).toBe('Fullscreen');
    });
});


describe('passing correct props to ToolbarButton if fullscreen is opened', () => {
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

    describe('passing onClick', () => {
        it('should call turn turnOffFullscreen', () => {
            fullscreenButton.prop('onClick')();
            expect(fsLightbox.core.fullscreenToggler.turnOffFullscreen).toBeCalled();
        });
    });

    it('should pass viewBox', () => {
        expect(fullscreenButton.prop('viewBox')).toBe('0 0 950 1024');
    });

    it('should pass size', () => {
        expect(fullscreenButton.prop('size')).toBe('24px');
    });

    it('should pass d', () => {
        expect(fullscreenButton.prop('d')).toBe('M682 342h128v84h-212v-212h84v128zM598 810v-212h212v84h-128v128h-84zM342 342v-128h84v212h-212v-84h128zM214 682v-84h212v212h-84v-128h-128z');
    });

    it('should pass title', () => {
        expect(fullscreenButton.prop('title')).toBe('Fullscreen');
    });
});


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