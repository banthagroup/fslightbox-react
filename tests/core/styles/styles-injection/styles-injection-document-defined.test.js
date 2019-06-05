import * as createAndAppendStylesObject from "../../../../src/core/styles/createAndAppendStyles";

// document is defined so styles should be injected
global.document = {};

createAndAppendStylesObject.createAndAppendStyles = jest.fn();

require('../../../../src/core/styles/styles-injection');

it('should call createAndAppendStyles', () => {
    expect(createAndAppendStylesObject.createAndAppendStyles).toBeCalled();
});
