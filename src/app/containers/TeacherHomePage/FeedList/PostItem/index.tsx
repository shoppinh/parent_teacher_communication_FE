import React, { useCallback, useState } from 'react';
import { PButton } from '../../../../components/PButton';
import { pxToRem } from '../../../../../styles/theme/utils';
import AvatarPlaceholder from '../../../../../assets/images/person-placeholder.png';
import tw, { styled } from 'twin.macro';
import { PIcon } from '../../../../components/PIcon';
import { Comment } from '../../../../../types/Comment';
interface Props {
  postContent: string;
  authorName: string;
  authorAvatar: string;
  postTitle: string;
  commentList: Comment[];
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
const Avatar = styled.img`
  background-image: url(${AvatarPlaceholder});
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
const PostItem: React.FC<Props> = ({ authorName, postTitle, commentList, postContent }) => {
  const [isShowCommentSection, setIsShowCommentSection] = useState(false);
  const handleShowCommentSection = useCallback(() => {
    setIsShowCommentSection(!isShowCommentSection);
  }, [isShowCommentSection]);
  return (
    <Container>
      <AuthorSection>
        <AvatarWrapper>
          <Avatar />
        </AvatarWrapper>
        <PostTitleWrapper>
          <AuthorTitle>{authorName}</AuthorTitle>
          <Description>{postTitle}</Description>
        </PostTitleWrapper>
      </AuthorSection>
      <PostContent>{postContent}</PostContent>
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
          {commentList.map((comment) => (
            <CommentItem>
              <AvatarCommentWrapper>
                <Avatar />
              </AvatarCommentWrapper>
              <CommentContent>
                <AuthorTitle>{comment.author.fullName}</AuthorTitle>
                <Description>{comment.content}</Description>
              </CommentContent>
            </CommentItem>
          ))}
        </CommentSection>
      )}
    </Container>
  );
};

export default PostItem;
