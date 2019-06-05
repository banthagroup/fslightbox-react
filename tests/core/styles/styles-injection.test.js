import * as createAndAppendStylesObject from "../../../src/core/styles/createAndAppendStyles";

createAndAppendStylesObject.createAndAppendStyles = jest.fn();

require('../../../src/core/styles/styles-injection');

describe('description', () => {
    it('should call', () => {
        expect(createAndAppendStylesObject.createAndAppendStyles).toBeCalled();
    });
});
