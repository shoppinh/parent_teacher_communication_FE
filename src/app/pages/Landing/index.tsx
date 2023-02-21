import React from 'react';
import Logo from 'assets/images/app-logo.png';
import tw, { styled } from 'twin.macro';
import { pxToRem } from '../../../styles/theme/utils';
import { media } from '../../../styles';
import { PButton } from '../../components/PButton';
import { useTranslation } from 'react-i18next';
import { StyleConstants } from '../../../styles/constants/style';
import { useNavigate } from 'react-router-dom';
import SiteMap from '../../../utils/sitemap';
import BaseLayout from '../../layouts/BaseLayout';

const Wrapper = styled.div`
  ${tw`container mx-auto `}
  ${media.md`
    margin-top: ${pxToRem(20)}rem;
  `}
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  background-color: ${(p) => p.theme.background};
  width: 100%;
`;
const StyledButton = styled(PButton)`
  margin-bottom: ${pxToRem(10)}rem;
  color: ${(p) => p.theme.textOpposition};
  font: normal bold 16px / ${StyleConstants.BASE_LINE_HEIGHT}px ${StyleConstants.FONT_FAMILY};

  && {
    background-color: ${(p) => p.theme.backgroundVariant};
  }
`;

const ContentWrapper = styled.div`
  ${tw`flex flex-col items-center`}
  margin: 0 ${pxToRem(20)}rem;
`;

const Landing = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <BaseLayout>
      <Wrapper>
        <ContentWrapper>
          <img src={Logo} alt='Logo' />
          <StyledButton onClick={() => navigate(SiteMap.login.link)}>
            {t('login.login')}
          </StyledButton>
          <StyledButton onClick={() => navigate(SiteMap.register.link)}>
            {t('login.register')}
          </StyledButton>
          <StyledButton>{t('login.forgotPassword')}</StyledButton>
        </ContentWrapper>
      </Wrapper>
    </BaseLayout>
  );
};

export default Landing;
