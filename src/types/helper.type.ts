export type AnyFunction = (...args: any[]) => AnyFunction | any;

export type Call<K extends string | number | symbol = string> = {
    [key in K]: AnyFunction;
};

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

type ValueRecord = Record<string, string | number | any> | AnyFunction | string | number;

export type CombineValue = Record<string, ValueRecord>;

export type SimpleValueOf<T> = T[keyof T];

export type ValueOf<T extends CombineValue, V = T[keyof T]> = V extends AnyFunction ? ReturnType<V> : V;

export type CombineValueOf<T extends CombineValue> = UnionToIntersection<ValueOf<T>>;
