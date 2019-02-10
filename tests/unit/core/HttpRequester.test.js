import React from 'react';
import HttpRequester from "../../../src/core/HttpRequester";
import testImg from '../../__mocks__/images/test.jpg';

describe('HttpRequester', () => {

    const httpRequester = new HttpRequester();

    test('should retrieve image type from its path', () => {
        httpRequester.setUrl("../../__mocks__/images/test.jpg");
        return httpRequester.getSourceType().then(() => {
            expect(httpRequester.sourceType).toEqual('video');
        })
    });
});