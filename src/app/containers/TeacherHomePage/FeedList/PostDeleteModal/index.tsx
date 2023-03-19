import React, { useEffect, useState } from 'react';
import { styled } from 'twin.macro';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPostUpdateOrAddError,
  getPostUpdateOrAddLoading,
} from '../../../../../store/selectors/post';
import { usePostSlice } from '../../../../../store/slices/post';
import { useQuery } from '../../../../../utils/hook';
import { queryString } from '../../../../../utils/constants';
import { toast } from 'react-toastify';
import {PButton} from "../../../../components/PButton";
interface Props {
  handleClose: () => void;
  handleConfirm: () => void;
  triggerRefreshFeedList: () => void;
}

const Wrapper = styled.div``;
const ConfirmTitle = styled.h1`
    text-align: center;
  
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`
const PostDeleteModal: React.FC<Props> = ({
  handleClose,
  handleConfirm,
  triggerRefreshFeedList,
}) => {
  const postLoading = useSelector(getPostUpdateOrAddLoading);
  const postError = useSelector(getPostUpdateOrAddError);
  const [isFormSent, setIsFormSent] = useState(false);

  useEffect(() => {
    if (isFormSent && !postLoading && !postError) {
      toast('Delete successfully');
      triggerRefreshFeedList();
      handleClose();
      setIsFormSent(false);
    } else if (isFormSent && postError) {
      toast.error(postError.message);
      handleClose();
      setIsFormSent(false);
    }
  }, [handleClose, isFormSent, postError, postLoading, triggerRefreshFeedList]);
  return (
    <Wrapper>
      <ConfirmTitle>Do you want to delete ?</ConfirmTitle>
      <ButtonGroup>
        <PButton onClick={handleClose}>Cancel</PButton>
        <PButton
          onClick={() => {
            handleConfirm();
            setIsFormSent(true);
          }}
        >
          Confirm
        </PButton>
      </ButtonGroup>
    </Wrapper>
  );
};

export default PostDeleteModal;
