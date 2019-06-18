import { SourceHolderTransformer } from "../../../src/core/transforms/SourceHolderTransformer";

const fsLightbox = {
    data: {
        slideDistance: 0
    },
    elements: {
        sourcesHolders: [
            {
                current: document.createElement('div')
            }
        ]
    }
};
// window width for all tests is 1000
window.innerWidth = 1000;
// slide distance for all tests is .4
fsLightbox.data.slideDistance = .4;

const sourceHolderTransformer = new SourceHolderTransformer(fsLightbox);
let sourceHolderStyle;

beforeEach(() => {
    sourceHolderTransformer.setSourceHolder(fsLightbox.elements.sourcesHolders[0]);
    sourceHolderStyle = fsLightbox.elements.sourcesHolders[0].current.style;
});

describe('default transforming (depends on window width and slide distance)', () => {
    it('should ', () => {
        const obj = {
            method: () => {

            }
        };
        obj['method']();
    });

    describe('negative', () => {
        beforeEach(() => {
            sourceHolderTransformer.negative();
        });

        it('should add correct negative transform', () => {
            expect(sourceHolderStyle.transform).toEqual('translateX(-1400px)');
        });
    });

    describe('zero', () => {
        beforeEach(() => {
            sourceHolderTransformer.zero();
        });

        it('should add correct negative transform', () => {
            expect(sourceHolderStyle.transform).toEqual('translateX(0px)');
        });
    });

    describe('positive', () => {
        beforeEach(() => {
            sourceHolderTransformer.positive();
        });

        it('should add correct negative transform', () => {
            expect(sourceHolderStyle.transform).toEqual('translateX(1400px)');
        });
    });
});

describe('transforming by value (depends on give value, window width, and slide distance)', () => {
    describe('negative', () => {
        beforeEach(() => {
            sourceHolderTransformer.byValue(100).negative();
        });

        it('should add correct negative transform', () => {
            expect(sourceHolderStyle.transform).toEqual('translateX(-1300px)');
        });
    });

    describe('zero', () => {
        beforeEach(() => {
            sourceHolderTransformer.byValue(100).zero();
        });

        it('should add correct zero transform', () => {
            expect(sourceHolderStyle.transform).toEqual('translateX(100px)');
        });
    });


    describe('positive', () => {
        beforeEach(() => {
            sourceHolderTransformer.byValue(100).positive();
        });

        it('should add correct positive transform', () => {
            expect(sourceHolderStyle.transform).toEqual('translateX(1500px)');
        });
    });
});
