import { createSources } from "./createSources";
import { CreatingSourcesLocalStorageManager } from "./CreatingSourcesLocalStorageManager";
import { DetectedTypeActions } from "../types/DetectedTypeActions";
import { AutomaticTypeDetector } from "../types/AutomaticTypeDetector";

const fsLightbox = {
    data: {
        sources: ['first-url', 'second-url', 'third-url']
    },
    props: {
        types: [],
        type: undefined
    },
    injector: {
        injectDependency: (dependency) => {
            if (dependency === DetectedTypeActions)
                return detectedTypeActions;

            if (dependency === CreatingSourcesLocalStorageManager)
                return localStorageManager;

            if (dependency === AutomaticTypeDetector) {
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

describe('creating sources with correct types', () => {
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

    it('should correctly detect first source type', () => {
        expect(localStorageManager.getSourceTypeFromLocalStorageByUrl)
            .toBeCalledWith('first-url');

        expect(sourceTypeGetter.setUrlToCheck)
            .not
            .toBeCalledWith('first-url');

        expect(detectedTypeActions.runActionsForSourceTypeAndIndex)
            .toBeCalledWith('type-from-local-storage', 0);
    });

    it('should correctly detect second source type', () => {
        expect(localStorageManager.getSourceTypeFromLocalStorageByUrl)
            .not
            .toBeCalledWith('second-url');

        expect(sourceTypeGetter.setUrlToCheck)
            .not
            .toBeCalledWith('second-url');

        expect(detectedTypeActions.runActionsForSourceTypeAndIndex)
            .toBeCalledWith('type-set-manually', 1);
    });

    it('should correctly detect third source type', () => {
        expect(localStorageManager.getSourceTypeFromLocalStorageByUrl)
            .toBeCalledWith('third-url');

        expect(sourceTypeGetter.setUrlToCheck)
            .toBeCalledWith('third-url');


        // calling retrieving type via xhr asynchronous callback
        sourceTypeGetter.getSourceType.mock.calls[0][0]('type-from-xhr');

        expect(localStorageManager.handleReceivedSourceTypeForUrl)
            .toBeCalledWith('type-from-xhr', 'third-url');

        expect(detectedTypeActions.runActionsForSourceTypeAndIndex)
            .toBeCalledWith('type-from-xhr', 2);
    });
});

describe('creating sources when type prop is used', () => {
    beforeAll(() => {
        localStorageManager.getSourceTypeFromLocalStorageByUrl = jest.fn();
        sourceTypeGetter.setUrlToCheck = jest.fn();
        sourceTypeGetter.getSourceType = jest.fn();
        detectedTypeActions.runActionsForSourceTypeAndIndex = jest.fn();

        fsLightbox.props.type = 'image';

        fsLightbox.props.types[0] = 'video';
        fsLightbox.props.types[1] = undefined;
        fsLightbox.props.types[2] = 'youtube';

        createSources(fsLightbox);
    });

    it('should get type from local storage', () => {
        expect(localStorageManager.getSourceTypeFromLocalStorageByUrl).not.toBeCalled();
    });

    it('should not get type via xhr', () => {
        expect(sourceTypeGetter.setUrlToCheck).not.toBeCalled();
        expect(sourceTypeGetter.getSourceType).not.toBeCalled();
    });

    it('should correctly run detected type actions', () => {
        expect(detectedTypeActions.runActionsForSourceTypeAndIndex)
            .toBeCalledTimes(3);
        expect(detectedTypeActions.runActionsForSourceTypeAndIndex)
            .toBeCalledWith('video', 0);
        expect(detectedTypeActions.runActionsForSourceTypeAndIndex)
            .toBeCalledWith('image', 1);
        expect(detectedTypeActions.runActionsForSourceTypeAndIndex)
            .toBeCalledWith('youtube', 2);
    });
});

test('creating sources when types prop is undefined', () => {
    localStorageManager.getSourceTypeFromLocalStorageByUrl = () => {};
    sourceTypeGetter.setUrlToCheck = () => {};
    sourceTypeGetter.getSourceType = () => {};
    detectedTypeActions.runActionsForSourceTypeAndIndex = () => {};

    fsLightbox.props.types = undefined;

    expect(() => {
        createSources(fsLightbox);
    }).not.toThrowError();
});
