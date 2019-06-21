import { setUpSourceAnimator } from "../../../src/core/animations/setUpSourceAnimator";
import { FADE_IN_CLASS_NAME, FADE_OUT_CLASS_NAME, LONG_FADE_IN_CLASS_NAME } from "../../../src/constants/classes-names";

const fsLightbox = {
    data: {
        sourcesCount: null
    },
    core: {
        classListGetter: {},
        sourceAnimator: {}
    }
};

const sourcesClassLists = [
    {
        add: () => {},
        remove: () => {},
        contains: () => {}
    },
    {
        add: () => {},
        remove: () => {},
        contains: () => {}
    },
    {
        add: () => {},
        remove: () => {},
        contains: () => {}
    }
];
fsLightbox.core.classListGetter.getSourceClassListByIndex = (index) => {
    return sourcesClassLists[index];
};
const sourceAnimator = fsLightbox.core.sourceAnimator;

const setUp = () => {
    sourcesClassLists.forEach((classList) => {
        classList.add = jest.fn();
        classList.remove = jest.fn();
        classList.contains = jest.fn();
    });
    setUpSourceAnimator(fsLightbox);
};

describe('animateSourceFromIndex', () => {
    beforeAll(() => {
        setUp();
    });

    describe('fadeOut', () => {
        beforeAll(() => {
            sourceAnimator.animateSourceFromIndex(0).fadeOut();
        });

        it('should add fadeOut class', () => {
            expect(sourcesClassLists[0].add).toBeCalledWith(FADE_OUT_CLASS_NAME);
        });
    });

    describe('fadeIn', () => {
        beforeAll(() => {
            sourceAnimator.animateSourceFromIndex(1).fadeIn();
        });

        it('should add fadeIn class', () => {
            expect(sourcesClassLists[1].add).toBeCalledWith(FADE_IN_CLASS_NAME);
        });
    });

    describe('longFadeIn', () => {
        beforeAll(() => {
            sourceAnimator.animateSourceFromIndex(2).longFadeIn();
        });

        it('should add long fadeIn class', () => {
            expect(sourcesClassLists[2].add).toBeCalledWith(LONG_FADE_IN_CLASS_NAME);
        });
    });

    describe('removeFadeOut', () => {
        beforeAll(() => {
            sourceAnimator.animateSourceFromIndex(0).removeFadeOut();
        });

        it('should add fadeIn class', () => {
            expect(sourcesClassLists[0].remove).toBeCalledWith(FADE_OUT_CLASS_NAME);
        });
    });

    describe('removeFadeIn', () => {
        beforeAll(() => {
            setUp();
        });

        describe('sources do not have fadeIn', () => {
            beforeAll(() => {
                sourcesClassLists[0].contains = (className) => {
                    if (className === FADE_IN_CLASS_NAME || className === LONG_FADE_IN_CLASS_NAME) {
                        return false;
                    }
                };
                sourceAnimator.animateSourceFromIndex(0).removeFadeIn();
            });

            it('should not remove fadeIn classes', () => {
                expect(sourcesClassLists[0].remove).not.toBeCalled();
            });
        });

        describe('sources have fadeIn classes', () => {
            beforeAll(() => {
                sourcesClassLists[0].contains = (className) => {
                    if (className === FADE_IN_CLASS_NAME || className === LONG_FADE_IN_CLASS_NAME) {
                        return true;
                    }
                };
                sourceAnimator.animateSourceFromIndex(0).removeFadeIn();
            });

            it('should remove fadeIn and longFadeIn classes', () => {
                expect(sourcesClassLists[0].remove).toBeCalledWith(FADE_IN_CLASS_NAME);
                expect(sourcesClassLists[0].remove).toBeCalledWith(LONG_FADE_IN_CLASS_NAME);
            });
        });
    });
});

describe('removeFadeOutFromAllSources', () => {
    beforeAll(() => {
        fsLightbox.data.sourcesCount = 3;
        setUp();
        sourcesClassLists[0].contains = () => false;
        sourcesClassLists[1].contains = () => true;
        sourcesClassLists[2].contains = () => true;
        sourceAnimator.removeFadeOutFromAllSources();
    });

    it('should not call remove for first source', () => {
        expect(sourcesClassLists[0].remove).not.toBeCalled();
    });

    it('should call remove with FADE_OUT_CLASS_NAME for second source', () => {
        expect(sourcesClassLists[1].remove).toBeCalledWith(FADE_OUT_CLASS_NAME);
    });

    it('should call remove with FADE_OUT_CLASS_NAME for third source', () => {
        expect(sourcesClassLists[2].remove).toBeCalledWith(FADE_OUT_CLASS_NAME);
    });
});

