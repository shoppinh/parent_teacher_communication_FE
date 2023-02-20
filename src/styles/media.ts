/*
 * Media queries utility
 */

import {
  css,
  DefaultTheme,
  CSSObject,
  InterpolationFunction,
  ThemedStyledProps,
  Interpolation,
  FlattenInterpolation,
} from 'styled-components/macro';

/*
 * Taken from https://github.com/DefinitelyTyped/DefinitelyTyped/issues/32914
 */

import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';
import { Theme } from './theme/themes';

const ScreenConfig: any = resolveConfig(tailwindConfig).theme?.screens || {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Update your breakpoints if you want
export const sizes: {
  [key: string]: string;
} = {
  ...ScreenConfig,
};

// Iterate through the sizes and create a media template
export const media = (Object.keys(sizes) as Array<keyof typeof sizes>).reduce((acc, label) => {
  acc[label] = (first: any, ...interpolations: any[]) => css`
    @media (min-width: ${sizes[label]}) {
      ${css(first, ...interpolations)}
    }
  `;

  return acc;
}, {} as { [key in keyof typeof sizes]: MediaFunction });

/*
 * @types/styled-component is not working properly as explained in the github issue referenced above.
 * We must overcome this with custom typings, however, this might not work in time as the styled-components update.
 * Be carefull and keep an eye on the issue and the possible improvements
 */
type MediaFunction = <P extends object>(
    first: TemplateStringsArray | CSSObject | InterpolationFunction<ThemedStyledProps<P, Theme>>,
    ...interpolations: Array<Interpolation<ThemedStyledProps<P, Theme>>>
) => FlattenInterpolation<ThemedStyledProps<P, Theme>>;

/* Example
  const SomeDiv = styled.div`
    display: flex;
    ....
    ${media.medium`
      display: block
    `}
  `;
  */
