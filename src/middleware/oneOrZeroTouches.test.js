import { oneOrZeroTouches } from './oneOrZeroTouches';

test('test', () => {
    expect(oneOrZeroTouches({})).toBeTruthy();
    expect(oneOrZeroTouches({ touches: [] })).toBeTruthy();
    expect(oneOrZeroTouches({ touches: [{}] })).toBeTruthy();
    expect(oneOrZeroTouches({ touches: [{}, {}] })).toBeFalsy();
    expect(oneOrZeroTouches({ touches: [{}, {}, {}] })).toBeFalsy();
    expect(oneOrZeroTouches({ touches: [{}, {}, {}, {}] })).toBeFalsy();
});
