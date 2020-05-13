# Flexible chain [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) [![npm version](https://badgen.net/npm/v/flexible-chain)](https://www.npmjs.com/package/flexible-chain) [![Build Status](https://badgen.net/travis/iHaiduk/flexible-chain/0.0.2)](https://travis-ci.org/iHaiduk/flexible-chain) [![Coverage Status](https://coveralls.io/repos/github/iHaiduk/flexible-chain/badge.svg?branch=master)](https://coveralls.io/github/iHaiduk/flexible-chain?branch=master) [![Size](https://badgen.net/bundlephobia/minzip/flexible-chain)](https://bundlephobia.com/result?p=flexible-chain) [![devDependencies Status](https://david-dm.org/iHaiduk/flexible-chain/dev-status.svg)](https://david-dm.org/iHaiduk/flexible-chain?type=dev)

## Install

Install from the NPM repository using yarn or npm:

```shell
yarn add flexible-chain
```
Or
```shell
npm install flexible-chain
```

---
[Demo with React](https://codesandbox.io/s/flexible-chain-xkzbn)
---

## Motivation
We have a lot of repetitive code and the chore of writing different combinations. Also, over time, we forget what a piece of code should do and spend more time understanding it. This utility helps to make your code more flexible, understandable and transparent.

## Solution
Flexible chain is a small but powerful utility for creating tree chains and obtaining results after combining it.

## Example

### Simple
Simple use for creating various chains
```javascript
import { combine } from "flexible-chain";

const colorProps = {
    Red: {
        color: 'red',
    },
    /* ... */
};

const sizeProps = {
    L: {
        fontSize: 16,
    },
    /* ... */
};

const initialFontTree = { ...colorProps, ...sizeProps };

export const fontResult = {
    View: style => style,
    Color: style => style.color,
    Size: style => style.fontSize,
};

const Font = combine(initialFontTree, fontResult);

console.log(Font.Red.View); // {color: 'red'}
console.log(Font.Red.L.View); // {color: 'red', fontSize: 16}

console.log(Font.Red.L.Color); // 'red'
console.log(Font.Red.L.Size); // 16
```

### Custom
More flexible and specific use of combine for your tasks. For example, when you want the state to be not an object (by default), but a different data type.
```javascript
import { combine } from "flexible-chain";

const mainLanguageKey = {
    Hello: 'Hello',
    Welcome: 'Welcome',
};

const secondaryLanguageKey = {
    Dear: 'dear',
    To: 'to',
};

const initialLanguageTree = { ...mainLanguageKey, ...secondaryLanguageKey };

const customResultTree = {
    Key: keys => keys.join('.'),
    Keys: keys => keys,
    Name: keys => name => `${[...keys, name].join(' ')}!`,
    Length: keys => keys.length,
};

const customConcatenationFn = (prev, key) => [...prev, key];

const customInitialState = [];

const Salutation = combine(initialLanguageTree, customResultTree, customConcatenationFn, customInitialState);

console.log(Salutation.Hello.Dear.Key); // 'Hello.dear'
console.log(Salutation.Hello.Dear.Keys); // ['Hello', 'dear']

console.log(Salutation.Hello.Length); // 1
console.log(Salutation.Hello.Dear.Length); // 2
/* ... N ... */

console.log(Salutation.Hello.Name('Kris')); // 'Hello Kris!'
console.log(Salutation.Welcome.To.Name('flexible-chain')); // 'Welcome to flexible-chain!';
```

### React & React-Native
You can also make beautiful chains for react components.

### React style
```javascript
import { combine, combineComponent } from "flexible-chain";

const SpanComponent = props => <span {...props} />;
const ParagraphComponent = props => <p {...props} />;

const componentColors = {
    White: {
        color: 'white',
    },
    Red: {
        color: 'red',
    },
    /* ... */
};

const componentFontStyle = {
    Italic: {
        fontStyle: 'italic',
    },
    Oblique: {
        fontStyle: 'oblique',
    },
    /* ... */
};

const componentFontWeight = {
    Bold: {
        fontWeight: 'bold',
    },
    /* ... */
};

const componentStyles = { ...componentColors, ...componentFontStyle, ...componentFontWeight };

const componentResult = {
    Text: combineComponent(SpanComponent, 'style'),
    Paragraph: combineComponent(ParagraphComponent, 'style'),
};

const UserInfo = combine(componentStyles, componentResult);

const UserProfile = () => (
    <>
        <UserInfo.White.Bold.Text>User Name</UserInfo.White.Bold.Text>
        <UserInfo.White.Bold.Italic.Text>User Surname</UserInfo.White.Bold.Italic.Text>
        <UserInfo.Red.Oblique.Paragraph>User Role</UserInfo.Red.Oblique.Paragraph>
        /* ... */
    </>
);

const HeaderUserInfo = () => (
    <>
        <UserInfo.White.Bold.Paragraph>User Name</UserInfo.White.Bold.Paragraph>
        <UserInfo.Red.Italic.Paragraph>User Role</UserInfo.Red.Italic.Paragraph>
        /* ... */
    </>
);

console.log(UserProfile); // ->
/* 
    <span style={{color: 'white', fontWeight: 'bold'}}>User Name</span>
    <span style={{color: 'white', fontWeight: 'bold', fontStyle: 'italic'}}>User Surname</span>
    <p style={{color: 'red', fontStyle: 'oblique'}}>User Role</p>

*/

```

### React classes
```typescript jsx
import { combine, combineComponent } from "flexible-chain";
import cs from 'classnames';

import styles from './style.module.css';

/* ... */

const SpanComponent = ({classes, ...props}) => {
   return <span className={cs(classes)} {...props} />;
}

const componentResult = {
    Text: combineComponent(SpanComponent, 'classes'),
};

const UserInfo = combine(styles, componentResult);

/* ... */
```

#### P.S.
Above are the most simple and commonly used options. You can combine more complex and dynamic connections for easier reuse.
