import * as createAndAppendStylesObject from "./createAndAppendStyles";
import { injectStylesIfNotInDom } from "./injectStylesIfNotInDom";
import { FSLIGHTBOX_STYLES_ID } from "../../constants/dom-constants";

beforeEach(() => {
    createAndAppendStylesObject.createAndAppendStyles = jest.fn();
});

test('there is no style elem with proper id in dom', () => {
    document.documentElement.innerHTML = '';
    injectStylesIfNotInDom();

    expect(createAndAppendStylesObject.createAndAppendStyles).toBeCalled();
});

test('there is a style elem with proper id in dom', () => {
    const stylesElem = document.createElement('style');
    stylesElem.id = FSLIGHTBOX_STYLES_ID;
    document.documentElement.appendChild(stylesElem);
    injectStylesIfNotInDom();

    expect(createAndAppendStylesObject.createAndAppendStyles).not.toBeCalled();
});
