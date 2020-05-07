import { privateProperty } from '../constants/private-property';

export type keyTypes<T> = typeof privateProperty | keyof T;

export type AnyFunction = (...args: any[]) => AnyFunction | any;

export type Call<K extends string | number | symbol = string> = {
    [key in K]: AnyFunction;
};

export type ValueOf<T> = T[keyof T];
