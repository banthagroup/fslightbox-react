import React from 'react';
import { EventsThrower } from "../../src/Helpers/EventsThrower";
import { mount } from 'enzyme';
import FsLightbox from "../../src/FsLightbox";
import { testUrls, TEST_YOUTUBE_URL } from "../schemas/testVariables";
import { EVENTS_CONSTANTS_NAMES } from "../../src/Constants/EventsConstants";
import { createRefsArrayForNumberOfSlides } from "../../src/Helpers/Arrays/createRefsArrayForNumberOfSlides";
import { createNullArrayForNumberOfSlides } from "../../src/Helpers/Arrays/createNullArrayForNumberOfSlides";
import { getYoutubeVideoIDFromURL } from "../../src/Helpers/SourceType/getYoutubeVideoIDFromURL";


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

    it('should retrieve Youtube video id', () => {
        const youtubeVideoId = 'jNQXAC9IVRw';
        expect(getYoutubeVideoIDFromURL(TEST_YOUTUBE_URL)).toEqual(youtubeVideoId);
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
