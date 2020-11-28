import { middleware } from './middleware';

const baseFunc = jest.fn();

test('getMiddlewaredFunc', () => {
    let func = (firstParam, secondParam) => {
        expect(firstParam).toBe('first-param');
        expect(secondParam).toBe('second-param');
        return false;
    };
    let middlewaredFunc = middleware(baseFunc, func);
    middlewaredFunc('first-param', 'second-param');
    expect(baseFunc).not.toBeCalled();

    func = (firstParam, secondParam) => {
        expect(firstParam).toBe('first-param');
        expect(secondParam).toBe('second-param');
        return true;
    };
    middlewaredFunc = middleware(baseFunc, func);
    middlewaredFunc('first-param', 'second-param');
    expect(baseFunc).toBeCalledWith('first-param', 'second-param');
});
