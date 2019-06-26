import { setUpClassListsManager } from "../../../src/core/elements/setUpClassListsManager";
import { LIGHTBOX_CONTAINER, SOURCES, SOURCES_HOLDERS } from "../../../src/constants/elements";

const fsLightbox = {
    core: {
        classListManager: {}
    },
    elements: {
        container: {},
        sources: [],
        sourcesHolders: []
    }
};
const classListManager = fsLightbox.core.classListManager;

setUpClassListsManager(fsLightbox);

let toReturnFromContains;
let remove;
let add;

const setUpElementForClass = (elementName, className) => {
    remove = jest.fn();
    add = jest.fn();
    fsLightbox.elements[elementName] = {
        current: {
            classList: {
                add: add,
                contains: (expectedClass) => {
                    if (expectedClass === className) {
                        return toReturnFromContains;
                    }
                },
                remove: remove
            }
        }
    };
};

const setUpElementFromArrayAtIndexForClass = (elementsArrayName, index, className) => {
    remove = jest.fn();
    add = jest.fn();
    fsLightbox.elements[elementsArrayName][index] = {
        current: {
            classList: {
                add: add,
                contains: (expectedClass) => {
                    if (expectedClass === className) {
                        return toReturnFromContains;
                    }
                },
                remove: remove
            }
        },
    };
};

describe('manageElement', () => {
    describe('add', () => {
        beforeAll(() => {
            setUpElementForClass(LIGHTBOX_CONTAINER, 'test-add');
            classListManager
                .manageElement(LIGHTBOX_CONTAINER)
                .add('test-add');
        });

        it('should call add with passed class name', () => {
            expect(add).toBeCalledWith('test-add');
        });
    });

    describe('addIfNotContains', () => {
        describe('element does not contain class name', () => {
            beforeAll(() => {
                toReturnFromContains = true;
                setUpElementForClass(LIGHTBOX_CONTAINER, 'test-contains-add');
                classListManager
                    .manageElement(LIGHTBOX_CONTAINER)
                    .addIfNotContains('test-contains-add');
            });

            it('should not call add', () => {
                expect(add).not.toBeCalled();
            });
        });

        describe('element contains class', () => {
            beforeAll(() => {
                toReturnFromContains = false;
                setUpElementForClass(LIGHTBOX_CONTAINER, 'test-contains-add');
                classListManager
                    .manageElement(LIGHTBOX_CONTAINER)
                    .addIfNotContains('test-contains-add');
            });

            it('should call add with passed class', () => {
                expect(add).toBeCalledWith('test-contains-add');
            });
        });
    });

    describe('remove', () => {
        beforeAll(() => {
            setUpElementForClass(LIGHTBOX_CONTAINER, 'test-remove');
            classListManager
                .manageElement(LIGHTBOX_CONTAINER)
                .remove('test-remove');
        });

        it('should call remove with passed remove class name', () => {
            expect(remove).toBeCalledWith('test-remove');
        });
    });

    describe('removeIfContains', () => {
        describe('element does not contain class', () => {
            beforeAll(() => {
                toReturnFromContains = false;
                setUpElementForClass(LIGHTBOX_CONTAINER, 'test-contains-remove');
                classListManager
                    .manageElement(LIGHTBOX_CONTAINER)
                    .removeIfContains('test-contains-remove');
            });

            it('should not call remove', () => {
                expect(remove).not.toBeCalled();
            });
        });

        describe('element contains class name', () => {
            beforeAll(() => {
                toReturnFromContains = true;
                setUpElementForClass(LIGHTBOX_CONTAINER, 'test-contains-remove');
                classListManager
                    .manageElement(LIGHTBOX_CONTAINER)
                    .removeIfContains('test-contains-remove');
            });

            it('should call remove with passed class name', () => {
                expect(remove).toBeCalledWith('test-contains-remove');
            });
        });
    });
});

describe('manageArrayElementAtIndex', () => {
    describe('add', () => {
        beforeAll(() => {
            setUpElementFromArrayAtIndexForClass(SOURCES, 0, 'test-add');
            classListManager
                .manageArrayElementAtIndex(SOURCES, 0)
                .add('test-add');
        });

        it('should call add with passed class name', () => {
            expect(add).toBeCalledWith('test-add');
        });
    });

    describe('addIfNotContains', () => {
        describe('element does not contain class name', () => {
            beforeAll(() => {
                toReturnFromContains = true;
                setUpElementFromArrayAtIndexForClass(SOURCES_HOLDERS, 2, 'test-contains-add');
                classListManager
                    .manageArrayElementAtIndex(SOURCES_HOLDERS, 2)
                    .addIfNotContains('test-contains-add');
            });

            it('should not call add', () => {
                expect(add).not.toBeCalled();
            });
        });

        describe('element contain class name', () => {
            beforeAll(() => {
                toReturnFromContains = false;
                setUpElementFromArrayAtIndexForClass(SOURCES_HOLDERS, 4, 'test-contains-add');
                classListManager
                    .manageArrayElementAtIndex(SOURCES_HOLDERS, 4)
                    .addIfNotContains('test-contains-add');
            });

            it('should call add with passed class', () => {
                expect(add).toBeCalledWith('test-contains-add');
            });
        });
    });

    describe('remove', () => {
        beforeAll(() => {
            setUpElementFromArrayAtIndexForClass(SOURCES, 3, 'test-remove');
            classListManager
                .manageArrayElementAtIndex(SOURCES, 3)
                .remove('test-remove');
        });

        it('should call remove with passed remove class name', () => {
            expect(remove).toBeCalledWith('test-remove');
        });
    });

    describe('removeIfContains', () => {
        describe('element does not has class name', () => {
            beforeAll(() => {
                toReturnFromContains = false;
                setUpElementFromArrayAtIndexForClass(SOURCES, 3, 'test-contains-remove');
                classListManager
                    .manageArrayElementAtIndex(SOURCES, 3)
                    .removeIfContains('test-contains-remove');
            });

            it('should not call remove', () => {
                expect(remove).not.toBeCalled();
            });
        });

        describe('element has class name', () => {
            beforeAll(() => {
                toReturnFromContains = true;
                setUpElementFromArrayAtIndexForClass(SOURCES_HOLDERS, 10, 'test-contains-remove');
                classListManager
                    .manageArrayElementAtIndex(SOURCES_HOLDERS, 10)
                    .removeIfContains('test-contains-remove');
            });

            it('should call remove with passed class name', () => {
                expect(remove).toBeCalledWith('test-contains-remove');
            });
        });
    });
});

