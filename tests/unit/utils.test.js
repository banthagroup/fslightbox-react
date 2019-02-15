import React from 'react';
import { EventsThrower, eventsThrower } from "../../src/utils/EventsThrower";
import { mount } from 'enzyme';
import FsLightbox from "../../src/FsLightbox";
import { testUrls, testYoutubeURL } from "../schemas/testVariables";
import { EVENTS_CONSTANTS_NAMES } from "../../src/constants/EventsConstants";
import { checkIfUserIsOnMobileDevice } from "../../src/utils/checkIfUserIsOnMobileDevice";
import { StageSourcesIndexes } from "../../src/utils/StageSourcesIndexes";
import { createRefsArrayForNumberOfUrls } from "../../src/utils/Arrays/createRefsArrayForNumberOfUrls";
import { createNullArrayForNumberOfUrls } from "../../src/utils/Arrays/createNullArrayForNumberOfUrls";
import { getYoutubeVideoIDFromURL } from "../../src/utils/SourceType/getYoutubeVideoIDFromURL";
import { createSourceComponentCreatorsArray } from "../../src/utils/Arrays/createSourceComponentCreatorsArray";
import { FsLightboxMock } from "../__mocks__/components/fsLightboxMock";
import { SourceComponentsCreator } from "../../src/core/Source/SourceComponentsCreator";


describe('Helpers Utils', () => {
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

    it('should detect if device is mobile', () => {
        expect(checkIfUserIsOnMobileDevice()).toEqual(false);
    });


    it('should retrieve Youtube video id', () => {
        const youtubeVideoId = 'jNQXAC9IVRw';
        expect(getYoutubeVideoIDFromURL(testYoutubeURL)).toEqual(youtubeVideoId);
    });
});


describe('Array creators helpers', () => {
    it('should create array with React refs for urls', () => {
        const refsArray = createRefsArrayForNumberOfUrls(testUrls);
        refsArray.forEach((element) => {
            expect(element).toEqual(React.createRef());
        })
    });

    it('should create array with nulls for urls', () => {
        const nullArray = createNullArrayForNumberOfUrls(testUrls);
        nullArray.forEach((element) => {
            expect(element).toEqual(null);
        })
    });

    it('should create array with SourceComponentCreators', () => {
        const mock = new FsLightboxMock();
        const fsLightboxInstance = mock.getInstance();
        fsLightboxInstance.totalSlides = 3;
        const sourceComponentCreators = createSourceComponentCreatorsArray(fsLightboxInstance);
        sourceComponentCreators.forEach((componentCreator, i) => {
            expect(componentCreator).toBeInstanceOf(SourceComponentsCreator);
            expect(componentCreator.i).toEqual(i);
        });
    });
});


describe('StageSourcesIndexes', () => {
    let stageSourcesIndexes;
    let testData;
    beforeEach(() => {
        testData = {
            slide: 2,
            totalSlides: 4
        };
        stageSourcesIndexes = new StageSourcesIndexes(testData);
    });

    it('should return previous slide array i', () => {
        expect(stageSourcesIndexes.previousSlideIndex()).toEqual(testData.slide - 2);
        testData.slide = 1;
        expect(stageSourcesIndexes.previousSlideIndex()).toEqual(testData.totalSlides - 1)
    });

    it('should return next slide array i', () => {
        expect(stageSourcesIndexes.nextSlideIndex()).toEqual(testData.slide);
        testData.slide = testData.totalSlides;
        expect(stageSourcesIndexes.nextSlideIndex()).toEqual(0);
    });

    it('should return object width previous, current and next slide array i', () => {
        expect(stageSourcesIndexes.allStageIndexes()).toEqual({
            previous: testData.slide - 2,
            current: testData.slide - 1,
            next: testData.slide
        });

        testData.slide = 1;
        expect(stageSourcesIndexes.allStageIndexes()).toEqual({
            previous: testData.totalSlides - 1,
            current: testData.slide - 1,
            next: testData.slide
        });

        testData.slide = testData.totalSlides;
        expect(stageSourcesIndexes.allStageIndexes()).toEqual({
            previous: testData.slide - 2,
            current: testData.slide - 1,
            next: 0
        });
    });
});
