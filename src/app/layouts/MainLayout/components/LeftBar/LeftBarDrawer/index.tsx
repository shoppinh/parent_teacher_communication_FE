import React from 'react';
import { pxToRem } from '../../../../../../styles/theme/utils';
import { StyleConstants } from '../../../../../../styles/constants/style';
import { styled } from 'twin.macro';
import ModalUnstyled from '@mui/base/ModalUnstyled';

interface Props {
  isOpen: boolean;
}

const Container = styled.div`
  width: ${pxToRem(StyleConstants.LEFT_BAR_WIDTH)}rem;
  background-color: ${(p) => p.theme.backgroundVariant};
  height: 100%;
`;

const DrawerWrapper = styled.div<Props>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  width: 300px;
  height: 100%;
  background-color: ${(p) => p.theme.backgroundVariant};
  z-index: 999;
  transition: all 0.3s ease-in-out;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  border-left: 1px solid #e2e8f0;
`;

const LeftBarDrawer = () => {
  return (
      <Container>Left Bar Drawer</Container>
  );
};

export default LeftBarDrawer;
