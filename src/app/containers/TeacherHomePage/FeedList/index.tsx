import { PLoadingIndicator } from 'app/components/PLoadingIndicatior';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getPostList, getPostLoading } from 'store/selectors/post';
import { getAccessToken } from 'store/selectors/session';
import { usePostSlice } from 'store/slices/post';
import { styled } from 'twin.macro';
import PostItem from './PostItem';

const Container = styled.div``;

const FeedList = () => {
  //   {
  //     _id: '1',
  //     content: 'hello world',
  //     title: 'hello world',
  //     author: {
  //       _id: '1',
  //       fullName: 'Kien mAc',
  //       userName: 'kienneik',
  //       mobilePhone: '0397273869',
  //       avatar: 'test-image',
  //     },
  //     comments: [
  //       {
  //         _id: '1',
  //         content: 'hello world',
  //         author: {
  //           _id: '2',
  //           fullName: 'Kien mAc 2',
  //           userName: 'kienneik',
  //           mobilePhone: '0397273869',
  //         },
  //       },
  //       {
  //         _id: '2',
  //         content: 'hello world',
  //         author: {
  //           _id: '2',
  //           fullName: 'Kien mAc 2',
  //           userName: 'kienneik',
  //           mobilePhone: '0397273869',
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     _id: '2',
  //     content: 'hello world',
  //     title: 'hello world',
  //     author: {
  //       _id: '1',
  //       fullName: 'Kien mAc',
  //       userName: 'kienneik',
  //       mobilePhone: '0397273869',
  //       avatar: 'test-image',
  //     },
  //     comments: [
  //       {
  //         _id: '1',
  //         content: 'hello world',
  //         author: {
  //           _id: '2',
  //           fullName: 'Kien mAc 2',
  //           userName: 'kienneik',
  //           mobilePhone: '0397273869',
  //         },
  //       },
  //       {
  //         _id: '2',
  //         content: 'hello world',
  //         author: {
  //           _id: '2',
  //           fullName: 'Kien mAc 2',
  //           userName: 'kienneik',
  //           mobilePhone: '0397273869',
  //         },
  //       },
  //     ],
  //   },
  // ];

  const { actions: postActions } = usePostSlice();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const classId = searchParams.get('classId');
  const currentAccessToken = useSelector(getAccessToken);
  const postList = useSelector(getPostList);
  const postLoading = useSelector(getPostLoading);

  useEffect(() => {
    if (classId && currentAccessToken) {
      dispatch(postActions.loadPostListByClass({ token: currentAccessToken, classId }));
    }
  }, [classId, currentAccessToken, dispatch, postActions]);

  return (
    <Container>
      {postLoading ? (
        <PLoadingIndicator />
      ) : (
        postList?.data?.map((post) => (
          <PostItem
            postContent={post.content}
            authorName={post.author?.fullName || post.author?.username || 'Unknown'}
            authorAvatar={'test-image'}
            postTitle={post.title}
            commentList={post.comments}
            key={post._id}
          />
        ))
      )}
    </Container>
  );
};

export default FeedList;
