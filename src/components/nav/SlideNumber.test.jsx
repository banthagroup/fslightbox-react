import React from 'react';
import { shallow } from "enzyme";
import SlideNumber from "./SlideNumber";
import { testComponentStateForStateChainAndFsLightbox } from "../../../tests/__tests-services__/testComponentStateForStateChainAndFsLightbox";

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
shallow(<SlideNumber fsLightbox={ fsLightbox }/>);

describe('SlideNumber', () => {
    testComponentStateForStateChainAndFsLightbox('slideNumberUpdater', fsLightbox);
});

