import { setUpClassListManager } from "./setUpClassListManager";
import { LIGHTBOX_CONTAINER, SOURCES, SOURCES_HOLDERS } from "../../constants/elements";

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

setUpClassListManager(fsLightbox);

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
    test('add', () => {
        setUpElementForClass(LIGHTBOX_CONTAINER, 'test-add');
        classListManager
            .manageElement(LIGHTBOX_CONTAINER)
            .add('test-add');
        expect(add).toBeCalledWith('test-add');
    });

    describe('addIfNotContains', () => {
        test('element does not contain class name', () => {
            toReturnFromContains = true;
            setUpElementForClass(LIGHTBOX_CONTAINER, 'test-contains-add');
            classListManager
                .manageElement(LIGHTBOX_CONTAINER)
                .addIfNotContains('test-contains-add');
            expect(add).not.toBeCalled();
        });

        test('element contains class', () => {
            toReturnFromContains = false;
            setUpElementForClass(LIGHTBOX_CONTAINER, 'test-contains-add');
            classListManager
                .manageElement(LIGHTBOX_CONTAINER)
                .addIfNotContains('test-contains-add');
            expect(add).toBeCalledWith('test-contains-add');
        });
    });

    test('remove', () => {
        setUpElementForClass(LIGHTBOX_CONTAINER, 'test-remove');
        classListManager
            .manageElement(LIGHTBOX_CONTAINER)
            .remove('test-remove');
        expect(remove).toBeCalledWith('test-remove');
    });

    describe('removeIfContains', () => {
        test('element does not contain class', () => {
            toReturnFromContains = false;
            setUpElementForClass(LIGHTBOX_CONTAINER, 'test-contains-remove');
            classListManager
                .manageElement(LIGHTBOX_CONTAINER)
                .removeIfContains('test-contains-remove');
            expect(remove).not.toBeCalled();
        });

        test('element contains class name', () => {
            toReturnFromContains = true;
            setUpElementForClass(LIGHTBOX_CONTAINER, 'test-contains-remove');
            classListManager
                .manageElement(LIGHTBOX_CONTAINER)
                .removeIfContains('test-contains-remove');
            expect(remove).toBeCalledWith('test-contains-remove');
        });
    });
});

describe('manageArrayElementAtIndex', () => {
    test('add', () => {
        setUpElementFromArrayAtIndexForClass(SOURCES, 0, 'test-add');
        classListManager
            .manageArrayElementAtIndex(SOURCES, 0)
            .add('test-add');
        expect(add).toBeCalledWith('test-add');
    });

    describe('addIfNotContains', () => {
        test('element does not contain class name', () => {
            toReturnFromContains = true;
            setUpElementFromArrayAtIndexForClass(SOURCES_HOLDERS, 2, 'test-contains-add');
            classListManager
                .manageArrayElementAtIndex(SOURCES_HOLDERS, 2)
                .addIfNotContains('test-contains-add');
            expect(add).not.toBeCalled();
        });

        test('element contain class name', () => {
            toReturnFromContains = false;
            setUpElementFromArrayAtIndexForClass(SOURCES_HOLDERS, 4, 'test-contains-add');
            classListManager
                .manageArrayElementAtIndex(SOURCES_HOLDERS, 4)
                .addIfNotContains('test-contains-add');
            expect(add).toBeCalledWith('test-contains-add');
        });
    });

    test('remove', () => {
        setUpElementFromArrayAtIndexForClass(SOURCES, 3, 'test-remove');
        classListManager
            .manageArrayElementAtIndex(SOURCES, 3)
            .remove('test-remove');
        expect(remove).toBeCalledWith('test-remove');
    });

    describe('removeIfContains', () => {
        test('element does not has class name', () => {
            toReturnFromContains = false;
            setUpElementFromArrayAtIndexForClass(SOURCES, 3, 'test-contains-remove');
            classListManager
                .manageArrayElementAtIndex(SOURCES, 3)
                .removeIfContains('test-contains-remove');
            expect(remove).not.toBeCalled();
        });

        test('element has class name', () => {
            toReturnFromContains = true;
            setUpElementFromArrayAtIndexForClass(SOURCES_HOLDERS, 10, 'test-contains-remove');
            classListManager
                .manageArrayElementAtIndex(SOURCES_HOLDERS, 10)
                .removeIfContains('test-contains-remove');
            expect(remove).toBeCalledWith('test-contains-remove');
        });
    });
});
