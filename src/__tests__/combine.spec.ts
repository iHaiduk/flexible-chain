import { combine } from '..';
import {
    customConcatenationFn,
    customInitialState,
    customResultTree,
    initialLanguageTree,
    mainLanguageKey,
    secondaryLanguageKey,
} from '../__mocks__/custom-combine.mock';
import { colorProps, initialTree, resultTree, sizeProps } from '../__mocks__/simple-combine.mock';

describe('Combine Test', () => {
    it('Simple tree', () => {
        const Font = combine(initialTree, resultTree);

        expect(Font.Red.View).toEqual(colorProps.Red);
        expect(Font.L.View).toEqual(sizeProps.L);
        expect(Font.Red.L.View).toEqual({ ...colorProps.Red, ...sizeProps.L });

        expect(Font.Red.Color).toBe(colorProps.Red.color);
        expect(Font.L.Size).toBe(sizeProps.L.fontSize);

        expect(Font.Weight(12).WeightResult).toBe(12);

        expect(Font.L.Color).toBeUndefined();
        expect(Font.Red.Size).toBeUndefined();
    });

    it('Custom concatenation function', () => {
        const Salutation = combine(initialLanguageTree, customResultTree, customConcatenationFn, customInitialState);

        expect(Salutation.Hello.Dear.Key).toBe(`${mainLanguageKey.Hello}.${secondaryLanguageKey.Dear}`);
        expect(Salutation.Hello.Dear.Keys).toEqual([mainLanguageKey.Hello, secondaryLanguageKey.Dear]);

        expect(Salutation.Hello.Length).toBe(1);
        expect(Salutation.Hello.Dear.Length).toBe(2);
        expect(Salutation.Hello.Dear.Welcome.Length).toBe(3);
        expect(Salutation.Hello.Dear.Welcome.To.Length).toBe(4);

        expect(Salutation.Hello.User('Kris')).toBe('Hello Kris!');
        expect(Salutation.Hello.Dear.User('Kris')).toBe('Hello dear Kris!');
    });
});
