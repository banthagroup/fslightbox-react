import { setUpSourcesHoldersTransformingFacade } from "../../../src/core/transforms/setUpSourcesHoldersTransformingFacade";

const fsLightbox = {
    data: {
        lastSourceIndex: 0
    },
    stageIndexes: {
        previous: undefined,
        current: undefined,
        next: undefined
    },
    collections: {
        sourcesHoldersTransformers: []
    },
    core: {
        sourcesHoldersTransformingFacade: {}
    }
};

const sourcesHoldersTransformingFacade = fsLightbox.core.sourcesHoldersTransformingFacade;
const sourcesHoldersTransformersCollection = fsLightbox.collections.sourcesHoldersTransformers;

const setUpStageSourcesHoldersTransformerAndCallTransformWithoutTimeout = () => {
    setUpSourcesHoldersTransformingFacade(fsLightbox);
    sourcesHoldersTransformingFacade.transform().withoutTimeout();
};


describe('withoutTimeout', () => {
    beforeAll(() => {
        fsLightbox.stageIndexes = {
            previous: 0,
            current: 1,
            next: 2
        };
        fsLightbox.data.lastSourceIndex = 2;
        sourcesHoldersTransformersCollection[0] = {
            negative: jest.fn()
        };
        sourcesHoldersTransformersCollection[1] = {
            zero: jest.fn()
        };
        sourcesHoldersTransformersCollection[2] = {
            positive: jest.fn()
        };
        setUpStageSourcesHoldersTransformerAndCallTransformWithoutTimeout();
    });

    it('should call transforms instantly', () => {
        expect(sourcesHoldersTransformersCollection[0].negative).toBeCalled();
        expect(sourcesHoldersTransformersCollection[1].zero).toBeCalled();
        expect(sourcesHoldersTransformersCollection[2].positive).toBeCalled();
    });
});

describe('withTimeout - 220ms of timeout', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        fsLightbox.stageIndexes = {
            previous: 0,
            current: 1,
            next: 2
        };
        fsLightbox.data.lastSourceIndex = 2;
        sourcesHoldersTransformersCollection[0] = {
            negative: jest.fn()
        };
        sourcesHoldersTransformersCollection[1] = {
            zero: jest.fn()
        };
        sourcesHoldersTransformersCollection[2] = {
            positive: jest.fn()
        };
        setUpSourcesHoldersTransformingFacade(fsLightbox);
        sourcesHoldersTransformingFacade
            .transform()
            .withTimeout();
    });

    it('should call transforms after timeout', () => {
        jest.runTimersToTime(219);
        expect(sourcesHoldersTransformersCollection[0].negative).not.toBeCalled();
        expect(sourcesHoldersTransformersCollection[1].zero).not.toBeCalled();
        expect(sourcesHoldersTransformersCollection[2].positive).not.toBeCalled();
        jest.runTimersToTime(1);
        expect(sourcesHoldersTransformersCollection[0].negative).toBeCalled();
        expect(sourcesHoldersTransformersCollection[1].zero).toBeCalled();
        expect(sourcesHoldersTransformersCollection[2].positive).toBeCalled();
    });
});

describe('lastSourceIndex = 0', () => {
    beforeAll(() => {
        fsLightbox.data.lastSourceIndex = 0;
        fsLightbox.stageIndexes = {
            previous: undefined,
            current: 0,
            next: undefined
        };
        sourcesHoldersTransformersCollection[0] = {
            zero: jest.fn()
        };
        setUpStageSourcesHoldersTransformerAndCallTransformWithoutTimeout();
    });

    it('should call zero one time', () => {
        expect(sourcesHoldersTransformersCollection[0].zero).toBeCalledTimes(1);
    });
});

describe('lastSourceIndex = 1', () => {
    beforeAll(() => {
        fsLightbox.data.lastSourceIndex = 1;
    });

    describe('stageIndexes.current = 0', () => {
        beforeAll(() => {
            fsLightbox.stageIndexes = {
                previous: undefined,
                current: 0,
                next: 1
            };
            sourcesHoldersTransformersCollection[0] = {
                zero: jest.fn()
            };
            sourcesHoldersTransformersCollection[1] = {
                positive: jest.fn()
            };
            setUpStageSourcesHoldersTransformerAndCallTransformWithoutTimeout();
        });

        it('should call zero', () => {
            expect(sourcesHoldersTransformersCollection[0].zero).toBeCalled();
        });

        it('should call positive', () => {
            expect(sourcesHoldersTransformersCollection[1].positive).toBeCalled();
        });
    });

    describe('stageIndexes.current = 1', () => {
        beforeAll(() => {
            fsLightbox.stageIndexes = {
                previous: 0,
                current: 1,
                next: undefined
            };
            sourcesHoldersTransformersCollection[0] = {
                negative: jest.fn()
            };
            sourcesHoldersTransformersCollection[1] = {
                zero: jest.fn()
            };
            setUpStageSourcesHoldersTransformerAndCallTransformWithoutTimeout();
        });

        it('should call negative', () => {
            expect(sourcesHoldersTransformersCollection[0].negative).toBeCalled();
        });

        it('should call zero', () => {
            expect(sourcesHoldersTransformersCollection[1].zero).toBeCalled();
        });
    });
});

describe('lastSourceIndex = at least 2', () => {
    beforeAll(() => {
        fsLightbox.data.lastSourceIndex = 2;
    });

    describe('previous: 2, current: 0, next: 1', () => {
        beforeAll(() => {
            fsLightbox.stageIndexes = {
                previous: 2,
                current: 0,
                next: 1
            };
            sourcesHoldersTransformersCollection[2] = {
                negative: jest.fn()
            };
            sourcesHoldersTransformersCollection[0] = {
                zero: jest.fn()
            };
            sourcesHoldersTransformersCollection[1] = {
                positive: jest.fn()
            };
            setUpStageSourcesHoldersTransformerAndCallTransformWithoutTimeout();
        });

        it('should call negative for index 2', () => {
            expect(sourcesHoldersTransformersCollection[2].negative).toBeCalled();
        });

        it('should call zero for index 0', () => {
            expect(sourcesHoldersTransformersCollection[0].zero).toBeCalled();
        });

        it('should call positive for index 1', () => {
            expect(sourcesHoldersTransformersCollection[1].positive).toBeCalled();
        });
    });

    describe('previous: 0, current: 1, next: 2', () => {
        beforeAll(() => {
            fsLightbox.stageIndexes = {
                previous: 0,
                current: 1,
                next: 2
            };
            sourcesHoldersTransformersCollection[0] = {
                negative: jest.fn()
            };
            sourcesHoldersTransformersCollection[1] = {
                zero: jest.fn()
            };
            sourcesHoldersTransformersCollection[2] = {
                positive: jest.fn()
            };
            setUpStageSourcesHoldersTransformerAndCallTransformWithoutTimeout();
        });

        it('should call negative for index 0', () => {
            expect(sourcesHoldersTransformersCollection[0].negative).toBeCalled();
        });

        it('should call zero for index 1', () => {
            expect(sourcesHoldersTransformersCollection[1].zero).toBeCalled();
        });

        it('should call positive for index 2', () => {
            expect(sourcesHoldersTransformersCollection[2].positive).toBeCalled();
        });
    });

    describe('previous: 1, current: 2, next: 0', () => {
        beforeAll(() => {
            fsLightbox.stageIndexes = {
                previous: 1,
                current: 2,
                next: 0
            };
            sourcesHoldersTransformersCollection[1] = {
                negative: jest.fn()
            };
            sourcesHoldersTransformersCollection[2] = {
                zero: jest.fn()
            };
            sourcesHoldersTransformersCollection[0] = {
                positive: jest.fn()
            };
            setUpStageSourcesHoldersTransformerAndCallTransformWithoutTimeout();
        });

        it('should call negative for index 1', () => {
            expect(sourcesHoldersTransformersCollection[1].negative).toBeCalled();
        });

        it('should call zero for index 2', () => {
            expect(sourcesHoldersTransformersCollection[2].zero).toBeCalled();
        });

        it('should call positive for index 0', () => {
            expect(sourcesHoldersTransformersCollection[0].positive).toBeCalled();
        });
    });
});

describe('byValue', () => {
    beforeAll(() => {
        fsLightbox.data.lastSourceIndex = 2;
        fsLightbox.stageIndexes = {
            previous: 0,
            current: 1,
            next: 2
        };
        sourcesHoldersTransformersCollection[0] = {
            negative: jest.fn(),
            byValue: jest.fn().mockReturnThis()
        };
        sourcesHoldersTransformersCollection[1] = {
            zero: jest.fn(),
            byValue: jest.fn().mockReturnThis()
        };
        sourcesHoldersTransformersCollection[2] = {
            positive: jest.fn(),
            byValue: jest.fn().mockReturnThis()
        };
        setUpSourcesHoldersTransformingFacade(fsLightbox);
        sourcesHoldersTransformingFacade.transformByValue(150)
    });

    it('should call transform negative and by value 150 for index 0', () => {
        expect(sourcesHoldersTransformersCollection[0].byValue).toBeCalledWith(150);
        expect(sourcesHoldersTransformersCollection[0].negative).toBeCalled();
    });

    it('should call transform zero and by value 150 for index 1', () => {
        expect(sourcesHoldersTransformersCollection[1].byValue).toBeCalledWith(150);
        expect(sourcesHoldersTransformersCollection[1].zero).toBeCalled();
    });

    it('should call transform positive and by value 150 for index 2', () => {
        expect(sourcesHoldersTransformersCollection[2].byValue).toBeCalledWith(150);
        expect(sourcesHoldersTransformersCollection[2].positive).toBeCalled();
    });
});
