import React from 'react';
import { Helmet } from 'react-helmet-async';
import tw, { styled } from 'twin.macro';
import PToast from '../../components/PToast';
import { Firebase } from '../FireBase';

interface Props {
  children?: React.ReactNode;
  title: string;
}

const Container = styled.div`
  ${tw`h-screen`}
  overflow: auto;
  background-color: ${(p) => p.theme.backgroundVariant};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BaseLayout: React.FC<Props> = ({ children, title }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name='og:title' content={title} />
      </Helmet>
      <Container>{!!children && children}</Container>
      <PToast newestOnTop={true} />
      {'serviceWorker' in navigator && <Firebase />}
    </>
  );
};

export default React.memo(BaseLayout);
