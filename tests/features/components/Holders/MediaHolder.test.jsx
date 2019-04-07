import React from 'react';
import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";
import { shallow } from "enzyme";
import MediaHolder from "../../../../src/components/Holders/MediaHolder";
import { CURSOR_GRABBING_CLASS_NAME } from "../../../../src/constants/CssConstants";

const fsLightboxMock = new FsLightboxMock();
const fsLightbox = fsLightboxMock.getFsLightbox();

let mediaHolder;

describe('attaching down listener', () => {
    beforeEach(() => {
        fsLightbox.core.slideSwiping.down.listener = jest.fn();
        mediaHolder = shallow(<MediaHolder fsLightbox={ fsLightbox }/>);
    });

    describe('mouse down event', () => {
        it('should call slide swiping down listener', () => {
            mediaHolder.simulate('mousedown');
            expect(fsLightbox.core.slideSwiping.down.listener).toBeCalled();
        });
    });

    describe('touch start event', () => {
        it('should call slide swiping down listener', () => {
            mediaHolder.simulate('touchstart');
            expect(fsLightbox.core.slideSwiping.down.listener).toBeCalled();
        });
    });
});


describe('adding and removing cursor grabbing class depending on isSwipingSlides', () => {
    beforeEach(() => {
        mediaHolder = shallow(<MediaHolder fsLightbox={ fsLightbox }/>);
        // setting isSwipingSlides to false before each slide because this is default behavior
        fsLightbox.state.isSwipingSlides = false;
    });

    it('should not have fslightbox cursor grabbing class', () => {
        expect(mediaHolder.hasClass(CURSOR_GRABBING_CLASS_NAME)).toBeFalsy();
    });

    it('should add fslightbox cursor grabbing class', () => {
        fsLightbox.state.isSwipingSlides = true;
        mediaHolder.instance().forceUpdate();
        expect(mediaHolder.hasClass(CURSOR_GRABBING_CLASS_NAME)).toBeTruthy();
    });

    it('should remove fslightbox cursor grabbing class', () => {
        fsLightbox.state.isSwipingSlides = true;
        mediaHolder.instance().forceUpdate();
        fsLightbox.state.isSwipingSlides = false;
        mediaHolder.instance().forceUpdate();
        expect(mediaHolder.hasClass(CURSOR_GRABBING_CLASS_NAME)).toBeFalsy();
    });
});