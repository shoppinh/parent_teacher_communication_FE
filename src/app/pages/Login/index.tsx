import React from 'react';
import tw, { styled } from 'twin.macro';
import { pxToRem } from '../../../styles/theme/utils';
import { media } from '../../../styles';
import { useTranslation } from 'react-i18next';
import BaseLayout from '../../layouts/BaseLayout';
import LoginForm from '../../containers/Login/LoginForm';
import { H1, P } from '../../../styles/constants/fonts';

const Wrapper = styled.div`
  ${tw`container mx-auto `}
  ${media.md`
    margin-top: ${pxToRem(20)}rem;
  `}
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  background-color: ${(p) => p.theme.contrastBackground};
  width: 100%;
  height: 90%;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  margin: ${pxToRem(20)}rem ${pxToRem(20)}rem 0 ${pxToRem(20)}rem;
  background: ${(p) => p.theme.contrastBackground};
`;

const PageTitle = styled(H1)`
  ${tw`w-full`}
  font-size: ${pxToRem(18)}rem;
  margin-bottom: ${pxToRem(10)}rem;
  background: ${(p) => p.theme.background};
  text-align: center;
`;

const Login = () => {
  const { t } = useTranslation();

  return (
    <BaseLayout>
      <Wrapper>
        <PageTitle>{t('login.title')}</PageTitle>
        <ContentWrapper>
          <LoginForm />
        </ContentWrapper>
      </Wrapper>
    </BaseLayout>
  );
};

export default Login;
