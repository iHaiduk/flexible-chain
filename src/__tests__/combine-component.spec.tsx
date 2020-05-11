const React = require('react');
import * as renderer from 'react-test-renderer';

import { combine, combineComponent } from '..';
import {
    componentStyles,
    SpanComponent,
    ParagraphComponent,
    componentFontWeight,
    componentFontStyle,
    componentColors,
} from '../__mocks__/combine-component.mock';

const componentResult = {
    Text: combineComponent<{}, typeof componentStyles>(SpanComponent, 'style'),
    Paragraph: combineComponent<{}, typeof componentStyles>(ParagraphComponent, 'style'),
};

describe('Combine React Render', () => {
    const initialStyle = {};
    const initialSpanComponent = renderer.create(<SpanComponent style={initialStyle} />);
    const initialParagraphComponent = renderer.create(<ParagraphComponent style={initialStyle} />);
    const compareComponentProps = (component: any, style: any) => ({
        ...component,
        props: {
            ...component.props,
            style,
        },
    });

    it('default render', () => {
        const UserName = combine(componentStyles, componentResult);

        const componentSpan = renderer.create(<UserName.Text />);
        const componentParagraph = renderer.create(<UserName.Paragraph />);

        expect(componentSpan.toJSON()).toEqual(initialSpanComponent.toJSON());
        expect(componentParagraph.toJSON()).toEqual(initialParagraphComponent.toJSON());
    });

    it('custom props render', () => {
        const UserName = combine(componentStyles, componentResult);

        const componentBold = renderer.create(<UserName.Bold.Text />);
        const componentItalic = renderer.create(<UserName.Italic.Text />);
        const componentOblique = renderer.create(<UserName.Oblique.Text />);

        const initialSpanComponentJSON = initialSpanComponent.toJSON();

        expect(componentBold.toJSON()).toEqual(
            compareComponentProps(initialSpanComponentJSON, componentFontWeight.Bold)
        );
        expect(componentItalic.toJSON()).toEqual(
            compareComponentProps(initialSpanComponentJSON, componentFontStyle.Italic)
        );
        expect(componentOblique.toJSON()).toEqual(
            compareComponentProps(initialSpanComponentJSON, componentFontStyle.Oblique)
        );

        const componentBoldItalic = renderer.create(<UserName.Bold.Italic.Text />);

        expect(componentBoldItalic.toJSON()).toEqual(
            compareComponentProps(initialSpanComponentJSON, {
                ...componentFontWeight.Bold,
                ...componentFontStyle.Italic,
            })
        );

        const componentBoldItalicRedText = renderer.create(<UserName.Bold.Red.Text />);
        const componentBoldItalicRedParagraph = renderer.create(<UserName.Bold.Oblique.White.Paragraph />);
        const componentBoldItalicRedOText = renderer.create(<UserName.Bold.Oblique.White.Text />);

        expect(componentBoldItalicRedText.toJSON()).toEqual(
            compareComponentProps(initialSpanComponentJSON, {
                ...componentFontWeight.Bold,
                ...componentColors.Red,
            })
        );

        expect(componentBoldItalicRedParagraph.toJSON()).toEqual(
            compareComponentProps(initialParagraphComponent.toJSON(), {
                ...componentFontWeight.Bold,
                ...componentFontStyle.Oblique,
                ...componentColors.White,
            })
        );

        expect(componentBoldItalicRedOText.toJSON()).toEqual(
            compareComponentProps(initialSpanComponentJSON, {
                ...componentFontWeight.Bold,
                ...componentFontStyle.Oblique,
                ...componentColors.White,
            })
        );
    });
});
