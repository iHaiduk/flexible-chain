import { Call, keyTypes } from './helper.type';

type CombineResult<F, R extends Call<keyof F>> = {
    [key in keyof F]: ReturnType<R[key]>;
};

export type CombineType<T extends object, F extends Call, R extends Call<keyof F>> = CombineTypeGen<T, F, R> &
    CombineResult<F, R>;

export type CombineTypeGen<T extends object, F extends Call, R extends Call<keyof F>> = {
    [key in keyTypes<T>]: CombineType<T, F, R>;
};

export type CombineInitialProps = string | number | object | CombineInitialProps[];
