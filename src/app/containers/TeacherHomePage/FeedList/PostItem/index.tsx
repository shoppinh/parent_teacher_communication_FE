import React, { useCallback, useState } from 'react';
import { PButton } from '../../../../components/PButton';
import { pxToRem } from '../../../../../styles/theme/utils';
import AvatarPlaceholder from '../../../../../assets/images/person-placeholder.png';
import tw, { styled } from 'twin.macro';
import { PIcon } from '../../../../components/PIcon';
import { AddCommentTokenRequest, Comment } from '../../../../../types/Comment';
import { User } from '../../../../../types/User';
import PInput from '../../../../components/PInput';
import { Post } from '../../../../../types/Post';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken, getUser } from '../../../../../store/selectors/session';
import { usePostSlice } from '../../../../../store/slices/post';
interface Props {
  data: Post;
}

interface AvatarProps {
  src: string;
}

const Container = styled.div`
  background-color: ${(p) => p.theme.background};
  border-radius: 10px;
  margin-bottom: 50px;
`;
const AuthorSection = styled.div`
  padding: ${pxToRem(15)}rem 0;
  display: flex;
  &:hover {
    background-color: ${(p) => p.theme.background};
  }
`;
const Avatar = styled.img<AvatarProps>`
  background-image: url(${(p) => p.src});
  background-size: cover;
  background-position: center center;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  margin-left: ${pxToRem(10)}rem;
`;
const AuthorTitle = styled.p`
  font-size: ${pxToRem(16)}rem;
  font-weight: bold;
`;
const Description = styled.p`
  font-size: ${pxToRem(14)}rem;
  color: ${(p) => p.theme.placeholder};
`;
const PostTitleWrapper = styled.div``;
const PostContent = styled.div`
  ${tw`p-2`}
`;
const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
`;
const ReactionGroup = styled.div`
  ${tw`p-2`}
  display: flex;
  border-top: 1px solid ${(p) => p.theme.borderLight};
  border-bottom: 1px solid ${(p) => p.theme.borderLight};
`;
const CommentItem = styled.div`
  display: flex;
  padding: ${pxToRem(10)}rem 0;
  border-bottom: 1px solid ${(p) => p.theme.borderLight};
`;
const CommentContent = styled.div``;
const ReactionActionItem = styled.div`
  ${tw`mr-2 pr-2`}

  border-right: 1px solid ${(p) => p.theme.borderLight};
`;
const StyledIcon = styled(PIcon)`
  ${tw`mr-2 `}
  font-size: ${pxToRem(14)}rem;
`;
const AvatarWrapper = styled.div`
  border-left: 4px solid ${(p) => p.theme.backgroundVariant};
  margin-right: ${pxToRem(12)}rem;
`;
const AvatarCommentWrapper = styled.div`
  margin-right: ${pxToRem(12)}rem;
`;
const CommentInputSection = styled.div``;
const FormContainer = styled.form`
  ${tw`w-full`}
  margin-bottom: ${pxToRem(20)}rem;
`;
const PostItem: React.FC<Props> = ({ data: postData }) => {
  const [isShowCommentSection, setIsShowCommentSection] = useState(false);
  const currentAccessToken = useSelector(getAccessToken);
  const handleShowCommentSection = useCallback(() => {
    setIsShowCommentSection(!isShowCommentSection);
  }, [isShowCommentSection]);
  const dispatch = useDispatch();
  const { actions: postActions } = usePostSlice();

  const { register, handleSubmit, reset } = useForm<{ commentContent: string }>({
    defaultValues: {
      commentContent: '',
    },
  });
  const submitComment = useCallback(
    (data: { commentContent: string }) => {
      if (currentAccessToken) {
        const payload: AddCommentTokenRequest = {
          content: data.commentContent,
          postId: postData._id,
          token: currentAccessToken,
        };
        dispatch(postActions.addPostComment(payload));
        reset();
      }
    },
    [currentAccessToken, dispatch, postActions, postData._id, reset]
  );

  return (
    <Container>
      <AuthorSection>
        <AvatarWrapper>
          <Avatar src={postData?.author?.avatar || AvatarPlaceholder} />
        </AvatarWrapper>
        <PostTitleWrapper>
          <AuthorTitle>{postData?.author.username}</AuthorTitle>
          <Description>{postData?.title}</Description>
        </PostTitleWrapper>
      </AuthorSection>
      <PostContent dangerouslySetInnerHTML={{ __html: postData?.content }} />
      <ReactionGroup>
        <ReactionActionItem>
          <PButton>
            <StyledIcon className='partei-heart' />
            Like
          </PButton>
        </ReactionActionItem>
        <ReactionActionItem>
          <PButton onClick={handleShowCommentSection}>
            <StyledIcon className='partei-bubble2' />
            Comment
          </PButton>
        </ReactionActionItem>
      </ReactionGroup>
      {isShowCommentSection && (
        <CommentSection>
          {postData?.comments?.map((comment) => (
            <CommentItem>
              <AvatarCommentWrapper>
                <Avatar src={comment?.userId?.avatar || AvatarPlaceholder} />
              </AvatarCommentWrapper>
              <CommentContent>
                <AuthorTitle>{comment?.userId?.username}</AuthorTitle>
                <Description>{comment.content}</Description>
              </CommentContent>
            </CommentItem>
          ))}
          <CommentInputSection>
            <FormContainer onSubmit={handleSubmit(submitComment)}>
              <PInput placeholder='Write a comment...' {...register('commentContent')} />
              <input type='submit' hidden />
            </FormContainer>
          </CommentInputSection>
        </CommentSection>
      )}
    </Container>
  );
};

export default PostItem;
