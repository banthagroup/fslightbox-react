import { createSources } from "../../../../src/core/sources/creating/createSources";
import { CreatingSourcesActions } from "../../../../src/core/sources/creating/CreatingSourcesActions";
import { CreatingSourcesLocalStorageManager } from "../../../../src/core/sources/creating/CreatingSourcesLocalStorageManager";
import { SOURCES_TYPES_KEY } from "../../../../src/constants/localStorageConstants";

const fsLightbox = {
    props: {
        urls: ['first-url', 'second-url', 'third-url'],
        disableLocalStorage: false
    },
    injector: {
        injectDependency: (dependency) => {
            if (dependency === CreatingSourcesActions)
                return creatingSourcesActions;

            if (dependency === CreatingSourcesLocalStorageManager)
                return creatingSourcesLocalStorageManager;

            // to ensure that we are calling for correct urls methods from correct source types getters
            // we will return special source type getter for each call
            injectingSourceTypeGettersCalls++;
            return sourceTypeGetters[injectingSourceTypeGettersCalls - 1];
        }
    }
};
const creatingSourcesActions = {
    runActionsForSourceTypeAndIndex: () => {}
};
let creatingSourcesLocalStorageManager = {
    getSourceTypeFromLocalStorageByUrl: () => {},
    handleReceivedSourceTypeForUrl: () => {}
};
let injectingSourceTypeGettersCalls = 0;
// we will be checking three sources so we will make three source type getters
const sourceTypeGetters = [
    {
        setUrlToCheck: () => {},
        getSourceType: () => {}
    },
    {
        setUrlToCheck: () => {},
        getSourceType: () => {}
    },
    {
        setUrlToCheck: () => {},
        getSourceType: () => {}
    }
];


const mockDependenciesMethodsAndCallCreate = () => {
    injectingSourceTypeGettersCalls = 0;
    creatingSourcesActions.runActionsForSourceTypeAndIndex = jest.fn();
    sourceTypeGetters.forEach(sourceTypeGetter => {
        sourceTypeGetter.setUrlToCheck = jest.fn();
        sourceTypeGetter.getSourceType = jest.fn();
    });
    creatingSourcesLocalStorageManager.handleReceivedSourceTypeForUrl = jest.fn();
    createSources(fsLightbox)
};

describe('local storage is disabled', () => {
    beforeAll(() => {
        fsLightbox.props.disableLocalStorage = true;
        mockDependenciesMethodsAndCallCreate();
    });

    it('should not call runActionsForSourceTypeAndIndex', () => {
        expect(creatingSourcesActions.runActionsForSourceTypeAndIndex).not.toBeCalled();
    });

    describe('getting type via xhr', () => {
        describe('calling setUrlToCheck for right source type getters correctly', () => {
            it('should set correct url to check for first source', () => {
                expect(sourceTypeGetters[0].setUrlToCheck).toBeCalledWith('first-url');
            });

            it('should set correct url to check for second source', () => {
                expect(sourceTypeGetters[1].setUrlToCheck).toBeCalledWith('second-url');
            });

            it('should set correct url to check for third source', () => {
                expect(sourceTypeGetters[2].setUrlToCheck).toBeCalledWith('third-url');
            });
        });

        describe('retrieveTypeWithXhrAndCallActions', () => {
            beforeAll(() => {
                // calling callbacks that was passed to getSourceType
                sourceTypeGetters[0].getSourceType.mock.calls[0][0]('first-source-type');
                sourceTypeGetters[1].getSourceType.mock.calls[0][0]('second-source-type');
                sourceTypeGetters[2].getSourceType.mock.calls[0][0]('third-source-type');
            });

            it('should call runActionsForSourceTypeAndIndex three times totally', () => {
                expect(creatingSourcesActions.runActionsForSourceTypeAndIndex)
                    .toBeCalledTimes(3);
            });

            it('should call handleReceivedSourceTypeForUrl three times totally', () => {
                expect(creatingSourcesLocalStorageManager.handleReceivedSourceTypeForUrl).toBeCalledTimes(3);
            });

            describe('first source', () => {
                it(`should call getSourceType`, () => {
                    expect(sourceTypeGetters[0].getSourceType).toBeCalled();
                });

                it('should call handleReceivedSourceTypeForUrl with source type and url', () => {
                    expect(creatingSourcesLocalStorageManager.handleReceivedSourceTypeForUrl)
                        .toBeCalledWith('first-source-type', 'first-url');
                });

                it('should call runActionsSourceTypeAndIndex with source type from callback and source index', () => {
                    expect(creatingSourcesActions.runActionsForSourceTypeAndIndex)
                        .toBeCalledWith('first-source-type', 0);
                });
            });

            describe('second source', () => {
                it(`should call getSourceType`, () => {
                    expect(sourceTypeGetters[1].getSourceType).toBeCalled();
                });

                it('should call handleReceivedSourceTypeForUrl with source type and url', () => {
                    expect(creatingSourcesLocalStorageManager.handleReceivedSourceTypeForUrl)
                        .toBeCalledWith('second-source-type', 'second-url');
                });

                it('should call runActionsSourceTypeAndIndex with source type from callback and source index', () => {
                    expect(creatingSourcesActions.runActionsForSourceTypeAndIndex)
                        .toBeCalledWith('second-source-type', 1);
                });
            });

            describe('third source', () => {
                it('should call getSourceType', () => {
                    expect(sourceTypeGetters[1].getSourceType).toBeCalled();
                });

                it('should call handleReceivedSourceTypeForUrl with source type and url', () => {
                    expect(creatingSourcesLocalStorageManager.handleReceivedSourceTypeForUrl)
                        .toBeCalledWith('third-source-type', 'third-url');
                });

                it('should call runActionsSourceTypeAndIndex source type from callback and source index', () => {
                    expect(creatingSourcesActions.runActionsForSourceTypeAndIndex)
                        .toBeCalledWith('third-source-type', 2);
                });
            });
        });
    });
});

describe('local storage is enabled', () => {
    beforeAll(() => {
        fsLightbox.props.disableLocalStorage = false;
        // lets say we will be testing that only first and third item has types in local storage
        localStorage.setItem(SOURCES_TYPES_KEY, JSON.stringify({
            'first-url': 'first-source-type',
            'third-url': 'third-source-type'
        }));
        creatingSourcesLocalStorageManager = new CreatingSourcesLocalStorageManager(fsLightbox);
        mockDependenciesMethodsAndCallCreate();
    });

    describe('calling runActionsForSourceTypeAndIndex', () => {
        it('should call runActionsForSourceTypeAndIndex twice', () => {
            expect(creatingSourcesActions.runActionsForSourceTypeAndIndex)
                .toBeCalledTimes(2);
        });

        it('should call runActionsForSourceTypeAndIndex with source type from local storage and index', () => {
            expect(creatingSourcesActions.runActionsForSourceTypeAndIndex)
                .toBeCalledWith('first-source-type', 0);
        });

        it('should call runActionsForSourceTypeAndIndex with source type from local storage and source index', () => {
            expect(creatingSourcesActions.runActionsForSourceTypeAndIndex)
                .toBeCalledWith('third-source-type', 2);
        });
    });

    describe('not calling runActionsForSourceTypeAndIndex', () => {
        it('should no call runActionsForSourceTypeAndIndex for second url', () => {
            expect(creatingSourcesActions.runActionsForSourceTypeAndIndex)
                .not.toBeCalledWith('second-source-type', 1);
        });
    });


    describe('not calling source type getters methods', () => {
        it('should call setUrlToCheck for first url and third url', () => {
            // the wanted method will take first index in source type getters because it will be only called
            // others wont even trigger injectDependency
            expect(sourceTypeGetters[1].setUrlToCheck).not.toBeCalled();
            expect(sourceTypeGetters[2].setUrlToCheck).not.toBeCalled();
        });

        it('should not call getSourceType for first and third url', () => {
            // the wanted method will take first index in source type getters because it will be only called
            // others wont even trigger injectDependency
            expect(sourceTypeGetters[1].getSourceType).not.toBeCalled();
            expect(sourceTypeGetters[2].getSourceType).not.toBeCalled();
        });
    });

    describe('calling source type getters methods for second url (the one without source type in localStorage)', () => {
        it('should call setUrlToCheckWith second url', () => {
            expect(sourceTypeGetters[0].setUrlToCheck).toBeCalledWith('second-url');
        });

        it('should call getSourceType', () => {
            expect(sourceTypeGetters[0].getSourceType).toBeCalled();
        });

        describe('getSourceType callback', () => {
            beforeAll(() => {
                // testing call
                sourceTypeGetters[0].getSourceType.mock.calls[0][0]('second-source-type');
            });

            it('should call handleReceivedSourceTypeForUrl with source type and url', () => {
                expect(creatingSourcesLocalStorageManager.handleReceivedSourceTypeForUrl)
                    .toBeCalledWith('second-source-type', 'second-url');
            });

            it('should call runActionsForSourceTypeAndIndex with sourceType and index', () => {
                expect(creatingSourcesActions.runActionsForSourceTypeAndIndex)
                    .toBeCalledWith('second-source-type', 1);
            });
        });
    });
});

