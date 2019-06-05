import { getDocumentElementClassList } from "../../../../src/helpers/dom/document/getDocumentElementClassList";

beforeAll(() => {
    // setting example value as class list
    Object.defineProperty(document.documentElement, 'classList', {
        value: 'document-element-class-list'
    });
});

it('should return document element class list', () => {
    expect(getDocumentElementClassList()).toBe('document-element-class-list');
});
