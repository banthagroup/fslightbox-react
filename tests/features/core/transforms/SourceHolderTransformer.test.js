import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";
import { SourceHolderTransformer } from "../../../../src/core/transforms/SourceHolderTransformer";

const fsLightboxMock = new FsLightboxMock();
const fsLightbox = fsLightboxMock.getFsLightbox();
// window width for all tests is 1000
window.innerWidth = 1000;
// slide distance for all tests is 1
fsLightbox.sourcesData.slideDistance = 1;
const sourceHolderTransformer = new SourceHolderTransformer(fsLightbox);
let mockSourceHolderStyle;

beforeEach(() => {
    // resetting all sources holders
    fsLightboxMock.setAllSourceHoldersToDivs();
    sourceHolderTransformer.setSourceHolder(fsLightbox.elements.sourceHolders[0]);
    mockSourceHolderStyle = fsLightbox.elements.sourceHolders[0].current.style;
});

describe('default transforming (depends on window width and slide distance)', () => {
    describe('negative', () => {
        beforeEach(() => {
            sourceHolderTransformer.negative();
        });

        it('should add correct negative transform', () => {
            expect(mockSourceHolderStyle.transform).toEqual('translate(-1000px,0)');
        });
    });

    describe('zero', () => {
        beforeEach(() => {
            sourceHolderTransformer.zero();
        });

        it('should add correct negative transform', () => {
            expect(mockSourceHolderStyle.transform).toEqual('translate(0px,0)');
        });
    });

    describe('positive', () => {
        beforeEach(() => {
            sourceHolderTransformer.positive();
        });

        it('should add correct negative transform', () => {
            expect(mockSourceHolderStyle.transform).toEqual('translate(1000px,0)');
        });
    });
});

describe('transforming by value (depends on give value, window width, and slide distance)', () => {
    describe('negative', () => {
        beforeEach(() => {
            sourceHolderTransformer.byValue(100).negative();
        });

        it('should add correct negative transform', () => {
            expect(mockSourceHolderStyle.transform).toEqual('translate(-900px,0)');
        });
    });

    describe('zero', () => {
        beforeEach(() => {
            sourceHolderTransformer.byValue(100).zero();
        });

        it('should add correct zero transform', () => {
            expect(mockSourceHolderStyle.transform).toEqual('translate(100px,0)');
        });
    });


    describe('positive', () => {
        beforeEach(() => {
            sourceHolderTransformer.byValue(100).positive();
        });

        it('should add correct positive transform', () => {
            expect(mockSourceHolderStyle.transform).toEqual('translate(1100px,0)');
        });
    });
});