import React from 'react';
import tw, { styled } from 'twin.macro';
import { pxToRem } from '../../../styles/theme/utils';
import { media } from '../../../styles';
import { useTranslation } from 'react-i18next';
import BaseLayout from '../../layouts/BaseLayout';
import LoginForm from '../../containers/Login/LoginForm';
import { H1 } from '../../../styles/constants/fonts';
import { PIcon } from 'app/components/PIcon';
import { PButton } from 'app/components/PButton';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  ${tw`container mx-auto `}
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  background-color: ${(p) => p.theme.contrastBackground};
  width: 50%;
  height: 90%;
  overflow: hidden;
  padding: ${pxToRem(10)}rem;

`;

const ContentWrapper = styled.div`
  margin: ${pxToRem(20)}rem ${pxToRem(40)}rem 0 ${pxToRem(40)}rem;
  background: ${(p) => p.theme.contrastBackground};
`;

const PageTitle = styled(H1)`
  font-size: ${pxToRem(22)}rem;
  text-align: center;
  flex: 1;
  margin-right: ${pxToRem(40)}rem;
`;
const PageHeader = styled.div`
  ${tw`w-full`}
  background: ${(p) => p.theme.contrastBackground};
  margin-bottom: ${pxToRem(10)}rem;
  display: flex;
`;
const StyledButton = styled(PButton)`
  width: 40px;
  && {
    background-color: ${(p) => p.theme.contrastBackground};
  }
`;
const StyledIcon = styled(PIcon)`
  font-size: ${pxToRem(20)}rem;
  color: ${(p) => p.theme.text};
`;
const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <BaseLayout title={t('login.title')}>
      <Wrapper>
        <PageHeader>
          <StyledButton type='button' onClick={() => navigate(-1)}>
            <StyledIcon className='partei-arrow-left' />
          </StyledButton>
          <PageTitle>{t('login.title')}</PageTitle>
        </PageHeader>
        <ContentWrapper>
          <LoginForm />
        </ContentWrapper>
      </Wrapper>
    </BaseLayout>
  );
};

export default Login;
