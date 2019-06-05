import * as createAndAppendStylesObject from "../../../src/core/styles/createAndAppendStyles";
import { injectStylesIfNotInDom } from "../../../src/core/styles/injectStylesIfNotInDom";
import { FSLIGHTBOX_STYLES_ID } from "../../../src/constants/dom-constants";

beforeEach(() => {
    createAndAppendStylesObject.createAndAppendStyles = jest.fn();
});

describe('there is no style elem with proper id in dom', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = '';
        injectStylesIfNotInDom();
    });

    it('should call createAndAppendStyles', () => {
        expect(createAndAppendStylesObject.createAndAppendStyles).toBeCalled();
    });
});

describe('there is a style elem with proper id in dom', () => {
    beforeEach(() => {
        const stylesElem = document.createElement('style');
        stylesElem.id = FSLIGHTBOX_STYLES_ID;
        document.documentElement.appendChild(stylesElem);
        injectStylesIfNotInDom();
    });

    it('should not call createAndAppendStyles', () => {
        expect(createAndAppendStylesObject.createAndAppendStyles).not.toBeCalled();
    });
});
