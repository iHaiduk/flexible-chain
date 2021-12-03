import { CombineValueOf } from '../types/helper.type';

export const colorProps = {
    Red: {
        color: 'red',
    },
    Weight: (fontWeight: string | number) => ({ fontWeight }),
};

export const sizeProps = {
    L: {
        fontSize: 16,
    },
};

export const initialTree = { ...colorProps, ...sizeProps };

type ResultType = CombineValueOf<typeof colorProps> & CombineValueOf<typeof sizeProps>;

export const resultTree = {
    View: (style: ResultType): ResultType => style,
    Color: (style: ResultType): string => style.color,
    Size: (style: ResultType): number => style.fontSize,
    WeightResult: (style: ResultType): string | number => style.fontWeight,
};
