import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";
import { StageSourceHoldersTransformer } from "../../../../src/core/transforms/stage-source-holders-transformers/StageSourceHoldersTransformer";
import { Stage } from "../../../../src/core/stage/Stage";

describe('current sources transforming', () => {
    const fsLightboxMock = new FsLightboxMock();
    fsLightboxMock.instantiateNewFsLightbox();
    fsLightboxMock.setAllSourceHoldersToDivs();
    const fsLightbox = fsLightboxMock.getFsLightbox();

    it('should transform current sources to (0,0)', () => {
        fsLightbox.state.slide = 1;
        expect(fsLightbox.elements.sourceHolders[0].current.style.transform).toEqual("");
        // we transform to zero on construct because there is always current sources
        new StageSourceHoldersTransformer(fsLightbox);
        expect(fsLightbox.elements.sourceHolders[0].current.style.transform).toEqual("translate(0px,0)");
    });
});

let stageSourcesIndexes;
const fsLightboxMock = new FsLightboxMock();
fsLightboxMock.instantiateNewFsLightbox();
fsLightboxMock.setAllSourceHoldersToDivs();
const fsLightbox = fsLightboxMock.getFsLightbox();
const stageSourceHoldersTransformer = new StageSourceHoldersTransformer(fsLightbox);
const stageSources = new Stage(fsLightbox);
stageSourcesIndexes = stageSources.getAllStageIndexes();

const setUpNewSourceHoldersToClearTransforms = () => {
    fsLightboxMock.setAllSourceHoldersToDivs();
};

describe('without timeout transforming', () => {
    beforeEach(() => {
        setUpNewSourceHoldersToClearTransforms();
        stageSourceHoldersTransformer.withoutTimeout();
    });

    it('should transform previous sources to negative value without timeout', () => {
        expect(fsLightbox.elements.sourceHolders[stageSourcesIndexes.previous].current.style.transform)
            .toEqual('translate(' + (-fsLightbox.sourcesData.slideDistance * window.innerWidth) + 'px,0)');
    });

    it('should transform next sources to positive value without timeout', () => {
        expect(fsLightbox.elements.sourceHolders[stageSourcesIndexes.next].current.style.transform)
            .toEqual('translate(' + (fsLightbox.sourcesData.slideDistance * window.innerWidth) + 'px,0)');
    });
});


describe('with timeout transforming', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        setUpNewSourceHoldersToClearTransforms();
        stageSourceHoldersTransformer.withTimeout();
    });

    describe('not calling transform due to timer doesnt stopped', () => {
        it('should not transform previous sources', () => {
            expect(fsLightbox.elements.sourceHolders[stageSourcesIndexes.previous].current.style.transform)
                .toEqual("");
        });

        it('should not transform next sources', () => {
            expect(fsLightbox.elements.sourceHolders[stageSourcesIndexes.next].current.style.transform)
                .toEqual("");
        });
    });

    describe('calling transform after timers end',() => {
        beforeEach(() => {
            jest.runAllTimers();
        });

        it('should transform previous sources to negative value', () => {
            jest.runAllTimers();
            expect(fsLightbox.elements.sourceHolders[stageSourcesIndexes.previous].current.style.transform)
                .toEqual('translate(' + (-fsLightbox.sourcesData.slideDistance * window.innerWidth) + 'px,0)');
        });

        it('should transform next sources to positive value', () => {
            jest.runAllTimers();
            expect(fsLightbox.elements.sourceHolders[stageSourcesIndexes.next].current.style.transform)
                .toEqual('translate(' + (fsLightbox.sourcesData.slideDistance * window.innerWidth) + 'px,0)');
        });
    });
});