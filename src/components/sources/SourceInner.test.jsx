import React from 'react';
import { shallow } from "enzyme";
import SourceInner from "./SourceInner";
import Image from "./proper-sources/Image";

const fsLightbox = {
    componentsServices: { updateSourceInnerCollection: [] },
    core: { stageManager: { isSourceInStage: jest.fn(() => false) } },
    elements: { sourcesInners: [null, React.createRef()], sourcesComponents: [] }
};

let sourceInner = shallow(<SourceInner fsLightbox={ fsLightbox } i={ 1 }/>);

test('ref', () => {
    expect(sourceInner.getElement().ref).toBe(fsLightbox.elements.sourcesInners[1]);
});

test('rendering source component', () => {
    expect(sourceInner.children()).toHaveLength(0);
    fsLightbox.elements.sourcesComponents[1] = <Image fsLightbox={ fsLightbox } i={ 1 }/>;

    sourceInner = shallow(<SourceInner fsLightbox={ fsLightbox } i={ 1 }/>);
    expect(fsLightbox.core.stageManager.isSourceInStage).toBeCalledWith(1);
    expect(sourceInner.children()).toHaveLength(0);

    fsLightbox.core.stageManager.isSourceInStage = () => true;
    fsLightbox.componentsServices.updateSourceInnerCollection[1]();
    expect(sourceInner.children().at(0).getElement()).toEqual(fsLightbox.elements.sourcesComponents[1]);
});
