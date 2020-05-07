import * as React from 'react';

export const componentColors = {
    White: {
        color: 'white',
    },
    Red: {
        color: 'red',
    },
};

export const componentFontWeight = {
    Bold: {
        fontWeight: 'bold',
    },
};

export const componentFontStyle = {
    Italic: {
        fontStyle: 'italic',
    },
    Oblique: {
        fontStyle: 'oblique',
    },
};

export const componentStyles = { ...componentColors, ...componentFontWeight, ...componentFontStyle };

export const SpanComponent = (props: any) => <span {...props} />;
export const ParagraphComponent = (props: any) => <p {...props} />;
