import { getClientXFromEvent } from "../../../src/helpers/events/getClientXFromEvent";

test('touch event', () => {
    expect(getClientXFromEvent({
        touches: [
            {
                clientX: 100
            }
        ],
        clientX: 200
    })).toBe(100);
});

test('mouse event', () => {
    expect(getClientXFromEvent({
        clientX: 500
    })).toBe(500);
});

test('it should return nothing if there is more than one touch point', () => {
    expect(getClientXFromEvent({
        touches: [
            {
                clientX: 100
            },
            {
                clientX: 20
            }
        ]
    })).toBe(undefined);
});
