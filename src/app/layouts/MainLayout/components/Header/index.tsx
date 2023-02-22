import React from 'react';
import { pxToRem } from '../../../../../styles/theme/utils';
import { StyleConstants } from '../../../../../styles/constants/style';
import { styled } from 'twin.macro';
import { media } from '../../../../../styles';

interface Props {
  onRightBarClick: () => void;
  onLeftBarClick: () => void;
}
const Container = styled.div`
  height: ${pxToRem(StyleConstants.HEADER_HEIGHT)}rem;
  background-color: ${(p) => p.theme.backgroundVariant};
  width: 100%;
  display: flex;
  justify-content: center;
`;
const BarIcon = styled.div`
  display: block;
  ${media.md`
    display: none;
  `}
`;
const Header: React.FC<Props> = ({ onRightBarClick, onLeftBarClick }) => {
  return (
    <Container>
      <BarIcon onClick={onLeftBarClick}>Click me to open left bar</BarIcon>
      Header
      <BarIcon onClick={onRightBarClick}>Click me to open right bar</BarIcon>
    </Container>
  );
};

export default Header;
