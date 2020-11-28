import { setUpSourceDisplayFacade } from "./setUpSourceDisplayFacade";

const fsLightbox = {
    core: { sourceDisplayFacade: {} },
    componentsServices: {
        updateSourceDirectWrapperCollection: [jest.fn(), jest.fn(), jest.fn(), jest.fn(), jest.fn()]
    },
    props: { loadOnlyCurrentSource: true },
    stageIndexes: { previous: 0, current: 3, next: 4 }
};

setUpSourceDisplayFacade(fsLightbox);
const sourceDisplayFacade = fsLightbox.core.sourceDisplayFacade;

test('displaySourcesWhichShouldBeDisplayed', () => {
    sourceDisplayFacade.displaySourcesWhichShouldBeDisplayed();
    expect(fsLightbox.componentsServices.updateSourceDirectWrapperCollection[0]).not.toBeCalled();
    expect(fsLightbox.componentsServices.updateSourceDirectWrapperCollection[1]).not.toBeCalled();
    expect(fsLightbox.componentsServices.updateSourceDirectWrapperCollection[2]).not.toBeCalled();
    expect(fsLightbox.componentsServices.updateSourceDirectWrapperCollection[3]).toBeCalled();
    expect(fsLightbox.componentsServices.updateSourceDirectWrapperCollection[4]).not.toBeCalled();

    fsLightbox.props.loadOnlyCurrentSource = false;
    setUpSourceDisplayFacade(fsLightbox);
    sourceDisplayFacade.displaySourcesWhichShouldBeDisplayed();
    expect(fsLightbox.componentsServices.updateSourceDirectWrapperCollection[0]).toBeCalled();
    expect(fsLightbox.componentsServices.updateSourceDirectWrapperCollection[1]).not.toBeCalled();
    expect(fsLightbox.componentsServices.updateSourceDirectWrapperCollection[2]).not.toBeCalled();
    expect(fsLightbox.componentsServices.updateSourceDirectWrapperCollection[3]).toBeCalled();
    expect(fsLightbox.componentsServices.updateSourceDirectWrapperCollection[4]).toBeCalled();
});
