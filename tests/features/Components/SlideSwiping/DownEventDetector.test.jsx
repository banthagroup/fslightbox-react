import React from 'react';
import { mount } from "enzyme";
import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";
import DownEventDetector from "../../../../src/components/SlideSwiping/DownEventDetector";
import { FsLightboxEnzymeMock } from "../../../__mocks__/components/fsLightboxEnzymeMock";
import { CURSOR_GRABBING_CLASS_NAME } from "../../../../src/constants/CssConstants";

const fsLightboxMock = new FsLightboxMock();
const fsLightbox = fsLightboxMock.getFsLightbox();

let downEventDetector;

beforeEach(() => {
    fsLightbox.core.slideSwiping.down.listener = jest.fn();
    downEventDetector = mount(<DownEventDetector
        isSwipingSlides={ fsLightbox.state.isSwipingSlides }
        core={ fsLightbox.core }
    />)
});

describe('calling listener when down event occurs', () => {
    describe('mousedown event', () => {
        it('should call slide swiping down listener', () => {
            downEventDetector.simulate('mousedown');
            expect(fsLightbox.core.slideSwiping.down.listener).toBeCalled();
        });
    });

    describe('touchstart event', () => {
        it('should call slide swiping down listener', () => {
            downEventDetector.simulate('touchstart');
            expect(fsLightbox.core.slideSwiping.down.listener).toBeCalled();
        });
    });
});


const fsLightboxEnzymeMock = new FsLightboxEnzymeMock();
const fsLightboxEnzyme = fsLightboxEnzymeMock.getWrapper();
const fsLightboxEnzymeInstance = fsLightboxEnzymeMock.getInstance();

describe('adding and removing cursor grabbing class depending on isSwipingSlides', () => {
    const downEventDetectorClassList = fsLightboxEnzyme.find('DownEventDetector').getDOMNode().classList;

    beforeEach(() => {
        // setting isSwipingSlides to false before each slide because this is default behavior
        fsLightboxEnzymeInstance.setters.setState({
            isSwipingSlides: false
        })
    });

    it('should not have fslightbox cursor grabbing class', () => {
        expect(downEventDetectorClassList.contains(CURSOR_GRABBING_CLASS_NAME)).toBeFalsy();
    });

    it('should add fslightbox cursor grabbing class', () => {
        fsLightboxEnzymeInstance.setters.setState({
            isSwipingSlides: true
        });
        expect(downEventDetectorClassList.contains(CURSOR_GRABBING_CLASS_NAME)).toBeTruthy();
    });

    it('should remove fslightbox cursor grabbing class', () => {
        fsLightboxEnzymeInstance.setters.setState({
            isSwipingSlides: true
        });
        fsLightboxEnzymeInstance.setters.setState({
            isSwipingSlides: false
        });
        expect(downEventDetectorClassList.contains(CURSOR_GRABBING_CLASS_NAME)).toBeFalsy();
    });
});