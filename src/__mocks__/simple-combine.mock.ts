import { ValueOf } from '../types/helper.type';

export const colorProps = {
    Red: {
        color: 'red',
    },
};

export const sizeProps = {
    L: {
        fontSize: 16,
    },
};

export const initialTree = { ...colorProps, ...sizeProps };

type ResultType = ValueOf<typeof colorProps> & ValueOf<typeof sizeProps>;

export const resultTree = {
    View: (style: ResultType): ResultType => style,
    Color: (style: ResultType): string => style.color,
    Size: (style: ResultType): number => style.fontSize,
};
