import { SourceHolderTransformer } from "../../../src/core/transforms/SourceHolderTransformer";

const fsLightbox = {
    sourcesData: {
        slideDistance: 0
    },
    elements: {
        sourceHolders: [{
            current: document.createElement('div')
        }]
    }
};
// window width for all tests is 1000
window.innerWidth = 1000;
// slide distance for all tests is .4
fsLightbox.sourcesData.slideDistance = .4;
const sourceHolderTransformer = new SourceHolderTransformer(fsLightbox);
let mockSourceHolderStyle;

beforeEach(() => {
    sourceHolderTransformer.setSourceHolder(fsLightbox.elements.sourceHolders[0]);
    mockSourceHolderStyle = fsLightbox.elements.sourceHolders[0].current.style;
});

describe('default transforming (depends on window width and slide distance)', () => {
    describe('negative', () => {
        beforeEach(() => {
            sourceHolderTransformer.negative();
        });

        it('should add correct negative transform', () => {
            expect(mockSourceHolderStyle.transform).toEqual('translate(-1400px,0)');
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
            expect(mockSourceHolderStyle.transform).toEqual('translate(1400px,0)');
        });
    });
});

describe('transforming by value (depends on give value, window width, and slide distance)', () => {
    describe('negative', () => {
        beforeEach(() => {
            sourceHolderTransformer.byValue(100).negative();
        });

        it('should add correct negative transform', () => {
            expect(mockSourceHolderStyle.transform).toEqual('translate(-1300px,0)');
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
            expect(mockSourceHolderStyle.transform).toEqual('translate(1500px,0)');
        });
    });
});