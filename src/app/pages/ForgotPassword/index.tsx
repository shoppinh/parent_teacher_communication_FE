import React, { useEffect } from 'react';
import Logo from 'assets/images/app-logo.png';
import tw, { styled } from 'twin.macro';
import { pxToRem } from '../../../styles/theme/utils';
import { PButton } from '../../components/PButton';
import { Trans, useTranslation } from 'react-i18next';
import { StyleConstants } from '../../../styles/constants/style';
import { useNavigate } from 'react-router-dom';
import SiteMap from '../../../utils/sitemap';
import BaseLayout from '../../layouts/BaseLayout';
import { getUser } from 'store/selectors/session';
import { useSelector } from 'react-redux';
import { ConstantRoles } from 'utils/constants';

const Wrapper = styled.div`
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  background-color: ${(p) => p.theme.background};
  width: 50%;
  height: 90%;
`;
const StyledButton = styled(PButton)`
  margin-bottom: ${pxToRem(15)}rem;
  color: ${(p) => p.theme.textOpposition};
  font: normal bold 16px / ${StyleConstants.BASE_LINE_HEIGHT}px ${StyleConstants.FONT_FAMILY};

  && {
    background-color: ${(p) => p.theme.backgroundVariant};
  }

  padding: ${pxToRem(10)}rem;
  ${tw`rounded-full w-full`}
`;

const ContentWrapper = styled.div`
  ${tw`flex flex-col items-center`}
  margin: 0 ${pxToRem(20)}rem;
  height: 100%;
`;

const StyledImage = styled.img`
  width: 60%;
`;
const ActionGroup = styled.div`
  width: 100%;
  margin-top: ${pxToRem(120)}rem;
`;
const TextContent = styled.p`
  font: 400 ${pxToRem(16)}rem / ${StyleConstants.BASE_LINE_HEIGHT}px ${StyleConstants.FONT_FAMILY};
  margin-top: ${pxToRem(20)}rem;
`;
const phoneNumber = '0397273869';

const ForgotPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <BaseLayout title={t('landing.title')}>
      <Wrapper>
        <ContentWrapper>
          <StyledImage src={Logo} alt='Logo' />
          <TextContent>
            <Trans
              i18nKey='login.forgotPasswordInstruction'
              values={{ phoneNumber }}
              components={[<strong />]}
              key={phoneNumber}
            />
          </TextContent>
          <ActionGroup>
            <StyledButton onClick={() => navigate(SiteMap.login.link)}>
              {t('login.goBackToLogin')}
            </StyledButton>
          </ActionGroup>
        </ContentWrapper>
      </Wrapper>
    </BaseLayout>
  );
};

export default ForgotPassword;
