import React from 'react';
import { pxToRem } from '../../../../../styles/theme/utils';
import { StyleConstants } from '../../../../../styles/constants/style';
import { styled } from 'twin.macro';
import {media} from "../../../../../styles";

const Container = styled.div`
  width: ${pxToRem(StyleConstants.LEFT_BAR_WIDTH)}rem;
  background-color: ${(p) => p.theme.backgroundVariant};
  display: none;
  ${media.md`
    display: block;
  `}
`;
const RightBar = () => {
  return <Container>RIGHT BAR</Container>;
};

export default RightBar;
