import * as createAndAppendStylesObject from "../../../../src/core/styles/createAndAppendStyles";

// document is undefined so SSR is enabled styles cannot be injected
delete global.document;

createAndAppendStylesObject.createAndAppendStyles = jest.fn();

require('../../../../src/core/styles/styles-injection');

it('should not call createAndAppendStyles', () => {
    expect(createAndAppendStylesObject.createAndAppendStyles).not.toBeCalled();
});
