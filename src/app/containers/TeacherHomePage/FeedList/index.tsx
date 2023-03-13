import { PLoadingIndicator } from 'app/components/PLoadingIndicatior';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getPostList, getPostLoading } from 'store/selectors/post';
import { getAccessToken } from 'store/selectors/session';
import { usePostSlice } from 'store/slices/post';
import { styled } from 'twin.macro';
import PostItem from './PostItem';
import { queryString } from '../../../../utils/constants';

const Container = styled.div``;

interface Props {
  isRefresh: boolean;
  setIsRefreshFeedList: (isRefresh: boolean) => void;
  triggerRefreshFeedList: (isRefresh: boolean) => void;
}

const FeedList: React.FC<Props> = ({ isRefresh, setIsRefreshFeedList, triggerRefreshFeedList }) => {
  const { actions: postActions } = usePostSlice();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const classId = searchParams.get(queryString.classId);
  const currentAccessToken = useSelector(getAccessToken);
  const postList = useSelector(getPostList);
  const postLoading = useSelector(getPostLoading);

  // const handleGetPostList = useCallback(() => {
  //   if (classId && currentAccessToken) {
  //   }
  // }, [classId, currentAccessToken, dispatch, postActions]);

  useEffect(() => {
    if (classId && currentAccessToken) {
      dispatch(postActions.loadPostListByClass({ token: currentAccessToken, classId }));
    }
  }, [classId, currentAccessToken, dispatch, postActions]);

  useEffect(() => {
    if (isRefresh && classId && currentAccessToken) {
      dispatch(postActions.loadPostListByClass({ token: currentAccessToken, classId }));
      setIsRefreshFeedList(false);
    }
  }, [classId, currentAccessToken, dispatch, isRefresh, postActions, setIsRefreshFeedList]);

  return (
    <Container>
      {postLoading ? (
        <PLoadingIndicator />
      ) : postList?.data?.length ? (
        postList?.data?.map((post) => <PostItem data={post} key={post._id} triggerRefreshFeedList={triggerRefreshFeedList} />)
      ) : (
        <p>No post</p>
      )}
    </Container>
  );
};

export default FeedList;
