import React from 'react';

// @ts-ignore
export const combineComponent = (Component, nameKey = 'combine') => combineData => props => {
    const combine = {
        [nameKey]: combineData,
    };

    return <Component {...combine} {...props} />;
};
