import { CreatingSourcesLocalStorageManager } from "../../../../src/core/sources/creating/CreatingSourcesLocalStorageManager";
import { SOURCES_TYPES_KEY } from "../../../../src/constants/localStorageConstants";

const fsLightbox = {
    props: {
        disableLocalStorage: false
    }
};

let creatingSourcesLocalStorageManager;

const createNewLocalStorageAndCallGetSourceTypeFromLocalStorageByUrl = (url) => {
    creatingSourcesLocalStorageManager = new CreatingSourcesLocalStorageManager(fsLightbox);
    return creatingSourcesLocalStorageManager.getSourceTypeFromLocalStorageByUrl(url);
};

describe('getSourceTypeFromLocalStorageByUrl', () => {
    describe('localStorage is disabled', () => {
        beforeAll(() => {
            localStorage.setItem(SOURCES_TYPES_KEY, JSON.stringify({
                'first-url': 'image'
            }));
            fsLightbox.props.disableLocalStorage = true;
            creatingSourcesLocalStorageManager = new CreatingSourcesLocalStorageManager(fsLightbox);
        });

        it('should be empty function', () => {
            expect("" + creatingSourcesLocalStorageManager.getSourceTypeFromLocalStorageByUrl)
                .toEqual("" + function () {});
        });
    });

    describe('localStorage is enabled', () => {
        beforeAll(() => {
            delete fsLightbox.props.disableLocalStorage;
            localStorage.setItem(SOURCES_TYPES_KEY, JSON.stringify({
                'first-url': 'image'
            }));
        });

        it('should return type of source', () => {
            expect(createNewLocalStorageAndCallGetSourceTypeFromLocalStorageByUrl('first-url')).toBe('image');
        });

        it('should return undefined to type that is not in storage', () => {
            expect(createNewLocalStorageAndCallGetSourceTypeFromLocalStorageByUrl('random-url')).toBeUndefined();
        });

        describe('localStorage is empty', () => {
            beforeAll(() => {
                localStorage.removeItem(SOURCES_TYPES_KEY);
            });

            it('should return undefined', () => {
                expect(createNewLocalStorageAndCallGetSourceTypeFromLocalStorageByUrl('random-url')).toBeUndefined();
            });
        });
    });
});

describe('handleRetrievedSourceTypeFromUrl', () => {
    describe('localStorage is disabled', () => {
        beforeAll(() => {
            fsLightbox.props.disableLocalStorage = true;
            creatingSourcesLocalStorageManager = new CreatingSourcesLocalStorageManager(fsLightbox);
        });

        it('should be empty function', () => {
            expect("" + creatingSourcesLocalStorageManager.handleReceivedSourceTypeForUrl)
                .toEqual("" + function () {});
        });
    });

    describe('localStorage is enabled', () => {
        describe('localStorage is not empty', () => {
            beforeAll(() => {
                // we will be testing for updating sources types in local storage if
                // second-url and third-url are filled
                localStorage.setItem(SOURCES_TYPES_KEY, JSON.stringify({
                    'first-url': 'image',
                    'fourth-url': 'video'
                }));

                fsLightbox.props.disableLocalStorage = undefined;
                creatingSourcesLocalStorageManager = new CreatingSourcesLocalStorageManager(fsLightbox);

                // calling getSourceTypeFromLocalStorageFromUrl for those urls to init waiting for types to come
                creatingSourcesLocalStorageManager.getSourceTypeFromLocalStorageByUrl('second-url');
                creatingSourcesLocalStorageManager.getSourceTypeFromLocalStorageByUrl('third-url');
            });


            describe('calling handleRetrieveSourceTypeForUrl for one missing url', () => {
                beforeAll(() => {
                    creatingSourcesLocalStorageManager.handleReceivedSourceTypeForUrl('youtube', 'second-url');
                });

                it('should not update localStorage', () => {
                    expect(localStorage.getItem(SOURCES_TYPES_KEY)).toEqual(JSON.stringify({
                        'first-url': 'image',
                        'fourth-url': 'video'
                    }));
                });
            });

            describe('calling handleRetrieveSourceTypeForUrl for second missing url', () => {
                beforeAll(() => {
                    creatingSourcesLocalStorageManager.handleReceivedSourceTypeForUrl('invalid', 'third-url');
                });

                it('should update localStorage', () => {
                    expect(localStorage.getItem(SOURCES_TYPES_KEY)).toEqual(JSON.stringify({
                        'first-url': 'image',
                        'fourth-url': 'video',
                        'second-url': 'youtube',
                        'third-url': 'invalid'
                    }));
                });
            });
        });

        describe('localStorage is empty', () => {
            beforeAll(() => {
                localStorage.removeItem(SOURCES_TYPES_KEY);

                // we will be testing for adding sources types for fifth-url and six-url
                fsLightbox.props.disableLocalStorage = undefined;
                creatingSourcesLocalStorageManager = new CreatingSourcesLocalStorageManager(fsLightbox);

                // calling getSourceTypeFromLocalStorageFromUrl for those urls to init waiting for types to come
                creatingSourcesLocalStorageManager.getSourceTypeFromLocalStorageByUrl('fifth-url');
                creatingSourcesLocalStorageManager.getSourceTypeFromLocalStorageByUrl('sixth-url');
            });

            describe('calling handleRetrieveSourceTypeForUrl for one missing url', () => {
                beforeAll(() => {
                    creatingSourcesLocalStorageManager.handleReceivedSourceTypeForUrl('image', 'fifth-url');
                });

                it('should not update localStorage', () => {
                    expect(localStorage.getItem(SOURCES_TYPES_KEY)).toBeNull();
                });
            });

            describe('calling handleRetrieveSourceTypeForUrl for second missing url', () => {
                beforeAll(() => {
                    creatingSourcesLocalStorageManager.handleReceivedSourceTypeForUrl('video', 'sixth-url');
                });

                it('should update localStorage', () => {
                    expect(localStorage.getItem(SOURCES_TYPES_KEY)).toEqual(JSON.stringify({
                        'fifth-url': 'image',
                        'sixth-url': 'video',
                    }));
                });
            });
        });
    });
});
