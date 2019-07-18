import { getInitialCurrentIndex } from "./getInitialCurrentIndex";

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

test('no slide controlling prop is set', () => {
    delete fsLightbox.props.slide;
    delete fsLightbox.props.sourceIndex;
    delete fsLightbox.props.source;
    retrievedIndex = getInitialCurrentIndex(fsLightbox);

    expect(retrievedIndex).toBe(0);
});

test('slide = 5, sourceIndex = undefined, source = undefined', () => {
    fsLightbox.props.slide = 5;
    delete fsLightbox.props.sourceIndex;
    delete fsLightbox.props.source;
    retrievedIndex = getInitialCurrentIndex(fsLightbox);

    expect(retrievedIndex).toBe(4);
});


test('slide = 5, sourceIndex = 10, source = undefined', () => {
    fsLightbox.props.slide = 5;
    fsLightbox.props.sourceIndex = 10;
    delete fsLightbox.props.source;
    retrievedIndex = getInitialCurrentIndex(fsLightbox);

    expect(retrievedIndex).toBe(10);
});

test('slide = 5, sourceIndex = 10, source = source url at index 15', () => {
    fsLightbox.props.slide = 5;
    fsLightbox.props.sourceIndex = 10;
    for (let i = 0; i < 30; i++) {
        (i === 15) ?
            fsLightbox.data.sources[i] = 'chosen-source-url' :
            fsLightbox.data.sources[i] = 'random-source-url'
    }
    fsLightbox.props.source = 'chosen-source-url';
    retrievedIndex = getInitialCurrentIndex(fsLightbox);

    expect(retrievedIndex).toBe(15);
});
