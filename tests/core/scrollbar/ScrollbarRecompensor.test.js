import { ScrollbarRecompensor } from "../../../src/core/scrollbar/ScrollbarRecompensor";

const fsLightbox = {
    data: {
        scrollbarWidth: 0
    }
};

/** @var { ScrollbarRecompensor } scrollbarRecompensor */
let scrollbarRecompensor;

describe('addRecompense - adding margin right to document element', () => {
    beforeAll(() => {
        fsLightbox.data.scrollbarWidth = 50;
        scrollbarRecompensor = new ScrollbarRecompensor(fsLightbox);
        scrollbarRecompensor.addRecompense();
    });

    it('should add margin right to document element', () => {
        expect(document.documentElement.style.marginRight).toBe('50px');
    });
});

describe('removeRecompense - removing margin right from document element', () => {
    beforeAll(() => {
        document.documentElement.style.marginRight = '10px';
        scrollbarRecompensor = new ScrollbarRecompensor(fsLightbox);
        scrollbarRecompensor.removeRecompense();
    });

    it('should set margin right on document element ot 0px', () => {
        expect(document.documentElement.style.marginRight).toBe('0px');
    });
});