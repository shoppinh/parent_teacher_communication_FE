import * as React from 'react';
import styled from 'styled-components/macro';
import { Fade } from '../Transition/Fade';

interface Props {
  open: boolean;
  isWhiteBackground?: boolean;
  children: React.ReactNode;
}

interface WrapperProps {
  isWhiteBackground?: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  z-index: -1;
  background-color: ${(p) => (p.isWhiteBackground ? p.theme.background : 'rgba(0, 0, 0, 0.5)')};
`;

const PBackdrop: React.FC<Props> = ({ open, children, isWhiteBackground = false, ...rest }) => {
  return (
    <Fade in={open}>
      <Wrapper isWhiteBackground={isWhiteBackground} {...rest}>
        {children}
      </Wrapper>
    </Fade>
  );
};
export default React.memo(PBackdrop);
