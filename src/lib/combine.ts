import {privateProperty} from '../constants/private-property';
import {CombineType} from '../types/combine.type';
import {Call} from '../types/helper.type';
import { memoizedResult } from '../utils/memoize-result';

export const combine = <T extends object, F extends Call, R extends Call<keyof F> = F>(
    types: T,
    fnResults: F
): CombineType<T, F, R> => {
    const memo = new Map();

    const combineGenerate = (initialProps = {}, prevKey = ''): CombineType<T, F, R> => {
        const calls = {
            [privateProperty]: initialProps,
        } as CombineType<T, F, R>;

        const propsMemoKeys = Object.values(calls[privateProperty]).join('.');

        for (const [key, props] of Object.entries(types)) {
            Object.defineProperty(calls, key, {
                get() {
                    const memoKey = prevKey + key;

                    return memoizedResult<CombineType<T, F, R>>(memo, memoKey, () =>
                        combineGenerate({ ...calls[privateProperty], ...props }, memoKey)
                    );
                },
            });
        }

        for (const [key, fn] of Object.entries(fnResults)) {
            Object.defineProperty(calls, key, {
                get(): string {
                    return memoizedResult(memo, propsMemoKeys, () => fn.call(fn, this[privateProperty]));
                },
            });
        }

        return calls;
    };

    return combineGenerate();
};
