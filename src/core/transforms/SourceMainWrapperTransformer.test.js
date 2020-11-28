import { SourceMainWrapperTransformer } from "./SourceMainWrapperTransformer";

const fsLightbox = {
    props: { slideDistance: .4 },
    elements: { sourceMainWrappers: [{ current: document.createElement('div') }] }
};
// window width for all tests is 1000
window.innerWidth = 1000;

const sourceMainWrapperTransformer = new SourceMainWrapperTransformer(fsLightbox, 0);
let sourceMainWrapperStyle;

beforeEach(() => {
    sourceMainWrapperStyle = fsLightbox.elements.sourceMainWrappers[0].current.style;
});

describe('default transforming (depends on window width and slide distance)', () => {
    test('negative', () => {
        sourceMainWrapperTransformer.negative();
        expect(sourceMainWrapperStyle.transform).toEqual('translateX(-1400px)');
    });

    test('zero', () => {
        sourceMainWrapperTransformer.zero();
        expect(sourceMainWrapperStyle.transform).toEqual('translateX(0px)');
    });

    test('positive', () => {
        sourceMainWrapperTransformer.positive();
        expect(sourceMainWrapperStyle.transform).toEqual('translateX(1400px)');
    });
});

describe('transforming by value (depends on give value, window width, and slide distance)', () => {
    test('negative', () => {
        sourceMainWrapperTransformer.byValue(100).negative();
        expect(sourceMainWrapperStyle.transform).toEqual('translateX(-1300px)');
    });

    test('zero', () => {
        sourceMainWrapperTransformer.byValue(100).zero();
        expect(sourceMainWrapperStyle.transform).toEqual('translateX(100px)');
    });

    test('zero', () => {
        sourceMainWrapperTransformer.byValue(100).positive();
        expect(sourceMainWrapperStyle.transform).toEqual('translateX(1500px)');
    });
});
