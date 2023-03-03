import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { styled } from 'twin.macro';

type ULinkType = LinkProps & React.RefAttributes<HTMLAnchorElement>;

interface Props extends ULinkType {
  isPreview?: boolean;
}

const Container = styled(Link)`
  color: ${(p) => p.theme.text};
  font-weight: bold;
  text-decoration: underline;

  &.is-preview {
    pointer-events: none;
  }

  &:hover {
    color: ${(p) => p.theme.text} !important;
    text-decoration: underline;
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }
`;

const ULink: React.FC<Props> = ({ className, isPreview = false, children, target, ...rest }) => {
  const rel = target === '_blank' ? 'noreferrer' : '';
  return (
    <Container
      className={className + ` ${isPreview ? 'is-preview' : ''}`}
      target={target}
      rel={rel}
      {...rest}
    >
      {children}
    </Container>
  );
};

export default React.memo(ULink);
