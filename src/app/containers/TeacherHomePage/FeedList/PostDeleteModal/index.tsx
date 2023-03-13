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
interface Props {
  handleClose: () => void;
  handleConfirm: () => void;
  triggerRefreshFeedList: (isRefresh: boolean) => void;
}

const Wrapper = styled.div``;
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
      triggerRefreshFeedList(true);
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
      <div>Do you want to delete ?</div>
      <div>
        <button onClick={handleClose}>Cancel</button>
        <button
          onClick={() => {
            handleConfirm();
            setIsFormSent(true);
          }}
        >
          Confirm
        </button>
      </div>
    </Wrapper>
  );
};

export default PostDeleteModal;
