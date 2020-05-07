import React, { ComponentType, FC } from 'react';

export const combineComponent = <Props extends object, Data extends object>(
    Component: ComponentType<Props>,
    nameKey = 'combine'
) => (combineData: Data): FC<Props> => props => {
    const combine = {
        [nameKey]: combineData,
    };

    return <Component {...combine} {...props} />;
};
