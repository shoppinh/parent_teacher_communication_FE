import React, { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPostUpdateOrAddError,
  getPostUpdateOrAddLoading,
} from '../../../../../store/selectors/post';
import { usePostSlice } from '../../../../../store/slices/post';
import { useQuery } from '../../../../../utils/hook';
import { queryString } from '../../../../../utils/constants';
import { toast } from 'react-toastify';
import { PButton } from '../../../../components/PButton';
import { pxToRem } from '../../../../../styles/theme/utils';
import { StyleConstants } from '../../../../../styles/constants/style';
import { useTranslation } from 'react-i18next';
import PBackdropLoading from 'app/components/PBackdropLoading';
interface Props {
  handleClose: () => void;
  handleConfirm: () => void;
  triggerRefreshFeedList: () => void;
}

const Wrapper = styled.div`
  background-color: ${(p) => p.theme.background};
  padding: 20px;
  border-radius: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;
const DeleteModalHeader = styled.div`
  margin-bottom: 30px;
  text-align: center;
  font-size: ${pxToRem(20)}rem;
  font-weight: 700;
`;
const DeleteModalBody = styled.div``;
const DeleteModalContainer = styled.div`
  ${tw`container mx-auto`}
  padding: 0 40px;
`;
const StyledButton = styled(PButton)`
  margin-bottom: ${pxToRem(20)}rem;
  font: normal bold 16px / ${StyleConstants.BASE_LINE_HEIGHT}px ${StyleConstants.FONT_FAMILY};
  ${tw`rounded-full`}
  padding: 10px 30px;
`;
const PostDeleteModal: React.FC<Props> = ({
  handleClose,
  handleConfirm,
  triggerRefreshFeedList,
}) => {
  const postLoading = useSelector(getPostUpdateOrAddLoading);
  const postError = useSelector(getPostUpdateOrAddError);
  const [isFormSent, setIsFormSent] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    if (isFormSent && !postLoading && !postError) {
      toast(t('common.deleteSuccess'));
      triggerRefreshFeedList();
      handleClose();
      setIsFormSent(false);
    } else if (isFormSent && postError) {
      toast.error(postError.message);
      handleClose();
      setIsFormSent(false);
    }
  }, [handleClose, isFormSent, postError, postLoading, t, triggerRefreshFeedList]);
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
      <PBackdropLoading isShow={postLoading} />
    </Wrapper>
  );
};

export default React.memo(PostDeleteModal);
