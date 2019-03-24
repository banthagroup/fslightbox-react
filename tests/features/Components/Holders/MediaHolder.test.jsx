import React from 'react';
import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";
import { shallow } from "enzyme";
import MediaHolder from "../../../../src/components/Holders/MediaHolder";
import { CURSOR_GRABBING_CLASS_NAME } from "../../../../src/constants/CssConstants";
import { FsLightboxEnzymeMock } from "../../../__mocks__/components/fsLightboxEnzymeMock";

const fsLightboxMock = new FsLightboxMock();
const fsLightbox = fsLightboxMock.getFsLightbox();

let mediaHolder;

beforeEach(() => {
    fsLightbox.core.slideSwiping.down.listener = jest.fn();
    mediaHolder = shallow(<MediaHolder
        collections={ fsLightbox.collections }
        core={ fsLightbox.core }
        data={ fsLightbox.data }
        elements={ fsLightbox.elements }
        isSwipingSlides={ fsLightbox.state.isSwipingSlides }
        slide={ fsLightbox.state.slide }
        sourcesData={ fsLightbox.sourcesData }
    />);
});

describe('attaching down listener', () => {
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

const fsLightboxEnzymeMock = new FsLightboxEnzymeMock();
const fsLightboxEnzyme = fsLightboxEnzymeMock.getWrapper();

describe('adding and removing cursor grabbing class depending on isSwipingSlides', () => {

    // TODO: TEST IT LIKE THAT
    it('should ', () => {
        console.log(fsLightboxEnzyme.find('MediaHolder').getDOMNode().classList);
        fsLightboxEnzyme.instance().setters.setState({
            isSwipingSlides: true
        }, () => {
           console.log(fsLightboxEnzyme.find('MediaHolder').getDOMNode().classList);
        });
    });

    it('should not have fslightbox cursor grabbing class', () => {
        expect(mediaHolder.hasClass(CURSOR_GRABBING_CLASS_NAME)).toBeFalsy();
    });

    it('should add fslightbox cursor grabbing class', () => {
        mediaHolder.setProps({
            isSwipingSlides: true
        });
        expect(mediaHolder.hasClass(CURSOR_GRABBING_CLASS_NAME)).toBeTruthy();
    });

    it('should remove fslightbox cursor grabbing class', () => {
        mediaHolder.setProps({
            isSwipingSlides: true
        });
        mediaHolder.setProps({
            isSwipingSlides: false
        });
        expect(mediaHolder.hasClass(CURSOR_GRABBING_CLASS_NAME)).toBeFalsy();
    });
});