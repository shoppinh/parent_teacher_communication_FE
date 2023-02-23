import React from 'react';
import { pxToRem } from '../../../../../styles/theme/utils';
import { StyleConstants } from '../../../../../styles/constants/style';
import tw, { styled } from 'twin.macro';
import { media } from '../../../../../styles';
import {PButton} from "../../../../components/PButton";

interface Props {
  onRightBarClick: () => void;
  onLeftBarClick: () => void;
}
const Container = styled.div`
  height: ${pxToRem(StyleConstants.HEADER_HEIGHT)}rem;
  background-color: ${(p) => p.theme.backgroundVariant};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

`;
const StyledButton = styled(PButton)`
  ${tw`p-3`}
  display: block;
  ${media.md`
    display: none;
  `}

`;
const Header: React.FC<Props> = ({ onRightBarClick, onLeftBarClick }) => {
  return (
    <Container>
      <StyledButton variant='secondary' onClick={onLeftBarClick}>Click me to open left bar</StyledButton>
      Header
      <StyledButton variant='secondary' onClick={onRightBarClick}>Click me to open right bar</StyledButton>
    </Container>
  );
};

export default Header;
