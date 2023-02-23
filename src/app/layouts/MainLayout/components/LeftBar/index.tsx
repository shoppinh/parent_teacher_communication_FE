import React from 'react';
import { styled } from 'twin.macro';
import { StyleConstants } from '../../../../../styles/constants/style';
import { pxToRem } from '../../../../../styles/theme/utils';
import { media } from '../../../../../styles';

const Container = styled.div`
  width: ${pxToRem(StyleConstants.LEFT_BAR_WIDTH)}rem;
  background-color: ${(p) => p.theme.backgroundVariant};
  display: none;
  ${media.md`
    display: block;
  `}
`;
const LeftBar = () => {
  return <Container>LEFT BAR</Container>;
};

export default LeftBar;
