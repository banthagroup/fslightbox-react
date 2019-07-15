import { setUpStageManager } from "../../../src/core/stage/setUpStageManager";

const fsLightbox = {
    stageIndexes: {
        previous: undefined,
        current: undefined,
        next: undefined
    },
    data: {
        sourcesCount: 0
    },
    core: {
        stageManager: {}
    }
};
const stageManager = fsLightbox.core.stageManager;

const setUpStageManagerAndCallUpdateStageIndexes = () => {
    setUpStageManager(fsLightbox);
    stageManager.updateStageIndexes();
};

describe('isSourceInStage', () => {
    beforeAll(() => {
        fsLightbox.data.sourcesCount = 10;
        setUpStageManager(fsLightbox);
    });

    it('should detect that sources in stage when its middle slide', () => {
        fsLightbox.stageIndexes.current = 4;
        expect(stageManager.isSourceInStage(0)).toBeFalsy();
        expect(stageManager.isSourceInStage(1)).toBeFalsy();
        expect(stageManager.isSourceInStage(2)).toBeFalsy();
        expect(stageManager.isSourceInStage(3)).toBeTruthy();
        expect(stageManager.isSourceInStage(4)).toBeTruthy();
        expect(stageManager.isSourceInStage(5)).toBeTruthy();
        expect(stageManager.isSourceInStage(6)).toBeFalsy();
        expect(stageManager.isSourceInStage(7)).toBeFalsy();
        expect(stageManager.isSourceInStage(8)).toBeFalsy();
        expect(stageManager.isSourceInStage(9)).toBeFalsy();
    });

    it('should detect that previous sources is in stage when slide = 1', () => {
        fsLightbox.stageIndexes.current = 0;
        expect(stageManager.isSourceInStage(9)).toBeTruthy();
    });

    it('should detect that next sources is in stage when slide = lastSourceIndex', () => {
        fsLightbox.stageIndexes.current = 9;
        expect(stageManager.isSourceInStage(0)).toBeTruthy();
    });

    describe('there are only 3 slides', () => {
        beforeAll(() => {
            fsLightbox.data.sourcesCount = 3;
            setUpStageManager(fsLightbox);
        });

        it('should return true for every sources', () => {
            expect(stageManager.isSourceInStage(0)).toBe(true);
            expect(stageManager.isSourceInStage(1)).toBe(true);
            expect(stageManager.isSourceInStage(2)).toBe(true);
        });
    });
});

describe('updateStageIndexes', () => {
    describe('there is only one slide', () => {
        beforeAll(() => {
            fsLightbox.data.sourcesCount = 1;
            setUpStageManagerAndCallUpdateStageIndexes();
        });

        it('should leave undefined for next and previous', () => {
            expect(fsLightbox.stageIndexes.previous).toBeUndefined();
            expect(fsLightbox.stageIndexes.next).toBeUndefined();
        });
    });

    describe('there are two slides', () => {
        beforeAll(() => {
            fsLightbox.data.sourcesCount = 2;
        });

        describe('current slide = 1', () => {
            beforeAll(() => {
                fsLightbox.stageIndexes.current = 0;
                setUpStageManagerAndCallUpdateStageIndexes();
            });

            it('should set valid stage indexes', () => {
                expect(fsLightbox.stageIndexes.previous).toBeUndefined();
                expect(fsLightbox.stageIndexes.next).toBe(1);
            });
        });

        describe('current slide = 2', () => {
            beforeAll(() => {
                fsLightbox.stageIndexes.current = 1;
                setUpStageManagerAndCallUpdateStageIndexes();
            });

            it('should set valid stage indexes', () => {
                expect(fsLightbox.stageIndexes.previous).toBe(0);
                expect(fsLightbox.stageIndexes.next).toBeUndefined();
            });
        });
    });

    describe('there are 3 slides', () => {
        beforeAll(() => {
            fsLightbox.data.sourcesCount = 3;
        });

        describe('current slide = 1', () => {
            beforeAll(() => {
                fsLightbox.stageIndexes.current = 0;
                setUpStageManagerAndCallUpdateStageIndexes();
            });

            it('should set valid stage indexes', () => {
                expect(fsLightbox.stageIndexes).toEqual({
                    previous: 2,
                    current: 0,
                    next: 1
                });
            });
        });

        describe('current slide = 2', () => {
            beforeAll(() => {
                fsLightbox.stageIndexes.current = 1;
                setUpStageManagerAndCallUpdateStageIndexes();
            });

            it('should set valid stage indexes', () => {
                expect(fsLightbox.stageIndexes).toEqual({
                    previous: 0,
                    current: 1,
                    next: 2
                });
            });
        });

        describe('current slide = 3', () => {
            beforeAll(() => {
                fsLightbox.stageIndexes.current = 2;
                setUpStageManagerAndCallUpdateStageIndexes();
            });

            it('should set valid stage indexes', () => {
                expect(fsLightbox.stageIndexes).toEqual({
                    previous: 1,
                    current: 2,
                    next: 0
                });
            });
        });
    });
});
