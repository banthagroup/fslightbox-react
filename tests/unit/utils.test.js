import React from 'react';
import { JSXElement } from "../../src/utils/JSXElement";
import { EventsThrower, eventsThrower } from "../../src/utils/EventsThrower";
import { mount } from 'enzyme';
import FsLightbox from "../../src/FsLightbox";
import { testData, testUrls } from "../schemas/testSchemas";
import { eventsPropsNames } from "../../src/constants/eventsPropsNames";
import { checkIfUserIsOnMobileDevice } from "../../src/utils/checkIfUserIsOnMobileDevice";
import { StageSourcesIndexes } from "../../src/utils/StageSourcesIndexes";

it('should create jsx element with classes', () => {
    const classArray = [
        'first-class',
        'second-class'
    ];
    const TestTag = 'button';
    const TestJSX = (<TestTag className={ classArray.join(' ') }></TestTag>);

    const jsxElement = new JSXElement('button')
        .addClassesFromArray(classArray)
        .getElement();

    expect(jsxElement).toEqual(TestJSX);
});


it('should call events from props', () => {
    const exampleMethods = {};

    for (let i in eventsPropsNames) {
        exampleMethods[i] = () => i;
    }

    const fsLightbox = mount(<FsLightbox
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

    it('should return previous slide array index', () => {
        expect(stageSourcesIndexes.previousSlideIndex()).toEqual(testData.slide - 2);
        testData.slide = 1;
        expect(stageSourcesIndexes.previousSlideIndex()).toEqual(testData.totalSlides - 1)
    });

    it('should return next slide array index', () => {
        expect(stageSourcesIndexes.nextSlideIndex()).toEqual(testData.slide);
        testData.slide = testData.totalSlides;
        expect(stageSourcesIndexes.nextSlideIndex()).toEqual(0);
    });

    it('should return object width previous, current and next slide array index', () => {
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
    })

});
