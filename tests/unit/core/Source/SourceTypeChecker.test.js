import React from 'react';
import SourceTypeChecker from "../../../../src/core/Source/SourceTypeChecker";
import { testImageURL, testVideoURL, testYoutubeURL } from "../../../schemas/testVariables";
import { IMAGE_TYPE, INVALID_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../../../src/constants/CoreConstants";
import { getTypeFromResponseContentType } from "../../../../src/utils/SourceType/getTypeFromResponseContentType";

describe('SourceTypeChecker', () => {
    /** @type SourceTypeChecker */
    let sourceTypeChecker;
    beforeEach(() => {
        sourceTypeChecker = new SourceTypeChecker();
    });

    describe('getSourceType', () => {
        it('should call checking type with XHR', () => {
            sourceTypeChecker.setUrlToCheck(testImageURL);
            sourceTypeChecker._setUpXhr = jest.fn();
            sourceTypeChecker.getSourceType();
            expect(sourceTypeChecker._setUpXhr).toBeCalled();
        });

        it('should detect youtube type and not set up XHR', () => {
            sourceTypeChecker.setUrlToCheck(testYoutubeURL);
            sourceTypeChecker._setUpXhr = jest.fn();
            sourceTypeChecker.getSourceType();
            expect(sourceTypeChecker._setUpXhr).not.toBeCalled();
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
            sourceTypeChecker.setUrlToCheck('asdfkasdlfhasifahsdfasdkf');
            return sourceTypeChecker.getSourceType().then(() => {
                expect(sourceTypeChecker.sourceType).toEqual(INVALID_TYPE);
            });
        });
    });


    describe('Error catching', () => {
        it('should return invalid type when xhr received bad status', () => {
            sourceTypeChecker._resolve = jest.fn();
            sourceTypeChecker._xhr = {
                readyState: 2,
                status: 500,
                abort: jest.fn()
            };
            sourceTypeChecker._onRequestStateChange();
            expect(sourceTypeChecker.sourceType).toEqual(INVALID_TYPE);
        });

        it('should call invalid type when not correct image type found from response', () => {
            sourceTypeChecker._invalidType = jest.fn();
            sourceTypeChecker._callCorrectActionsDependingOnSourceType('pdf');
            expect(sourceTypeChecker._invalidType).toBeCalled();
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