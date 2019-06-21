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

describe('addToElementClass', () => {
    beforeAll(() => {
        setUpElementForClass(LIGHTBOX_CONTAINER, 'test-container-class');
        classListManager.addToElementClass(LIGHTBOX_CONTAINER, 'test-container-class');
    });

    it('should call add with test-container-class', () => {
        expect(add).toBeCalledWith('test-container-class');
    });
});

describe('removeFromElementClass', () => {
    beforeAll(() => {
        setUpElementForClass(LIGHTBOX_CONTAINER, 'test-container-class');
        classListManager.removeFromElementClass(LIGHTBOX_CONTAINER, 'test-container-class');
    });

    it('should call remove with test-container-class', () => {
        expect(remove).toBeCalledWith('test-container-class');
    });
});

describe('addToElementInArrayAtIndexClass', () => {
    beforeAll(() => {
        setUpElementFromArrayAtIndexForClass(
            SOURCES,
            3,
            'test-source-class'
        );
        classListManager.addToElementInArrayAtIndexClass(
            SOURCES,
            3,
            'test-source-class'
        );
    });

    it('should call add with test-source-class', () => {
        expect(add).toBeCalledWith('test-source-class');
    });
});

describe('ifElementNotHasClassAddIt', () => {
    describe('element does not has class name', () => {
        beforeAll(() => {
            toReturnFromContains = true;
            setUpElementForClass(LIGHTBOX_CONTAINER, 'test-container-class');
            classListManager.ifElementNotHasClassAddIt(LIGHTBOX_CONTAINER, 'test-container-class');
        });

        it('should not call add', () => {
            expect(add).not.toBeCalled();
        });
    });

    describe('element has class name', () => {
        beforeAll(() => {
            toReturnFromContains = false;
            setUpElementForClass(LIGHTBOX_CONTAINER, 'test-container-class');
            classListManager.ifElementNotHasClassAddIt(LIGHTBOX_CONTAINER, 'test-container-class');
        });

        it('should not call add', () => {
            expect(add).toBeCalledWith('test-container-class');
        });
    });
});

describe('ifElementHasClassRemoveIt', () => {
    describe('element does not has class name', () => {
        beforeAll(() => {
            toReturnFromContains = false;
            setUpElementForClass(LIGHTBOX_CONTAINER, 'test-container-class');
            classListManager.ifElementHasClassRemoveIt(LIGHTBOX_CONTAINER, 'test-container-class');
        });

        it('should not call remove', () => {
            expect(remove).not.toBeCalled();
        });
    });

    describe('element has class name', () => {
        beforeAll(() => {
            toReturnFromContains = true;
            setUpElementForClass(LIGHTBOX_CONTAINER, 'test-container-class');
            classListManager.ifElementHasClassRemoveIt(LIGHTBOX_CONTAINER, 'test-container-class');
        });

        it('should not call remove', () => {
            expect(remove).toBeCalledWith('test-container-class');
        });
    });
});

describe('ifElementFromArrayAtIndexHasClassRemoveIt', () => {
    describe('element does not has class name', () => {
        beforeAll(() => {
            toReturnFromContains = false;
            setUpElementFromArrayAtIndexForClass(
                SOURCES_HOLDERS,
                2,
                'test-source-holder-class'
            );
            classListManager.ifElementFromArrayAtIndexHasClassRemoveIt(
                SOURCES_HOLDERS,
                2,
                'test-source-holder-class'
            );
        });

        it('should not call remove', () => {
            expect(remove).not.toBeCalled();
        });
    });

    describe('element has class list', () => {
        beforeAll(() => {
            toReturnFromContains = true;
            setUpElementFromArrayAtIndexForClass(
                SOURCES,
                5,
                'test-source-class'
            );
            classListManager.ifElementFromArrayAtIndexHasClassRemoveIt(
                SOURCES,
                5,
                'test-source-class'
            );
            classListManager.ifElementFromArrayAtIndexHasClassRemoveIt(SOURCES, 5, 'test-source-class');
        });

        it('should call remove', () => {
            expect(remove).toBeCalledWith('test-source-class');
        });
    });
});
