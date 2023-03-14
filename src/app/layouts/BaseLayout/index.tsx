import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import tw, { styled } from 'twin.macro';
import PToast from '../../components/PToast';
import { Firebase } from '../FireBase';
import { useDispatch, useSelector } from 'react-redux';
import { useConfigSlice } from '../../../store/slices/config';
import { getSystemSettings } from '../../../store/selectors/config';

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
  const { actions: configActions } = useConfigSlice();
  const systemSettings = useSelector(getSystemSettings);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!systemSettings) {
      dispatch(configActions.loadSystemSetting());
    }
  }, [configActions, dispatch, systemSettings]);
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

export default BaseLayout;
