import React from 'react';
import tw, { styled } from 'twin.macro';

interface Props {
  children?: React.ReactNode;
}

const Container = styled.div`
  ${tw`h-screen`}
  overflow: auto;
  background-color: ${(p) => p.theme.backgroundVariant};
`;

const BaseLayout: React.FC<Props> = ({ children }) => {
  return <Container>{!!children && children}</Container>;
};

export default BaseLayout;
