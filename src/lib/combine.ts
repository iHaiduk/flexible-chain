import { privateProperty } from '../constants/private-property';
import { concatenationFunction } from '../utils/concatenation-function';

import { CombineInitialProps, CombineType } from '../types/combine.type';
import { Call, CombineValue } from '../types/helper.type';

export const combine = <T extends CombineValue, F extends Call, R extends Call<keyof F> = F, I = CombineInitialProps>(
    types: T,
    fnResults: F,
    fnConcat = concatenationFunction,
    initial: I = {} as I
): CombineType<T, F, R> => {
    const combineGenerate = (initialProps: I, prevKey = ''): CombineType<T, F, R> => {
        const calls = {
            [privateProperty]: initialProps,
        };

        for (const [key, props] of Object.entries(types)) {
            Object.defineProperty(calls, key, {
                get() {
                    const memoKey = prevKey + key;

                    if (props instanceof Function) {
                        return (...values: any[]) =>
                            combineGenerate(fnConcat(calls[privateProperty], props(...values)), memoKey);
                    }

                    return combineGenerate(fnConcat(calls[privateProperty], props), memoKey);
                },
            });
        }

        for (const [key, fn] of Object.entries(fnResults)) {
            Object.defineProperty(calls, key, {
                get(): R {
                    return fn.call(fn, this[privateProperty]);
                },
            });
        }

        return calls as unknown as CombineType<T, F, R>;
    };

    return combineGenerate(initial);
};
