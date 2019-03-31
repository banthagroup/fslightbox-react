import React from 'react';
import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";
import { shallow } from "enzyme";
import MediaHolder from "../../../../src/components/Holders/MediaHolder";
import { CURSOR_GRABBING_CLASS_NAME } from "../../../../src/constants/CssConstants";
import { FsLightboxEnzymeMock } from "../../../__mocks__/components/fsLightboxEnzymeMock";

const fsLightboxMock = new FsLightboxMock();
const fsLightbox = fsLightboxMock.getFsLightbox();

let mediaHolder;

describe('attaching down listener', () => {
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
const fsLightboxEnzymeInstance = fsLightboxEnzymeMock.getInstance();

describe('adding and removing cursor grabbing class depending on isSwipingSlides', () => {
    const mediaHolderClassList = fsLightboxEnzyme.find('MediaHolder').getDOMNode().classList;

    beforeEach(() => {
        // setting isSwipingSlides to false before each slide because this is default behavior
        fsLightboxEnzymeInstance.setters.setState({
            isSwipingSlides: false
        })
    });

    it('should not have fslightbox cursor grabbing class', () => {
           expect(mediaHolderClassList.contains(CURSOR_GRABBING_CLASS_NAME)).toBeFalsy();
    });

    it('should add fslightbox cursor grabbing class', () => {
        fsLightboxEnzymeInstance.setters.setState({
            isSwipingSlides: true
        });
        expect(mediaHolderClassList.contains(CURSOR_GRABBING_CLASS_NAME)).toBeTruthy();
    });

    it('should remove fslightbox cursor grabbing class', () => {
        fsLightboxEnzymeInstance.setters.setState({
            isSwipingSlides: true
        });
        fsLightboxEnzymeInstance.setters.setState({
            isSwipingSlides: false
        });
        expect(mediaHolderClassList.contains(CURSOR_GRABBING_CLASS_NAME)).toBeFalsy();
    });
});