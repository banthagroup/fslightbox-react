import { setUpScrollbarRecompensor } from "../../../src/core/scrollbar/setUpScrollbarRecompensor";

const scrollbarRecompensor = {};
const fsLightbox = {
    data: {
        scrollbarWidth: 0
    },
    core: {
        scrollbarRecompensor: scrollbarRecompensor
    }
};

describe('addRecompense - adding margin right to document element', () => {
    describe('body offsetHeight is lower than window height', () => {
        beforeAll(() => {
            window.innerHeight = 100;
            fsLightbox.data.scrollbarWidth = 100;
            document.documentElement.style.marginRight = '15px';
            setUpScrollbarRecompensor(fsLightbox);
            scrollbarRecompensor.addRecompense();
        });

        it('should not set margin right', () => {
            expect(document.documentElement.style.marginRight).toBe('15px');
        });
    });

    describe('body offsetHeight is bigger than window height', () => {
        beforeAll(() => {
            window.innerHeight = -100;
            fsLightbox.data.scrollbarWidth = 100;
            document.documentElement.style.marginRight = '20px';
            setUpScrollbarRecompensor(fsLightbox);
            scrollbarRecompensor.addRecompense();
        });

        it('should set margin right to scrollbar width', () => {
            expect(document.documentElement.style.marginRight).toBe('100px');
        });
    });
});

describe('removeRecompense - removing margin right from document element', () => {
    beforeAll(() => {
        document.documentElement.style.marginRight = '10px';
        setUpScrollbarRecompensor(fsLightbox);
        scrollbarRecompensor.removeRecompense();
    });

    it('should set margin right on document element ot 0px', () => {
        expect(document.documentElement.style.marginRight).toBe('0px');
    });
});