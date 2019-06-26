import React from 'react';
import { shallow } from "enzyme";
import SlideNumber from "../../../src/components/nav/SlideNumber";
import { testComponentStateForStateChainAndFsLightbox } from "../../__tests-helpers__/testComponentStateForStateChainAndFsLightbox";

const fsLightbox = {
    componentsStates: {
        slideNumberUpdater: {}
    },
    data: {
        sourcesCount: 4
    },
    stageIndexes: {
        current: 0
    }

};
let slideNumber = shallow(<SlideNumber fsLightbox={ fsLightbox }/>);

describe('SlideNumber dom', () => {
    it('should match snapshot', () => {
        expect(slideNumber).toMatchSnapshot();
    });
});

describe('slideNumberUpdater component state', () => {
    testComponentStateForStateChainAndFsLightbox('slideNumberUpdater', fsLightbox);
});
