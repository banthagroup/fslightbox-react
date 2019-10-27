import React from 'react';
import { shallow } from "enzyme";
import SourceInner from "./SourceInner";
import Image from "./proper-sources/Image";

const fsLightbox = {
    componentsServices: { displaySourceIfNotYetCollection: [] },
    elements: { sourcesInners: [React.createRef()], sourcesComponents: [] }
};

const sourceInner = shallow(<SourceInner fsLightbox={ fsLightbox } i={ 0 }/>);

test('ref', () => {
    expect(sourceInner.getElement().ref).toBe(fsLightbox.elements.sourcesInners[0]);
});

test('rendering source component', () => {
    expect(sourceInner.children()).toHaveLength(0);
    fsLightbox.elements.sourcesComponents[0] = <Image fsLightbox={ fsLightbox } i={ 0 }/>;
    fsLightbox.componentsServices.displaySourceIfNotYetCollection[0]();
    expect(sourceInner.childAt(0).getElement()).toEqual(fsLightbox.elements.sourcesComponents[0]);
});
