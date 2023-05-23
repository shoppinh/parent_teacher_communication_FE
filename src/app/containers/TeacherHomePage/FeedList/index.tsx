import { PLoadingIndicator } from 'app/components/PLoadingIndicatior';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostList, getPostLoading } from 'store/selectors/post';
import { getAccessToken } from 'store/selectors/session';
import { usePostSlice } from 'store/slices/post';
import { styled } from 'twin.macro';
import PostItem from './PostItem';
import { queryString } from '../../../../utils/constants';
import { useQuery } from '../../../../utils/hook';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Container = styled.div``;
const EmptyPostMessage = styled.div`
  text-align: center;
  font-size: 20px;
  color: ${(p) => p.theme.placeholder};
  margin-top: 20px;
`;
interface Props {
  isRefresh: boolean;
  setIsRefreshFeedList: (isRefresh: boolean) => void;
  triggerRefreshFeedList: () => void;
}

const FeedList: React.FC<Props> = ({ isRefresh, setIsRefreshFeedList, triggerRefreshFeedList }) => {
  const { actions: postActions } = usePostSlice();
  const dispatch = useDispatch();
  const classId = useQuery().get(queryString.classId);
  const currentAccessToken = useSelector(getAccessToken);
  const postList = useSelector(getPostList);
  const postLoading = useSelector(getPostLoading);
  const { t } = useTranslation();
  useEffect(() => {
    if (isRefresh && classId && currentAccessToken) {
      dispatch(postActions.loadPostListByClass({ token: currentAccessToken, classId }));
      setIsRefreshFeedList(false);
    } else if (classId && currentAccessToken) {
      dispatch(postActions.loadPostListByClass({ token: currentAccessToken, classId }));
    }
  }, [classId, currentAccessToken, dispatch, isRefresh, postActions, setIsRefreshFeedList]);

  return (
    <Container>
      {postLoading ? (
        <PLoadingIndicator />
      ) : postList?.data?.length ? (
        postList?.data?.map((post) => (
          <PostItem data={post} key={post._id} triggerRefreshFeedList={triggerRefreshFeedList} />
        ))
      ) : (
        <EmptyPostMessage>{t('common.noPost')}</EmptyPostMessage>
      )}
    </Container>
  );
};

export default React.memo(FeedList);
