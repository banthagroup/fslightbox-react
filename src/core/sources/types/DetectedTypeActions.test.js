import React from 'react'
import { IMAGE_TYPE, INVALID_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../../constants/core-constants";
import Image from "../../../components/sources/proper-sources/Image";
import Video from "../../../components/sources/proper-sources/Video";
import Youtube from "../../../components/sources/proper-sources/Youtube";
import Invalid from "../../../components/sources/proper-sources/Invalid";
import { SourceLoadHandler } from "../SourceLoadHandler";
import { DetectedTypeActions } from "./DetectedTypeActions";

const fsLightbox = {
    getState: () => fsLightboxState,
    componentsStates: {
        sourcesHoldersUpdatersCollection: [],
    },
    elements: {
        sourcesComponents: []
    },
    collections: {
        sourcesLoadsHandlers: []
    },
    injector: {
        resolve: (constructorDependency) => {
            if (constructorDependency === SourceLoadHandler) {
                return sourceLoadHandler;
            }
        }
    }
};

const fsLightboxState = {
    isOpen: false
};

const sourcesHoldersUpdatersStateCollection = fsLightbox.componentsStates.sourcesHoldersUpdatersCollection;

const sourceLoadHandler = {
    setIndex: () => {},
    setUpLoadForImage: () => {},
    setUpLoadForVideo: () => {},
    setUpLoadForYoutube: () => {}
};
let creatingSourcesActions;

const createNewCreatingSourcesActionsAndCallRunActionsWith = (type, index) => {
    creatingSourcesActions = new DetectedTypeActions(fsLightbox);
    creatingSourcesActions.runActionsForSourceTypeAndIndex(type, index);
};

describe('runActionsForSourceTypeAndIndex', () => {
    describe('run non invalid source actions', () => {
        test('source is invalid', () => {
            fsLightbox.collections.sourcesLoadsHandlers = [];
            sourceLoadHandler.setIndex = jest.fn();
            createNewCreatingSourcesActionsAndCallRunActionsWith(INVALID_TYPE, 0);

            expect(fsLightbox.collections.sourcesLoadsHandlers).toEqual([]);
            expect(sourceLoadHandler.setIndex).not.toBeCalled();
        });

        test('source is not invalid', () => {
            fsLightbox.collections.sourcesLoadsHandlers = [];
            sourceLoadHandler.setIndex = jest.fn();
            createNewCreatingSourcesActionsAndCallRunActionsWith(IMAGE_TYPE, 3);

            expect(fsLightbox.collections.sourcesLoadsHandlers).toEqual([
                undefined,
                undefined,
                undefined,
                sourceLoadHandler
            ]);
            expect(sourceLoadHandler.setIndex).toBeCalledWith(3);
        });
    });


    describe('runTypeSpecificActions', () => {
        beforeEach(() => {
            sourceLoadHandler.setUpLoadForImage = jest.fn();
            sourceLoadHandler.setUpLoadForVideo = jest.fn();
            sourceLoadHandler.setUpLoadForYoutube = jest.fn();
        });

        test('image type', () => {
            createNewCreatingSourcesActionsAndCallRunActionsWith(IMAGE_TYPE, 0);
            expect(sourceLoadHandler.setUpLoadForImage).toBeCalled();
            expect(sourceLoadHandler.setUpLoadForVideo).not.toBeCalled();
            expect(sourceLoadHandler.setUpLoadForYoutube).not.toBeCalled();
        });

        test('video type', () => {
            createNewCreatingSourcesActionsAndCallRunActionsWith(VIDEO_TYPE, 1);
            expect(sourceLoadHandler.setUpLoadForImage).not.toBeCalled();
            expect(sourceLoadHandler.setUpLoadForVideo).toBeCalled();
            expect(sourceLoadHandler.setUpLoadForYoutube).not.toBeCalled();
        });

        test('youtube type', () => {
            createNewCreatingSourcesActionsAndCallRunActionsWith(YOUTUBE_TYPE, 2);
            expect(sourceLoadHandler.setUpLoadForImage).not.toBeCalled();
            expect(sourceLoadHandler.setUpLoadForVideo).not.toBeCalled();
            expect(sourceLoadHandler.setUpLoadForYoutube).toBeCalled();
        });
    });


    describe('building source component', () => {
        test('image type', () => {
            createNewCreatingSourcesActionsAndCallRunActionsWith(IMAGE_TYPE, 10);
            expect(fsLightbox.elements.sourcesComponents[10]).toEqual(<Image
                fsLightbox={ fsLightbox }
                index={ 10 }
            />);
        });

        test('video type', () => {
            createNewCreatingSourcesActionsAndCallRunActionsWith(VIDEO_TYPE, 6);
            expect(fsLightbox.elements.sourcesComponents[6]).toEqual(<Video
                fsLightbox={ fsLightbox }
                index={ 6 }
            />);
        });


        test('youtube type', () => {
            createNewCreatingSourcesActionsAndCallRunActionsWith(YOUTUBE_TYPE, 8);
            expect(fsLightbox.elements.sourcesComponents[8]).toEqual(<Youtube
                fsLightbox={ fsLightbox }
                index={ 8 }
            />);
        });


        test('invalid type', () => {
            createNewCreatingSourcesActionsAndCallRunActionsWith(INVALID_TYPE, 4);
            expect(fsLightbox.elements.sourcesComponents[4]).toEqual(<Invalid
                fsLightbox={ fsLightbox }
                index={ 4 }
            />);
        });
    });

    describe('updateSourceHolderIfLightboxIsOpen', () => {
        let setSourceHolderState;

        beforeAll(() => {
            setSourceHolderState = jest.fn();
            sourcesHoldersUpdatersStateCollection[20] = {
                set: setSourceHolderState
            };
            createNewCreatingSourcesActionsAndCallRunActionsWith('video', 20);
        });

        test('lightbox is closed', () => {
            fsLightboxState.isOpen = false;
            createNewCreatingSourcesActionsAndCallRunActionsWith('video', 20);
            expect(sourcesHoldersUpdatersStateCollection[20].set).not.toBeCalled();
        });

        test('lightbox is opened', () => {
            fsLightboxState.isOpen = true;
            createNewCreatingSourcesActionsAndCallRunActionsWith('video', 20);
            expect(sourcesHoldersUpdatersStateCollection[20].set).toBeCalledWith(true);
        });
    });
});
