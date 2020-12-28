import React from 'react';
import { shallow } from "enzyme";
import SourceMainWrapper from "./SourceMainWrapper";
import Loader from "../helpers/Loader";
import SourceAnimationWrapper from "./SourceAnimationWrapper";

const fsLightbox = {
    componentsServices: { hideSourceLoaderCollection: [] },
    elements: { sourceMainWrappers: [React.createRef()] }
};
const sourceInner = shallow(<SourceMainWrapper fsLightbox={fsLightbox} i={0} />);

test('ref', () => {
    expect(sourceInner.getElement().ref).toBe(fsLightbox.elements.sourceMainWrappers[0]);
});

test('displaying Loader', () => {
    expect(sourceInner.children().getElements()).toEqual(
        [<Loader />, <SourceAnimationWrapper fsLightbox={fsLightbox} i={0} />]
    );
    fsLightbox.componentsServices.hideSourceLoaderCollection[0]();
    expect(sourceInner.children().getElements()).toEqual(
        [<SourceAnimationWrapper fsLightbox={fsLightbox} i={0} />]
    );
});
