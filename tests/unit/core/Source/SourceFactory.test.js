import { SourceFactory } from "../../../../src/core/Source/SourceFactory";
import React from 'react';
import { IMAGE_TYPE, INVALID_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../../../src/constants/CoreConstants";
import Image from "../../../../src/components/Sources/ProperSources/Image";
import Video from "../../../../src/components/Sources/ProperSources/Video";
import Youtube from "../../../../src/components/Sources/ProperSources/Youtube";
import Invalid from "../../../../src/components/Sources/ProperSources/Invalid";
import FsLightbox from "../../../../src";
import { testProps } from "../../../schemas/testVariables";


describe('SourceFactory', () => {
    const fsLightboxInstance = new FsLightbox(testProps);
    fsLightboxInstance.sourcesData.sourcesTypes = [
        IMAGE_TYPE,
        VIDEO_TYPE,
        YOUTUBE_TYPE,
        INVALID_TYPE
    ];
    const sourceFactory = new SourceFactory(fsLightboxInstance);

    it('should return correct Image source', () => {
        sourceFactory.setSourceIndex(0);
        sourceFactory.setOnFirstSourceLoad(jest.fn);
        expect(sourceFactory.getSourceComponent()).toEqual(
            <Image
                fsLightbox={ fsLightboxInstance }
                i={ 0 }
                onFirstSourceLoad={ jest.fn }
            />
        );
    });

    it('should return correct Video source', () => {
        sourceFactory.setSourceIndex(1);
        sourceFactory.setOnFirstSourceLoad(jest.fn);
        expect(sourceFactory.getSourceComponent()).toEqual(
            <Video
                fsLightbox={ fsLightboxInstance }
                i={ 1 }
                onFirstSourceLoad={ jest.fn }
            />
        );
    });

    it('should return correct YouTube source', () => {
        sourceFactory.setSourceIndex(2);
        sourceFactory.setOnFirstSourceLoad(jest.fn);
        expect(sourceFactory.getSourceComponent()).toEqual(
            <Youtube
                fsLightbox={ fsLightboxInstance }
                i={ 2 }
                onFirstSourceLoad={ jest.fn }
            />
        );
    });


    it('should return correct Invalid source', () => {
        sourceFactory.setSourceIndex(3);
        sourceFactory.setOnFirstSourceLoad(jest.fn);
        expect(sourceFactory.getSourceComponent()).toEqual(
            <Invalid
                sources={ fsLightboxInstance.elements.sources }
                sourcesData={ fsLightboxInstance.sourcesData }
                i={ 3 }
            />
        );
    });
});