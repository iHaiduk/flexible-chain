import { memoizedResult } from '../memoize-result';

test('Memoization Test', () => {
    const memory = new Map();
    const key = 'memory';
    const sumFn = jest.fn().mockReturnValue(2);

    const result = memoizedResult(memory, key, sumFn);
    const result2 = memoizedResult(memory, key, sumFn);
    const result3 = memoizedResult(memory, key, sumFn);

    expect(result).toBe(2);
    expect(result2).toBe(2);
    expect(result3).toBe(2);

    expect(sumFn).toBeCalledTimes(1);
});