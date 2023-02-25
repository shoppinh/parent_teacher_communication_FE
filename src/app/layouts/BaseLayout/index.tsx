import React from 'react';
import { Helmet } from 'react-helmet-async';
import tw, { styled } from 'twin.macro';

interface Props {
  children?: React.ReactNode;
  title: string;
}

const Container = styled.div`
  ${tw`h-screen`}
  overflow: auto;
  background-color: ${(p) => p.theme.backgroundVariant};
`;

const BaseLayout: React.FC<Props> = ({ children, title }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name='og:title' content={title} />
      </Helmet>
      <Container>{!!children && children}</Container>
    </>
  );
};

export default BaseLayout;
