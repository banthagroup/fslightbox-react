import { SourceComponentGetter } from "../../../../src/core/sources/creating/SourceComponentGetter";
import { CreatingSourcesActions } from "../../../../src/core/sources/creating/CreatingSourcesActions";

const fsLightbox = {
    getState: () => fsLightboxState,
    componentsStates: {
        shouldSourceHolderBeUpdatedCollection: [],
    },
    elements: {
        sourcesComponents: []
    },
    injector: {
        injectDependency: (constructor) => {
            if (constructor === SourceComponentGetter)
                return sourceComponentGetter;
        }
    }
};
const fsLightboxState = {
    isOpen: false
};
const sourceComponentGetter = {
    setSourceIndex: () => {},
    setSourceType: () => {},
    getSourceComponent: () => ({
        key: 'source-component'
    })
};
let creatingSourcesActions;

const createNewCreatingSourcesActionsAndCallRunActionsWith = (type, index) => {
    creatingSourcesActions = new CreatingSourcesActions(fsLightbox);
    creatingSourcesActions.runActionsForSourceTypeAndIndex(type, index);
};

describe('runActionsForSourceTypeAndIndex', () => {
    describe('createSourceComponent', () => {
        beforeAll(() => {
            sourceComponentGetter.setSourceIndex = jest.fn();
            sourceComponentGetter.setSourceType = jest.fn();
            createNewCreatingSourcesActionsAndCallRunActionsWith('image', 10);
        });

        it('should call setSourceIndex with passed index', () => {
            expect(sourceComponentGetter.setSourceIndex).toBeCalledWith(10);
        });

        it('should call setSourceType with passed type', () => {
            expect(sourceComponentGetter.setSourceType).toBeCalledWith('image');
        });

        it(`should add sourceComponent form getSourceComponent method to sourcesComponents array
            at passed index`, () => {
            expect(fsLightbox.elements.sourcesComponents[10]).toEqual({
                key: 'source-component'
            });
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
