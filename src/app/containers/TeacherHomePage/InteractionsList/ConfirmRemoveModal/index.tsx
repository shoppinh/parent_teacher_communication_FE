import React, { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { PButton } from '../../../../components/PButton';
import { pxToRem } from '../../../../../styles/theme/utils';
import { StyleConstants } from '../../../../../styles/constants/style';
import { getProgressError, getProgressLoading } from '../../../../../store/selectors/progress';
import PBackdropLoading from 'app/components/PBackdropLoading';
import { useTranslation } from 'react-i18next';

interface Props {
  handleClose: () => void;
  handleConfirm: () => void;
  triggerRefresh: () => void;
}

const Wrapper = styled.div`
  background-color: ${(p) => p.theme.background};
  padding: 20px;
  border-radius: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: ${pxToRem(40)}rem;
`;
const DeleteModalHeader = styled.div`
  margin-bottom: 30px;
  text-align: center;
  font-size: ${pxToRem(20)}rem;
  font-weight: 700;
`;
const DeleteModalBody = styled.div`
  margin-top: ${pxToRem(20)}rem;
`;
const DeleteModalContainer = styled.div`
  ${tw`container mx-auto`}
  padding: 0 40px;
`;
const StyledButton = styled(PButton)`
  margin-bottom: ${pxToRem(20)}rem;
  font: normal bold 16px / ${StyleConstants.BASE_LINE_HEIGHT}px ${StyleConstants.FONT_FAMILY};
  ${tw`rounded-full`}
  padding: ${pxToRem(10)}rem ${pxToRem(30)}rem;
`;
const RemoveMarkModal: React.FC<Props> = ({ handleClose, handleConfirm, triggerRefresh }) => {
  const progressLoading = useSelector(getProgressLoading);
  const progressError = useSelector(getProgressError);
  const [isFormSent, setIsFormSent] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    if (isFormSent && !progressLoading && !progressError) {
      toast(t('common.deleteSuccess'));
      triggerRefresh();
      handleClose();
      setIsFormSent(false);
    } else if (isFormSent && progressError) {
      toast.error(progressError.message);
      handleClose();
      setIsFormSent(false);
    }
  }, [handleClose, isFormSent, progressError, progressLoading, t, triggerRefresh]);
  return (
    <Wrapper>
      <DeleteModalContainer>
        <DeleteModalHeader>{t('common.confirmDelete')}</DeleteModalHeader>
        <DeleteModalBody>
          <ButtonGroup>
            <StyledButton variant='secondary' onClick={handleClose}>
              {t('common.cancel')}
            </StyledButton>
            <StyledButton
              variant='primary'
              onClick={() => {
                handleConfirm();
                setIsFormSent(true);
              }}
            >
              {t('common.confirm')}
            </StyledButton>
          </ButtonGroup>
        </DeleteModalBody>
      </DeleteModalContainer>
      <PBackdropLoading isShow={progressLoading} />
    </Wrapper>
  );
};

export default React.memo(RemoveMarkModal);
