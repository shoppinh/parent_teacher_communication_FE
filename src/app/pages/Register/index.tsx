import RegisterForm from 'app/containers/Register/RegisterForm';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import { H1 } from '../../../styles/constants/fonts';
import { pxToRem } from '../../../styles/theme/utils';
import BaseLayout from '../../layouts/BaseLayout';
import { PButton } from 'app/components/PButton';
import { PIcon } from 'app/components/PIcon';
import SiteMap from 'utils/sitemap';

const Wrapper = styled.div`
  ${tw`container mx-auto `}
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  background-color: ${(p) => p.theme.contrastBackground};
  width: 50%;
  height: 90%;
  overflow: auto;
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

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <BaseLayout title={t('register.title')}>
      <Wrapper>
        <PageHeader>
          <StyledButton type='button' onClick={() => navigate(SiteMap.landing.link)}>
            <StyledIcon className='partei-arrow-left' />
          </StyledButton>
          <PageTitle>{t('register.title')}</PageTitle>
        </PageHeader>
        <ContentWrapper>
          <RegisterForm />
        </ContentWrapper>
      </Wrapper>
    </BaseLayout>
  );
};

export default Register;
