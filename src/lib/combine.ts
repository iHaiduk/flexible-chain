import { privateProperty } from '../constants/private-property';
import { concatenationFunction } from '../utils/concatenation-function';
import { memoizedResult } from '../utils/memoize-result';

import { CombineInitialProps, CombineType } from '../types/combine.type';
import { Call } from '../types/helper.type';

export const combine = <T extends object, F extends Call, R extends Call<keyof F> = F, I = CombineInitialProps>(
    types: T,
    fnResults: F,
    fnConcat = concatenationFunction,
    initial: I = {} as I
): CombineType<T, F, R> => {
    const memo = new Map();

    const combineGenerate = (initialProps: I, prevKey = ''): CombineType<T, F, R> => {
        const calls = {
            [privateProperty]: initialProps,
        } as CombineType<T, F, R>;

        for (const [key, props] of Object.entries(types)) {
            Object.defineProperty(calls, key, {
                get() {
                    const memoKey = prevKey + key;

                    return memoizedResult<CombineType<T, F, R>>(memo, memoKey, () =>
                        combineGenerate(fnConcat(calls[privateProperty], props), memoKey)
                    );
                },
            });
        }

        for (const [key, fn] of Object.entries(fnResults)) {
            Object.defineProperty(calls, key, {
                get(): R {
                    return memoizedResult<R>(memo, prevKey + key, () => fn.call(fn, this[privateProperty]));
                },
            });
        }

        return calls;
    };

    return combineGenerate(initial);
};
