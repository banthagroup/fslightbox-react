import { getInitialCurrentIndex } from "../../../src/core/stage/getInitialCurrentIndex";

const fsLightbox = {
    props: {
        slide: null,
        sourceIndex: null,
        source: null
    },
    data: {
        sources: [],
    }
};
let retrievedIndex;

describe('no slide controlling prop is set', () => {
    beforeAll(() => {
        delete fsLightbox.props.slide;
        delete fsLightbox.props.sourceIndex;
        delete fsLightbox.props.source;
        retrievedIndex = getInitialCurrentIndex(fsLightbox);
    });

    it('should return a default value which is 0', () => {
        expect(retrievedIndex).toBe(0);
    });
});

describe('slide = 5, sourceIndex = undefined, source = undefined', () => {
    beforeAll(() => {
        fsLightbox.props.slide = 5;
        delete fsLightbox.props.sourceIndex;
        delete fsLightbox.props.source;
        retrievedIndex = getInitialCurrentIndex(fsLightbox);
    });

    it('return 4 (slide number - 1)', () => {
        expect(retrievedIndex).toBe(4);
    });
});


describe('slide = 5, sourceIndex = 10, source = undefined', () => {
    beforeAll(() => {
        fsLightbox.props.slide = 5;
        fsLightbox.props.sourceIndex = 10;
        delete fsLightbox.props.source;
        retrievedIndex = getInitialCurrentIndex(fsLightbox);
    });

    it('should return 10', () => {
        expect(retrievedIndex).toBe(10);
    });
});

describe('slide = 5, sourceIndex = 10, source = source url at index 15', () => {
    beforeAll(() => {
        fsLightbox.props.slide = 5;
        fsLightbox.props.sourceIndex = 10;
        for (let i = 0; i < 30; i++) {
            (i === 15) ?
                fsLightbox.data.sources[i] = 'chosen-source-url' :
                fsLightbox.data.sources[i] = 'random-source-url'
        }
        fsLightbox.props.source = 'chosen-source-url';
        retrievedIndex = getInitialCurrentIndex(fsLightbox);
    });

    it('should return 15', () => {
        expect(retrievedIndex).toBe(15);
    });
});
