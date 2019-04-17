import React from 'react';
import { EventsThrower } from "../../src/helpers/EventsThrower";
import { mount } from 'enzyme';
import FsLightbox from "../../src/FsLightbox";
import { testUrls, TEST_YOUTUBE_URL } from "../schemas/testVariables";
import { EVENTS_CONSTANTS_NAMES } from "../../src/constants/eventsConstants";
import { createRefsArrayForNumberOfSlides } from "../../src/helpers/arrays/createRefsArrayForNumberOfSlides";
import { createNullArrayForNumberOfSlides } from "../../src/helpers/arrays/createNullArrayForNumberOfSlides";
import { getYoutubeVideoIDFromURL } from "../../src/helpers/source-type/getYoutubeVideoIDFromURL";


describe('helpers Utils', () => {
    it('should call events from props', () => {
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


describe('Array creators helpers', () => {
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
