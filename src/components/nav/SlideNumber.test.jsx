import React from 'react';
import { shallow } from "enzyme";
import SlideNumber from "./SlideNumber";
import { testComponentStateForStateChainAndFsLightbox } from "../../../tests/__tests-helpers__/testComponentStateForStateChainAndFsLightbox";

const fsLightbox = {
    componentsServices: {
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

describe('SlideNumber', () => {
    testComponentStateForStateChainAndFsLightbox('slideNumberUpdater', fsLightbox);
});

