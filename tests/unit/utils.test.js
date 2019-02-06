import React from 'react';
import { DOMElement } from "../../src/utils/DOMElement";
import { EventsThrower, eventsThrower } from "../../src/utils/EventsThrower";
import { mount } from 'enzyme';
import FsLightbox from "../../src";
import { testUrls } from "../schemas/testSchemas";
import { eventsPropsNames } from "../../src/constants/eventsPropsNames";
import { checkIfUserIsOnMobileDevice } from "../../src/utils/checkIfUserIsOnMobileDevice";

it('should create dom element with classes', () => {
    const classList = [
        'first-class',
        'second-class'
    ];
    let domElement = new DOMElement('button');
    domElement.addClassesFromArray(classList);
    domElement = domElement.getElement();
    expect(domElement.nodeType).toBeTruthy();
    classList.forEach((className) => {
        expect(domElement.classList.contains(className)).toBeTruthy();
    });
});


it('should call events from props', () => {
    const exampleMethods = {};

    for(let i in eventsPropsNames) {
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
