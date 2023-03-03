import React, { forwardRef } from 'react';
import { styled } from 'twin.macro';

const Container = styled.a`
  color: ${(p) => p.theme.text};
  font-weight: normal;
  text-decoration: underline;

  &:hover {
    text-decoration: underline;
    opacity: 0.8;
    color: ${(p) => p.theme.text};
  }

  &:active {
    opacity: 0.4;
    color: ${(p) => p.theme.text};
  }
`;

export default forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className, children, target, ...rest }, ref) => {
    const rel = target === '_blank' ? 'noreferrer' : '';
    return (
      <Container ref={ref} className={className} target={target} rel={rel} {...rest}>
        {children}
      </Container>
    );
  }
);
