import React from 'react';
import SourceTypeChecker from "../../../../src/core/Source/SourceTypeChecker";
import { testImageURL, testVideoURL, testYoutubeURL } from "../../../schemas/testVariables";
import { IMAGE_TYPE, INVALID_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../../../src/constants/CoreConstants";
import { getTypeFromResponseContentType } from "../../../../src/utils/SourceType/getTypeFromResponseContentType";

describe('SourceTypeChecker', () => {
    /**
     * @type SourceTypeChecker
     */
    let sourceTypeChecker;
    beforeEach(() => {
        sourceTypeChecker = new SourceTypeChecker();
    });

    describe('getSourceType', () => {
        it('should call checking type with XHR', () => {
            sourceTypeChecker.setUrlToCheck(testImageURL);
            sourceTypeChecker.setXHR = jest.fn();
            sourceTypeChecker.getSourceType();
            expect(sourceTypeChecker.setXHR).toBeCalled();
        });

        it('should detect youtube type and not set up XHR', () => {
            sourceTypeChecker.setUrlToCheck(testYoutubeURL);
            sourceTypeChecker.setXHR = jest.fn();
            sourceTypeChecker.getSourceType();
            expect(sourceTypeChecker.setXHR).not.toBeCalled();
        });
    });


    describe('returning correct source type', () => {
        it('should retrieve image type from its path', () => {
            sourceTypeChecker.setUrlToCheck(testImageURL);
            return sourceTypeChecker.getSourceType().then(() => {
                expect(sourceTypeChecker.sourceType).toEqual(IMAGE_TYPE);
            });
        });

        it('should return youtube type', () => {
            sourceTypeChecker.setUrlToCheck(testYoutubeURL);
            return sourceTypeChecker.getSourceType().then(() => {
                expect(sourceTypeChecker.sourceType).toEqual(YOUTUBE_TYPE);
            });
        });

        it('should return video type', () => {
            sourceTypeChecker.setUrlToCheck(testVideoURL);
            return sourceTypeChecker.getSourceType().then(() => {
                expect(sourceTypeChecker.sourceType).toEqual(VIDEO_TYPE);
            });
        });

        it('should return invalid type', () => {
            sourceTypeChecker.setUrlToCheck('asdfkasdlfhasdifahsdfasdkf');
            return sourceTypeChecker.getSourceType().then(() => {
                expect(sourceTypeChecker.sourceType).toEqual(INVALID_TYPE);
            });
        });
    });


    describe('external utils', () => {
        describe('getTypeFromResponseContentType', () => {
            it('should return image from content type', () => {
                expect(getTypeFromResponseContentType('image/jpeg'))
                    .toEqual('image');
            });

            it('should return video from content type', () => {
                expect(getTypeFromResponseContentType('video/mp4'))
                    .toEqual('video');
            });
        });
    });
});