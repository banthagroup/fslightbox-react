import { SourceHolderTransformer } from "./SourceHolderTransformer";

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
    test('negative', () => {
        sourceHolderTransformer.negative();
        expect(sourceHolderStyle.transform).toEqual('translateX(-1400px)');
    });

    test('zero', () => {
        sourceHolderTransformer.zero();
        expect(sourceHolderStyle.transform).toEqual('translateX(0px)');
    });

    test('positive', () => {
        sourceHolderTransformer.positive();
        expect(sourceHolderStyle.transform).toEqual('translateX(1400px)');
    });
});

describe('transforming by value (depends on give value, window width, and slide distance)', () => {
    test('negative', () => {
        sourceHolderTransformer.byValue(100).negative();
        expect(sourceHolderStyle.transform).toEqual('translateX(-1300px)');
    });

    test('zero', () => {
        sourceHolderTransformer.byValue(100).zero();
        expect(sourceHolderStyle.transform).toEqual('translateX(100px)');
    });

    test('zero', () => {
        sourceHolderTransformer.byValue(100).positive();
        expect(sourceHolderStyle.transform).toEqual('translateX(1500px)');
    });
});
