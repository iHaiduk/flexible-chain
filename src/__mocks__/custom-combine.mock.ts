import { ValueOf } from '../types/helper.type';

export const mainLanguageKey = {
    Hello: 'Hello',
    Welcome: 'Welcome',
};

export const secondaryLanguageKey = {
    Dear: 'dear',
    To: 'to',
};

export const initialLanguageTree = { ...mainLanguageKey, ...secondaryLanguageKey };

type Keys = ValueOf<typeof mainLanguageKey> & ValueOf<typeof secondaryLanguageKey>;
type ResultLanguageType = Array<Keys>;

export const customResultTree = {
    Key: (keys: ResultLanguageType) => keys.join('.'),
    Keys: (keys: ResultLanguageType) => keys,
    User: (keys: ResultLanguageType) => (name: string) => `${[...keys, name].join(' ')}!`,
    Length: (keys: ResultLanguageType) => keys.length,
};

export const customConcatenationFn = (prev: ResultLanguageType, key: Keys) => [...prev, key];

export const customInitialState = [];
