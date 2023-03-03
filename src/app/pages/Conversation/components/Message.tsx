import React from 'react';
import { pxToRem } from 'styles/theme/utils';
import { styled } from 'twin.macro';
import { MessageItem } from 'types/Conversation';
import { formatDateWithLocale } from 'utils/dateHelpers/formatDate';

interface Props {
  message: MessageItem;
  currentPhone?: string;
  currentRole?: number;
}

interface BubbleType {
  isOther?: boolean;
}

const MessageRow = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  margin: 10px 0;
`;

const Bubble = styled.div<BubbleType>`
  background: ${(p) => (p.isOther ? (p) => p.theme.background : p.theme.secondary)};
  border-radius: 10px;
  padding: 10px 12px;
  width: 232px;
`;

const DateText = styled.div`
  width: 100%;
  font-weight: 700;
  text-align: center;
`;

const TimeText = styled.div`
  font-weight: 400;
  color: ${(p) => p.theme.placeholder};
`;

const Header = styled.div`
  font: 400 ${pxToRem(13)}rem / ${pxToRem(15)}rem ${(p) => p.theme.fontFamily};
  margin-bottom: 11px;
  display: flex;
  justify-content: space-between;
`;

const Content = styled.div`
  font: 400 ${pxToRem(15)}rem / ${pxToRem(20)}rem ${(p) => p.theme.fontFamily};
  white-space: pre-wrap;
`;

const UserName = styled.div`
  font-weight: 700;
`;

const SpanContent = styled.span`
  white-space: pre-line;
  word-wrap: break-word;
`;

const Message: React.FC<Props> = ({ message, currentPhone, currentRole }) => {
  return (
    <MessageRow
      className={
        message.mobilePhone === currentPhone && message.roleId === currentRole
          ? 'justify-content-end'
          : ''
      }
    >
      {message.contentType === 'date' && <DateText>{message.content}</DateText>}
      {message.contentType === 'text' && (
        <Bubble isOther={message.mobilePhone !== currentPhone || message.roleId !== currentRole}>
          <Header>
            <UserName>{message.userName}</UserName>
            <TimeText>{formatDateWithLocale(new Date(message.createdAt), 'vi', 'HH:mm')}</TimeText>
          </Header>
          {/* <div>{message.createdAt}</div> */}
          <Content>
            <SpanContent>{message.content}</SpanContent>
          </Content>
        </Bubble>
      )}
    </MessageRow>
  );
};

export default React.memo(Message);
