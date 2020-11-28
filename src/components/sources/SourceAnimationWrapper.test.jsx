import React from 'react';
import { shallow } from "enzyme";
import SourceAnimationWrapper from "./SourceAnimationWrapper";
import Image from "./proper-sources/Image";

const fsLightbox = {
    componentsServices: { updateSourceDirectWrapperCollection: [] },
    core: { stageManager: { isSourceInStage: jest.fn(() => false) } },
    elements: { sourceAnimationWrappers: [null, React.createRef()], sourcesComponents: [] },
    props: { loadOnlyCurrentSource: true },
    stageIndexes: { current: 0 }
};

let sourceInner = shallow(<SourceAnimationWrapper fsLightbox={fsLightbox} i={1} />);

test('ref', () => {
    expect(sourceInner.getElement().ref).toBe(fsLightbox.elements.sourceAnimationWrappers[1]);
});

test('rendering source component', () => {
    expect(sourceInner.children()).toHaveLength(0);
    fsLightbox.elements.sourcesComponents[1] = <Image fsLightbox={fsLightbox} i={1} />;

    sourceInner = shallow(<SourceAnimationWrapper fsLightbox={fsLightbox} i={1} />);
    expect(sourceInner.children()).toHaveLength(0);

    fsLightbox.core.stageManager.isSourceInStage = () => true;
    fsLightbox.componentsServices.updateSourceDirectWrapperCollection[1]();
    expect(sourceInner.children()).toHaveLength(0);

    fsLightbox.props.loadOnlyCurrentSource = false;
    fsLightbox.componentsServices.updateSourceDirectWrapperCollection[1]();
    expect(sourceInner.children().at(0).getElement()).toEqual(fsLightbox.elements.sourcesComponents[1]);
});
