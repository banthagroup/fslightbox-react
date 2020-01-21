import React from 'react';
import { shallow } from "enzyme/build";
import SlideSwipingHoverer from "./SlideSwipingHoverer";
import { ABSOLUTED_CLASS_NAME, FULL_DIMENSION_CLASS_NAME, PREFIX } from "../../constants/classes-names";

const fsLightbox = { componentsServices: {} };
const slideSwipingHoverer = shallow(<SlideSwipingHoverer fsLightbox={fsLightbox} />);

test('isSlideSwipingHovererShown DOM', () => {
    fsLightbox.componentsServices.showSlideSwipingHovererIfNotYet();
    expect(slideSwipingHoverer.getElement()).toEqual(
        <div className={`${PREFIX}slide-swiping-hoverer ${FULL_DIMENSION_CLASS_NAME} ${ABSOLUTED_CLASS_NAME}`} />
    );
    fsLightbox.componentsServices.hideSlideSwipingHovererIfShown();
    expect(slideSwipingHoverer.getElement()).toBeNull();
});
