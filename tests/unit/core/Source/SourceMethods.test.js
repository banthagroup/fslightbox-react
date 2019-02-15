import React from 'react';
import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";
import { mount } from "enzyme";
import Source from "../../../../src/components/sources/Source";
import { SourceTransformer } from "../../../../src/core/Transforms/SourceTransformer";

describe('Source component methods', () => {
    const mock = new FsLightboxMock();
    const fsLightboxInstance = mock.getInstance();

    describe('sourceWasCreated', () => {
        /**
         * @type {Source}
         */
        const sourceInstance = mount(<Source
            _={ fsLightboxInstance }
            i={ 0 }
        />).instance();
        sourceInstance.forceUpdate = jest.fn();
        sourceInstance.sourceWasCreated();

        it('should call forceUpdate', () => {
            expect(sourceInstance.forceUpdate).toBeCalled();
        });

        it('should create sourceTransformer', () => {
            expect(fsLightboxInstance.sourceTransformers[0])
                .toBeInstanceOf(SourceTransformer);
        });
    });
});