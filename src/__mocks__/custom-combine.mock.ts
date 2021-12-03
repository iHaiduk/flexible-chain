import { SimpleValueOf } from '../types/helper.type';

export const mainLanguageKey = {
    Hello: 'Hello',
    Welcome: 'Welcome',
};

export const secondaryLanguageKey = {
    Dear: 'dear',
    To: 'to',
};

export const initialLanguageTree = { ...mainLanguageKey, ...secondaryLanguageKey };

type Keys = SimpleValueOf<typeof mainLanguageKey> & SimpleValueOf<typeof secondaryLanguageKey>;
type ResultLanguageType = Keys[];

export const mockLengthJest = jest.fn();

export const customResultTree = {
    Key: (keys: ResultLanguageType) => keys.join('.'),
    Keys: (keys: ResultLanguageType) => keys,
    User: (keys: ResultLanguageType) => (name: string) => `${[...keys, name].join(' ')}!`,
    Length: (keys: ResultLanguageType) => keys.length,
    LengthJest: mockLengthJest.mockReturnValue(1),
};

export const customConcatenationFn = (prev: ResultLanguageType, key: Keys) => [...prev, key];

export const customInitialState = [];
