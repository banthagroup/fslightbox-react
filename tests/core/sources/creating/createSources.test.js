import { createSources } from "../../../../src/core/sources/creating/createSources";
import { CreatingSourcesLocalStorageManager } from "../../../../src/core/sources/creating/CreatingSourcesLocalStorageManager";
import { DetectedTypeActions } from "../../../../src/core/sources/types/DetectedTypeActions";
import { SourceTypeGetter } from "../../../../src/core/sources/types/SourceTypeGetter";

const fsLightbox = {
    props: {
        urls: ['first-url', 'second-url', 'third-url'],
        types: []
    },
    injector: {
        injectDependency: (dependency) => {
            if (dependency === DetectedTypeActions)
                return detectedTypeActions;

            if (dependency === CreatingSourcesLocalStorageManager)
                return localStorageManager;

            if (dependency === SourceTypeGetter) {
                return sourceTypeGetter;
            }
        }
    }
};
const detectedTypeActions = {
    runActionsForSourceTypeAndIndex: () => {}
};
let localStorageManager = {
    getSourceTypeFromLocalStorageByUrl: () => {},
    handleReceivedSourceTypeForUrl: () => {}
};

// we mock getSourceTypeFromLocalStorageByUrl to return specified types for urls
const typesToReturnFromGetSourceTypeFromLocalStorage = {};

const sourceTypeGetter = {
    setUrlToCheck: () => {},
    getSourceType: () => {}
};

describe('creating sources from correct types', () => {
    beforeAll(() => {
        localStorageManager.getSourceTypeFromLocalStorageByUrl = jest.fn((url) => {
            return typesToReturnFromGetSourceTypeFromLocalStorage[url];
        });
        localStorageManager.handleReceivedSourceTypeForUrl = jest.fn();
        detectedTypeActions.runActionsForSourceTypeAndIndex = jest.fn();
        sourceTypeGetter.setUrlToCheck = jest.fn();
        sourceTypeGetter.getSourceType = jest.fn();

        // first source type is in local storage and type is not set manually
        fsLightbox.props.types[0] = undefined;
        typesToReturnFromGetSourceTypeFromLocalStorage['first-url'] = 'type-from-local-storage';

        // second sources type is in local storage but type is set manually
        fsLightbox.props.types[1] = 'type-set-manually';
        typesToReturnFromGetSourceTypeFromLocalStorage['second-url'] = 'type-from-local-storage';

        // third source type is not in local storage and type is not set manually
        fsLightbox.props.types[2] = undefined;
        typesToReturnFromGetSourceTypeFromLocalStorage['third-url'] = undefined;

        createSources(fsLightbox);
    });

    it('should call getSourceType only one time due to only one source is detected via xhr', () => {
        expect(sourceTypeGetter.getSourceType).toBeCalledTimes(1);
    });

    describe('first source', () => {
        it('should call getSourceTypeFromLocalStorageByUrl with first url', () => {
            expect(localStorageManager.getSourceTypeFromLocalStorageByUrl).toBeCalledWith('first-url');
        });

        describe('not detecting type via xhr', () => {
            it('should not call setUrlToCheck with first url', () => {
                expect(sourceTypeGetter.setUrlToCheck).not.toBeCalledWith('first-url');
            });
        });

        it('should call runActionsForSourceType with source type from local storage', () => {
            expect(detectedTypeActions.runActionsForSourceTypeAndIndex).toBeCalledWith('type-from-local-storage', 0);
        });
    });

    describe('second source', () => {
        it('should not call getSourceTypeFromLocalStorageByUrl with second url', () => {
            expect(localStorageManager.getSourceTypeFromLocalStorageByUrl).not.toBeCalledWith('second-url');
        });

        describe('not detecting type via xhr', () => {
            it('should not call setUrlToCheck with second url', () => {
                expect(sourceTypeGetter.setUrlToCheck).not.toBeCalledWith('second-url');
            });
        });

        it('should call runActionsForSourceType with source type manually set by client', () => {
            expect(detectedTypeActions.runActionsForSourceTypeAndIndex).toBeCalledWith('type-set-manually', 1);
        });
    });


    describe('third source', () => {
        it('should call getSourceTypeFromLocalStorageByUrl with third url', () => {
            expect(localStorageManager.getSourceTypeFromLocalStorageByUrl).toBeCalledWith('third-url');
        });

        describe('not detecting type via xhr', () => {
            it('should call setUrlToCheck with third url', () => {
                expect(sourceTypeGetter.setUrlToCheck).toBeCalledWith('third-url');
            });
        });

        describe('passing correct callback to getSourceType', () => {
            beforeAll(() => {
                // calling this callback
                sourceTypeGetter.getSourceType.mock.calls[0][0]('type-from-xhr');
            });

            it('should call handleReceivedSourceTypeForUrl with right source type and url', () => {
                expect(localStorageManager.handleReceivedSourceTypeForUrl).toBeCalledWith('type-from-xhr', 'third-url');
            });

            it('should call runActionsForSourceTypeAndIndex with right index and type', () => {
                expect(detectedTypeActions.runActionsForSourceTypeAndIndex).toBeCalledWith('type-from-xhr', 2);
            });
        });
    });
});
