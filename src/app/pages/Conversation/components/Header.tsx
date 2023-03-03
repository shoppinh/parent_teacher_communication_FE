import React from 'react';
import PAnchor from 'app/components/PAnchor';
import { PIcon } from 'app/components/PIcon';
import { useTranslation } from 'react-i18next';
import { media } from 'styles';
import { pxToRem } from 'styles/theme/utils';
import { styled } from 'twin.macro';

interface Props {
  message: string;
  toPhone?: string;
  onClose?: (v: any) => void;
  onClickPhone?: (v: any) => void;
}

const Heading = styled.div`
  text-align: center;
  position: relative;
  min-height: 95px;
  display: flex;
  align-items: center;
  justify-content: center;
  font: 700 ${pxToRem(16)}rem / ${pxToRem(19)}rem ${(p) => p.theme.fontFamily};
  border-bottom: 1px solid ${(p) => p.theme.separating};

  ${media.md`
    // padding: 23px 0 20px;
    font: 700 ${pxToRem(20)}rem/${pxToRem(24)}rem ${(p) => p.theme.fontFamily};
  `}
`;

const CloseButton = styled.div`
  position: absolute;
  top: 50%;
  width: 48px;
  height: 48px;
  left: 1rem;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CallArchor = styled(PAnchor)`
  position: absolute;
  top: 50%;
  width: 48px;
  height: 48px;
  right: 1rem;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

const Alert = styled.div`
  position: absolute;
  top: 95px;
  left: 0;
  background: ${(p) => p.theme.warningOpacity};
  font: 400 ${pxToRem(12)}rem / ${pxToRem(14)}rem ${(p) => p.theme.fontFamily};
  padding: 5px 1rem;
  backdrop-filter: blur(10px);
  width: 100%;
`;

const Title = styled.div`
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font: 700 ${pxToRem(16)}rem / ${pxToRem(20)}rem ${(p) => p.theme.fontFamily};
  color: ${(p) => p.theme.text};
  padding: 0 48px;

  ${media.md`
    font: 700 ${pxToRem(20)}rem/${pxToRem(24)}rem ${(p) => p.theme.fontFamily};
    // color: ${(p) => p.theme.text};
    // text-transform: none;
  `}
`;

const Header: React.FC<Props> = ({ message = '', toPhone, onClose, onClickPhone = () => {} }) => {
  const { t } = useTranslation();

  return (
    <Heading>
      <CloseButton className='' onClick={onClose}>
        <PIcon className='partei-cancel' />
      </CloseButton>
      <Title>{t('conversation.title')}</Title>
      <CallArchor href={`tel:${toPhone}`} onClick={onClickPhone}>
        <PIcon className='partei-phone' />
      </CallArchor>
      {message !== '' && <Alert>{message}</Alert>}
    </Heading>
  );
};

export default React.memo(Header);
