import { AnyFunction, Call, CombineValue } from './helper.type';

type CombineResult<F, R extends Call<keyof F>> = {
    [key in keyof F]: ReturnType<R[key]>;
};

type MF<A extends any[], B> = (...args: A) => B;

type ArgumentTypes<F extends AnyFunction> = F extends (...args: infer A) => any ? A : never;

export type CombineType<T extends CombineValue, F extends Call, R extends Call<keyof F>> = CombineTypeGen<T, F, R> &
    CombineResult<F, R>;

export type CombineTypeGen<T extends CombineValue, F extends Call, R extends Call<keyof F>> = {
    [key in keyof T]: T[key] extends AnyFunction
        ? MF<ArgumentTypes<T[key]>, CombineType<T, F, R>>
        : CombineType<T, F, R>;
};

export type CombineInitialProps = string | number | object | CombineInitialProps[];
