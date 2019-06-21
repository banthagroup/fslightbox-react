import React from 'react'
import { IMAGE_TYPE, INVALID_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../../../src/constants/core-constants";
import Image from "../../../../src/components/sources/proper-sources/Image";
import Video from "../../../../src/components/sources/proper-sources/Video";
import Youtube from "../../../../src/components/sources/proper-sources/Youtube";
import Invalid from "../../../../src/components/sources/proper-sources/Invalid";
import { SourceLoadHandler } from "../../../../src/core/sources/SourceLoadHandler";
import { DetectedTypeActions } from "../../../../src/core/sources/types/DetectedTypeActions";

const fsLightbox = {
    getState: () => fsLightboxState,
    componentsStates: {
        shouldSourceHolderBeUpdatedCollection: [],
    },
    elements: {
        sourcesComponents: []
    },
    collections: {
        sourcesLoadHandlers: []
    },
    injector: {
        injectDependency: (constructorDependency) => {
            if (constructorDependency === SourceLoadHandler) {
                return sourceLoadHandler;
            }
        }
    }
};
const fsLightboxState = {
    isOpen: false
};
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
    describe('runNotInvalidSourceActions', () => {
        describe('source is invalid', () => {
            beforeAll(() => {
                fsLightbox.collections.sourcesLoadHandlers = [];
                sourceLoadHandler.setIndex = jest.fn();
                createNewCreatingSourcesActionsAndCallRunActionsWith(INVALID_TYPE, 0);
            });

            it('should not attach sourceLoadHandler to sourcesLoadHandlers collection', () => {
                expect(fsLightbox.collections.sourcesLoadHandlers).toEqual([]);
            });

            it('should not call setIndex on sourceLoadHandler', () => {
                expect(sourceLoadHandler.setIndex).not.toBeCalled();
            });
        });

        describe('source is not invalid', () => {
            beforeAll(() => {
                fsLightbox.collections.sourcesLoadHandlers = [];
                sourceLoadHandler.setIndex = jest.fn();
                createNewCreatingSourcesActionsAndCallRunActionsWith(IMAGE_TYPE, 3);
            });

            it('should attach sourceLoadHandler to sourcesLoadHandlers collection', () => {
                expect(fsLightbox.collections.sourcesLoadHandlers).toEqual([
                    undefined,
                    undefined,
                    undefined,
                    sourceLoadHandler
                ]);
            });

            it('should call setIndex with passed index', () => {
                expect(sourceLoadHandler.setIndex).toBeCalledWith(3);
            });
        });
    });


    describe('runTypeSpecificActions', () => {
        beforeEach(() => {
            sourceLoadHandler.setUpLoadForImage = jest.fn();
            sourceLoadHandler.setUpLoadForVideo = jest.fn();
            sourceLoadHandler.setUpLoadForYoutube = jest.fn();
        });

        describe('image type', () => {
            beforeEach(() => {
                createNewCreatingSourcesActionsAndCallRunActionsWith(IMAGE_TYPE, 0);
            });

            it('should call setUpLoadForImage', () => {
                expect(sourceLoadHandler.setUpLoadForImage).toBeCalled();
            });

            it('should not call setUpLoadForVideo', () => {
                expect(sourceLoadHandler.setUpLoadForVideo).not.toBeCalled();
            });

            it('should not call setUpLoadForYoutube', () => {
                expect(sourceLoadHandler.setUpLoadForYoutube).not.toBeCalled();
            });
        });

        describe('video type', () => {
            beforeEach(() => {
                createNewCreatingSourcesActionsAndCallRunActionsWith(VIDEO_TYPE, 1);
            });

            it('should not call setUpLoadForImage', () => {
                expect(sourceLoadHandler.setUpLoadForImage).not.toBeCalled();
            });

            it('should call setUpLoadForVideo', () => {
                expect(sourceLoadHandler.setUpLoadForVideo).toBeCalled();
            });

            it('should not call setUpLoadForYoutube', () => {
                expect(sourceLoadHandler.setUpLoadForYoutube).not.toBeCalled();
            });
        });

        describe('youtube type', () => {
            beforeEach(() => {
                createNewCreatingSourcesActionsAndCallRunActionsWith(YOUTUBE_TYPE, 2);
            });

            it('should not call setUpLoadForImage', () => {
                expect(sourceLoadHandler.setUpLoadForImage).not.toBeCalled();
            });

            it('should not call setUpLoadForVideo', () => {
                expect(sourceLoadHandler.setUpLoadForVideo).not.toBeCalled();
            });

            it('should call setUpLoadForYoutube', () => {
                expect(sourceLoadHandler.setUpLoadForYoutube).toBeCalled();
            });
        });
    });


    describe('buildSourceComponent and runTypeSpecificActions', () => {
        describe('image type', () => {
            beforeAll(() => {
                createNewCreatingSourcesActionsAndCallRunActionsWith(IMAGE_TYPE, 10);
            });

            it('should add proper source component with proper index', () => {
                expect(fsLightbox.elements.sourcesComponents[10]).toEqual(<Image
                    fsLightbox={ fsLightbox }
                    index={ 10 }
                />);
            })
        });

        describe('video type', () => {
            beforeAll(() => {
                createNewCreatingSourcesActionsAndCallRunActionsWith(VIDEO_TYPE, 6);
            });

            it('should add proper source component with proper index', () => {
                expect(fsLightbox.elements.sourcesComponents[6]).toEqual(<Video
                    fsLightbox={ fsLightbox }
                    index={ 6 }
                />);
            })
        });


        describe('youtube type', () => {
            beforeAll(() => {
                createNewCreatingSourcesActionsAndCallRunActionsWith(YOUTUBE_TYPE, 8);
            });

            it('should add proper source component with proper index', () => {
                expect(fsLightbox.elements.sourcesComponents[8]).toEqual(<Youtube
                    fsLightbox={ fsLightbox }
                    index={ 8 }
                />);
            })
        });


        describe('invalid type', () => {
            beforeAll(() => {
                createNewCreatingSourcesActionsAndCallRunActionsWith(INVALID_TYPE, 4);
            });

            it('should add proper source component with proper index', () => {
                expect(fsLightbox.elements.sourcesComponents[4]).toEqual(<Invalid
                    fsLightbox={ fsLightbox }
                    index={ 4 }
                />);
            })
        });
    });

    describe('updateSourceHolderIfLightboxIsOpen', () => {
        let setSourceHolderState;

        beforeAll(() => {
            setSourceHolderState = jest.fn();
            fsLightbox.componentsStates.shouldSourceHolderBeUpdatedCollection[20] = {
                set: setSourceHolderState
            };
            createNewCreatingSourcesActionsAndCallRunActionsWith('video', 20);
        });

        describe('lightbox is closed', () => {
            beforeAll(() => {
                fsLightboxState.isOpen = false;
                createNewCreatingSourcesActionsAndCallRunActionsWith('video', 20);
            });

            it('should not call set at proper source holder state manager', () => {
                expect(fsLightbox.componentsStates.shouldSourceHolderBeUpdatedCollection[20].set).not.toBeCalled();
            });
        });

        describe('lightbox is opened', () => {
            beforeAll(() => {
                fsLightboxState.isOpen = true;
                createNewCreatingSourcesActionsAndCallRunActionsWith('video', 20);
            });

            it('should call set with true at proper source holder state manager', () => {
                expect(fsLightbox.componentsStates.shouldSourceHolderBeUpdatedCollection[20].set).toBeCalledWith(true);
            });
        });
    });
});
