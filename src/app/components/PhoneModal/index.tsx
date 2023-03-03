import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { pxToRem } from 'styles/theme/utils';
import { PButton } from '../PButton';
import { PModal } from '../PModal';

interface Props {
  isShow: boolean;
  phone?: any;
  onClose?: () => void;
}

const Wrapper = styled.div``;

const CloseButton = styled(PButton)`
  width: 100%;
`;

const Heading = styled.div`
  text-align: center;
  text-transform: uppercase;
  font: 700 ${pxToRem(16)}rem / ${pxToRem(19)}rem ${(p) => p.theme.fontFamily};
`;

const Content = styled.div`
  margin: 30px 0;
  font: 700 ${pxToRem(20)}rem / ${pxToRem(23)}rem ${(p) => p.theme.fontFamily};
  text-align: center;
`;

const OutletPhoneModal: React.FC<Props> = ({ isShow, onClose = () => {}, phone = '' }) => {
  const { t } = useTranslation();
  return (
    <PModal open={isShow} onClose={onClose}>
      <Wrapper>
        <Heading>{t('shop.outletNumber')}</Heading>
        <Content>{phone}</Content>
        <CloseButton onClick={onClose}>{t('shop.close')}</CloseButton>
      </Wrapper>
    </PModal>
  );
};

export default React.memo(OutletPhoneModal);
