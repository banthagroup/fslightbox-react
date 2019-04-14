import React from 'react';
import { createRefsArrayForNumberOfSlides } from "../../../../src/Helpers/Arrays/createRefsArrayForNumberOfSlides";
import { IMAGE_TYPE } from "../../../../src/Constants/CoreConstants";
import { TEST_IMAGE_URL } from "../../../schemas/testVariables";
import { mount } from "enzyme";
import SourceHolder from "../../../../src/Components/Sources/SourceHolder";
import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";

let sourceCreator = {};
let sourceTypeChecker = {};
let fsLightbox = {
    data: {
        urls: []
    },
    sourcesData: {
        sourcesTypes: [],
        sourcesToCreateOnConstruct: [],
    },
    elements: {
        sourceHolders: [],
    },
    core: {
        sourceHoldersTransformer: {
            transformStageSourceHolderAtIndex: () => {}
        },
        stageSources: {
            isSourceInStage: () => {}
        }
    },
    injector: {
        source: {
            getSourceCreator: () => ({}),
            getSourceTypeGetter: () => {}
        }
    }
};
let sourceHolder;

describe('SourceHolder ref (should be referenced to sourceHolders array in fsLightbox object)', () => {
    let completeFsLightbox;

    beforeAll(() => {
        const fsLightboxMock = new FsLightboxMock();
        completeFsLightbox = fsLightboxMock.getFsLightbox();
        // we don't want to init request
        completeFsLightbox.sourcesData.sourcesTypes = [IMAGE_TYPE];
        sourceHolder = mount(<SourceHolder fsLightbox={ completeFsLightbox } index={ 0 }/>);
    });

    it('should assign source holder to ref in fsLightbox object', () => {
        expect(completeFsLightbox.elements.sourceHolders[0].current).toEqual(sourceHolder.getDOMNode());
    });
});


describe('initRequest', () => {
    let sourceTypeChecker;

    beforeAll(() => {
        // source type isn't detected so detecting should be initialized on construct
        fsLightbox.sourcesData.sourcesTypes = [];
        sourceTypeChecker = {
            setUrlToCheck: jest.fn(),
            getSourceType: jest.fn(() => new Promise((resolve) => {
                resolve(IMAGE_TYPE)
            }))
        };
        fsLightbox.injector.source.getSourceTypeGetter = jest.fn(() => sourceTypeChecker)
    });

    it('should ', () => {

    });
});