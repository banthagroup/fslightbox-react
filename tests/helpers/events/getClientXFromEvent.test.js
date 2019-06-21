import { getClientXFromEvent } from "../../../src/helpers/events/getClientXFromEvent";

describe('event is touch', () => {
    it('should return proper client x', () => {
        expect(getClientXFromEvent({
            touches: [
                {
                    clientX: 100
                }
            ],
            clientX: 200
        })).toBe(100);
    });
});

describe('event is mouse', () => {
    it('should return proper clientX', () => {
        expect(getClientXFromEvent({
            clientX: 500
        })).toBe(500);
    });
});
