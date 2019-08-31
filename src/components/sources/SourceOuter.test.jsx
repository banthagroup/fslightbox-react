import React from 'react';
import { shallow } from "enzyme";
import { testComponentStateForStateChainAndFsLightbox } from "../../../tests/__tests-helpers__/testComponentStateForStateChainAndFsLightbox";
import Image from "./proper-sources/Image";
import SourceOuter from "./SourceOuter";
import Loader from "../Loader";

const fsLightbox = {
    componentsStates: { isSourceLoadedCollection: [] },
    elements: { sourcesOuters: [React.createRef()], sourcesComponents: [] }
};

const sourceInner = shallow(<SourceOuter fsLightbox={ fsLightbox } i={ 0 } />);

testComponentStateForStateChainAndFsLightbox('isSourceLoadedCollection.0', fsLightbox);

test('ref', () => {
    expect(sourceInner.getElement().ref).toBe(fsLightbox.elements.sourcesOuters[0]);
});

test('rendering source component', () => {
    expect(sourceInner.children().getElements()).toEqual([<Loader />]);
    fsLightbox.elements.sourcesComponents[0] = <Image fsLightbox={ fsLightbox } i={ 0 } />;
    fsLightbox.componentsStates.isSourceLoadedCollection[0].set(true);
    expect(sourceInner.children().getElements()).toEqual([fsLightbox.elements.sourcesComponents[0]]);
});
