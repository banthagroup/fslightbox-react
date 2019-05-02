import { TimeoutQueue } from "../../../src/core/timeouts/TimeoutQueue";

const timeoutQueue = new TimeoutQueue();
timeoutQueue.time = 500;

describe('actionCallConditionFunc', () => {
    it('should return by default true', () => {
        expect(timeoutQueue.actionCallConditionFunc()).toBe(true);
    });
});

describe('startTimeout', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        timeoutQueue.action = jest.fn();
    });

    describe('not calling action', () => {
        describe('due to queue length is not 0 event if actionCallConditionFunc returns true', () => {
            beforeEach(() => {
                // starting timeout two time
                // queue length after end of first timeout will be 1 - action should not be called
                // queue length after end of second timeout will be 0 - action should be called
                timeoutQueue.startTimeout();
                timeoutQueue.startTimeout();
                timeoutQueue.actionCallConditionFunc = () => true;
                jest.runTimersToTime(timeoutQueue.time);
            });

            it('should call action only 1 time', () => {
                expect(timeoutQueue.action).toBeCalledTimes(1);
            });
        });

        describe('due to actionCallConditionFunc returns false event if queue length is 0', () => {
            beforeEach(() => {
                // starting 1 timeout queue length will be 0
                timeoutQueue.startTimeout();
                timeoutQueue.actionCallConditionFunc = () => false;
                jest.runTimersToTime(timeoutQueue.time)
            });

            it('should not call action', () => {
                expect(timeoutQueue.action).not.toBeCalled();
            });
        });
    });

    describe('calling action', () => {
        describe('queue length is 0 and actionCallConditionFunc returns true', () => {
            beforeEach(() => {
                // starting 1 timeout queue length will be 0
                timeoutQueue.startTimeout();
                timeoutQueue.actionCallConditionFunc = () => true;
                jest.runTimersToTime(timeoutQueue.time);
            });

            it('should call action', () => {
                expect(timeoutQueue.action).toBeCalled();
            });
        });
    });
});