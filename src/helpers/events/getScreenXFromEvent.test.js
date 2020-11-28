import { getScreenXFromEvent } from "./getScreenXFromEvent";

test('touch event', () => {
    expect(getScreenXFromEvent({
        touches: [
            {
                screenX: 100
            }
        ],
        screenX: 200
    })).toBe(100);
});

test('mouse event', () => {
    expect(getScreenXFromEvent({
        screenX: 500
    })).toBe(500);
});
