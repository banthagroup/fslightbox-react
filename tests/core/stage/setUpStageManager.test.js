import { setUpStageManager } from "../../../src/core/stage/setUpStageManager";

const fsLightbox = {
    stageIndexes: {
        previous: undefined,
        current: undefined,
        next: undefined
    },
    data: {
        lastSourceIndex: 0
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
        fsLightbox.data.lastSourceIndex = 9;
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
            fsLightbox.data.lastSourceIndex = 2;
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
    describe('lastSourceIndex = 0', () => {
        beforeAll(() => {
            fsLightbox.data.lastSourceIndex = 0;
            setUpStageManagerAndCallUpdateStageIndexes();
        });

        it('should leave undefined for next and previous', () => {
            expect(fsLightbox.stageIndexes.previous).toBeUndefined();
            expect(fsLightbox.stageIndexes.next).toBeUndefined();
        });
    });

    describe('lastSourceIndex = 1', () => {
        beforeAll(() => {
            fsLightbox.data.lastSourceIndex = 1;
        });

        describe('fsLightbox.stageIndexes.current = 0', () => {
            beforeAll(() => {
                fsLightbox.stageIndexes.current = 0;
                setUpStageManagerAndCallUpdateStageIndexes();
            });

            it('should set next index to 1', () => {
                expect(fsLightbox.stageIndexes.next).toBe(1);
            });

            it('should delete previous index property', () => {
                expect(fsLightbox.stageIndexes.previous).toBeUndefined();
            });
        });

        describe('fsLightbox.stageIndexes.current = 1', () => {
            beforeAll(() => {
                fsLightbox.stageIndexes.current = 1;
                setUpStageManagerAndCallUpdateStageIndexes();
            });

            it('should set previous index to 0', () => {
                expect(fsLightbox.stageIndexes.previous).toBe(0);
            });

            it('should delete next index property', () => {
                expect(fsLightbox.stageIndexes.next).toBeUndefined();
            });
        });
    });

    describe('lastSourceIndex = 2', () => {
        beforeAll(() => {
            fsLightbox.data.lastSourceIndex = 2;
        });

        describe('fsLightbox.stageIndexes.current = 0', () => {
            beforeAll(() => {
                fsLightbox.stageIndexes.current = 0;
                setUpStageManagerAndCallUpdateStageIndexes();
            });

            it('should set right indexes', () => {
                expect(fsLightbox.stageIndexes).toEqual({
                    previous: 2,
                    current: 0,
                    next: 1
                });
            });
        });

        describe('fsLightbox.stageIndexes.current = 1', () => {
            beforeAll(() => {
                fsLightbox.stageIndexes.current = 1;
                setUpStageManagerAndCallUpdateStageIndexes();
            });

            it('should set right indexes', () => {
                expect(fsLightbox.stageIndexes).toEqual({
                    previous: 0,
                    current: 1,
                    next: 2
                });
            });
        });

        describe('fsLightbox.stageIndexes.current = 2', () => {
            beforeAll(() => {
                fsLightbox.stageIndexes.current = 2;
                setUpStageManagerAndCallUpdateStageIndexes();
            });

            it('should set right indexes', () => {
                expect(fsLightbox.stageIndexes).toEqual({
                    previous: 1,
                    current: 2,
                    next: 0
                });
            });
        });
    });
});
