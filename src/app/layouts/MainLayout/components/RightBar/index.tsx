import React from 'react';
import { pxToRem } from '../../../../../styles/theme/utils';
import { StyleConstants } from '../../../../../styles/constants/style';
import { styled } from 'twin.macro';
import { media } from '../../../../../styles';
import AvatarPlaceholder from 'assets/images/person-placeholder.png';
import { PButton } from '../../../../components/PButton';

const Container = styled.div`
  width: ${pxToRem(StyleConstants.LEFT_BAR_WIDTH)}rem;
  background-color: ${(p) => p.theme.background};
  border-left: 1px solid ${(p) => p.theme.borderLight};
  display: none;
  ${media.md`
    display: block;
  `}
`;
const MessageList = styled.div`
  display: flex;
  flex-direction: column;
`;
const MessageItem = styled.div`
  padding: ${pxToRem(15)}rem;
  display: flex;
  cursor: pointer;
  &:hover {
    background-color: ${(p) => p.theme.contrastBackground};
  }
`;
const Avatar = styled.img`
  background-image: url(${AvatarPlaceholder});
  background-size: cover;
  background-position: center center;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  margin-right: ${pxToRem(12)}rem;
`;
const MessageTo = styled.p`
  font-size: ${pxToRem(16)}rem;
  font-weight: bold;
`;
const MessageContent = styled.p`
  font-size: ${pxToRem(14)}rem;
  color: ${(p) => p.theme.placeholder};
`;
const MessageContentWrapper = styled.div``;
const StyledButton = styled(PButton)`
  padding: ${pxToRem(10)}rem ${pxToRem(20)}rem;
  margin: ${pxToRem(5)}rem ${pxToRem(10)}rem ${pxToRem(5)}rem 0;
  border-radius: ${pxToRem(20)}rem;
  font-weight: 700;
`;
const ButtonWrapper = styled.div`
  text-align: right;
  border-bottom: 1px solid ${(p) => p.theme.borderLight};
`;
const Message = () => {
  return (
    <MessageItem>
      <Avatar />
      <MessageContentWrapper>
        <MessageTo>Junior KienneiK</MessageTo>
        <MessageContent>You are sexy</MessageContent>
      </MessageContentWrapper>
    </MessageItem>
  );
};
const RightBar = () => {
  return (
    <Container>
      <ButtonWrapper>
        <StyledButton>New Message</StyledButton>
      </ButtonWrapper>
      <MessageList>
        <Message />
        <Message />
        <Message />
        <Message />
      </MessageList>
    </Container>
  );
};

export default RightBar;
