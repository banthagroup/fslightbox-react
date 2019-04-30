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
    beforeAll(() => {
        fsLightbox.data.scrollbarWidth = 50;
        setUpScrollbarRecompensor(fsLightbox);
        scrollbarRecompensor.addRecompense();
    });

    it('should add margin right to document element', () => {
        expect(document.documentElement.style.marginRight).toBe('50px');
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