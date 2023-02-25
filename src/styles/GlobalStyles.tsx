import React from 'react';
import { createGlobalStyle } from 'styled-components';
import tw, { GlobalStyles as BaseStyles, theme } from 'twin.macro';
import { colors } from './constants/colors';
import { StyleConstants } from './constants/style';
import { CustomIconStyle, FontStyle } from './font-styles';

const CustomStyles = createGlobalStyle({
  body: {
    WebkitTapHighlightColor: theme`colors.purple.500`,
    ...tw`antialiased`,
    fontFamily: "'Roboto', sans-serif",
    color: colors.MINE_SHAFT,
    fontSize: StyleConstants.BASE_FONT_SIZE,
  },
  html: {
    fontSize: StyleConstants.BASE_FONT_SIZE,
    color: colors.MINE_SHAFT,
  },
});

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
    <FontStyle />
    <CustomIconStyle />
  </>
);

export default GlobalStyles;
