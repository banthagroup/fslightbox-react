import React from 'react';
import { EventsThrower } from "../../src/utils/EventsThrower";
import { mount } from 'enzyme';
import FsLightbox from "../../src/FsLightbox";
import { testUrls, testYoutubeURL } from "../schemas/testVariables";
import { EVENTS_CONSTANTS_NAMES } from "../../src/constants/EventsConstants";
import { checkIfUserIsOnMobileDevice } from "../../src/utils/checkIfUserIsOnMobileDevice";
import { createRefsArrayForNumberOfSlides } from "../../src/utils/Arrays/createRefsArrayForNumberOfSlides";
import { createNullArrayForNumberOfSlides } from "../../src/utils/Arrays/createNullArrayForNumberOfSlides";
import { getYoutubeVideoIDFromURL } from "../../src/utils/SourceType/getYoutubeVideoIDFromURL";


describe('Helpers Utils', () => {
    it('should call Events from props', () => {
        const exampleMethods = {};

        for (let i in EVENTS_CONSTANTS_NAMES) {
            exampleMethods[i] = () => i;
        }

        const fsLightbox = mount(<FsLightbox
            isOpen={ true }
            onOpen={ exampleMethods.open }
            onClose={ exampleMethods.close }
            onInit={ exampleMethods.init }
            onShow={ exampleMethods.show }
            urls={ testUrls }
        />);


        const eventsThrower = new EventsThrower(fsLightbox.props());
        for (let i in exampleMethods) {
            expect(eventsThrower.throw(i)).toEqual(i);
        }
    });

    it('should detect if device is mobile', () => {
        expect(checkIfUserIsOnMobileDevice()).toEqual(false);
    });


    it('should retrieve Youtube video id', () => {
        const youtubeVideoId = 'jNQXAC9IVRw';
        expect(getYoutubeVideoIDFromURL(testYoutubeURL)).toEqual(youtubeVideoId);
    });
});


describe('Array creators Helpers', () => {
    it('should create array with React refs for urls', () => {
        const refsArray = createRefsArrayForNumberOfSlides(testUrls);
        refsArray.forEach((element) => {
            expect(element).toEqual(React.createRef());
        })
    });

    it('should create array with nulls for urls', () => {
        const nullArray = createNullArrayForNumberOfSlides(testUrls);
        nullArray.forEach((element) => {
            expect(element).toEqual(null);
        })
    });
});
