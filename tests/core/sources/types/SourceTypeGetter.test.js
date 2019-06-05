import {
    TEST_IMAGE_URL,
    TEST_YOUTUBE_URL,
    TEST_VIDEO_URL
} from "../../../__tests-helpers__/testVariables";
import { IMAGE_TYPE, INVALID_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../../../src/constants/coreConstants";
import { SourceTypeGetter } from "../../../../src/core/sources/types/SourceTypeGetter";

const fsLightbox = {
    collections: {
        xhrs: [],
    },
    injector: {
        injectDependency: () => new XMLHttpRequest(),
    }
};

/** @var { SourceTypeGetter } sourceTypeGetter */
let sourceTypeGetter;


describe('adding xhr to xhrs array', () => {
    let uniqueXhr;

    beforeEach(() => {
        uniqueXhr = new XMLHttpRequest();
        uniqueXhr.key = 'unique';
        fsLightbox.injector.injectDependency = () => uniqueXhr;
        sourceTypeGetter = new SourceTypeGetter(fsLightbox);
        sourceTypeGetter.setUrlToCheck('does not matter');
        sourceTypeGetter.getSourceType(() => {});
    });

    it('should add xhr to xhrs array', () => {
        expect(fsLightbox.collections.xhrs).toEqual([uniqueXhr]);
    });
});

describe('calling callback with right sources types', () => {
    beforeEach(() => {
        sourceTypeGetter = new SourceTypeGetter(fsLightbox);
    });

    describe('image type', () => {
        beforeEach(() => {
            sourceTypeGetter.setUrlToCheck(TEST_IMAGE_URL);
        });

        it('should call callback with image type', testDone => {
            return sourceTypeGetter.getSourceType((sourceType) => {
                expect(sourceType).toEqual(IMAGE_TYPE);
                testDone();
            });
        });
    });

    describe('video type', () => {
        beforeEach(() => {
            sourceTypeGetter.setUrlToCheck(TEST_VIDEO_URL);
        });

        it('should call callback with video type', testDone => {
            return sourceTypeGetter.getSourceType((sourceType) => {
                expect(sourceType).toEqual(VIDEO_TYPE);
                testDone();
            });
        });
    });

    describe('youtube type', () => {
        beforeEach(() => {
            sourceTypeGetter.setUrlToCheck(TEST_YOUTUBE_URL);
        });

        it('should call callback with youtube type', testDone => {
            return sourceTypeGetter.getSourceType((sourceType) => {
                expect(sourceType).toEqual(YOUTUBE_TYPE);
                testDone();
            });
        });
    });

    describe('invalid type', () => {
        beforeEach(() => {
            sourceTypeGetter.setUrlToCheck('https://cors-anywhere.herokuapp.com/');
        });

        it('should call callback with invalid type', testDone => {
            return sourceTypeGetter.getSourceType((sourceType) => {
                expect(sourceType).toEqual(INVALID_TYPE);
                testDone();
            });
        });
    });
});


