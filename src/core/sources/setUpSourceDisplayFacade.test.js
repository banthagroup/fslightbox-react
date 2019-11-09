import { setUpSourceDisplayFacade } from "./setUpSourceDisplayFacade";

const fsLightbox = {
    core: { sourceDisplayFacade: {} },
    componentsServices: {
        updateSourceInnerCollection: [jest.fn(), jest.fn(), jest.fn(), jest.fn(), jest.fn()]
    },
    stageIndexes: { previous: 0, current: 3, next: 4 }
};

setUpSourceDisplayFacade(fsLightbox);
const sourceDisplayFacade = fsLightbox.core.sourceDisplayFacade;

test('displayStageSourcesIfNotYet', () => {
    sourceDisplayFacade.displayStageSourcesIfNotYet();
    expect(fsLightbox.componentsServices.updateSourceInnerCollection[0]).toBeCalled();
    expect(fsLightbox.componentsServices.updateSourceInnerCollection[1]).not.toBeCalled();
    expect(fsLightbox.componentsServices.updateSourceInnerCollection[2]).not.toBeCalled();
    expect(fsLightbox.componentsServices.updateSourceInnerCollection[3]).toBeCalled();
    expect(fsLightbox.componentsServices.updateSourceInnerCollection[4]).toBeCalled();
});
