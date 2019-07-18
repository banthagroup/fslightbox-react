import React from 'react';
import { shallow } from "enzyme";
import SwipingInvisibleHover from "./SwipingInvisibleHover";
import { testComponentStateForStateChainAndFsLightbox } from "../../../tests/__tests-helpers__/testComponentStateForStateChainAndFsLightbox";

const fsLightbox = {
    data: {
        sourcesCount: 4
    },
    componentsStates: {
        hasMovedWhileSwiping: {}
    }
};
let swipingInvisibleHover = shallow(<SwipingInvisibleHover fsLightbox={ fsLightbox }/>);

testComponentStateForStateChainAndFsLightbox('hasMovedWhileSwiping', fsLightbox);

describe('hasMovedWhileSwiping DOM', () => {
    test('user is not swipingSlides', () => {
        fsLightbox.componentsStates.hasMovedWhileSwiping.set(false);
        expect(swipingInvisibleHover.html()).toBeNull();
    });

    test('user is swiping slides', () => {
        fsLightbox.componentsStates.hasMovedWhileSwiping.set(true);
        expect(swipingInvisibleHover).toMatchSnapshot();
    });
});
