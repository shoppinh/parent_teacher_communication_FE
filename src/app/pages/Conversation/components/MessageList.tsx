import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { Messages } from 'types/Conversation';
import { parseToDayjs, formatDateWithLocale } from 'utils/dateHelpers/formatDate';
import Message from './Message';

interface Props {
  messages?: Messages;
  messageKeyList?: string[];
  fromUserPhone?: string;
  fromUserRole?: number;
  roomId?: number;
}

const Wrapper = styled.div`
  flex: 1;
  overflow: auto;
  display: block;
  -webkit-overflow-scrolling: touch;
  whitespace: nowrap;
  padding: 0 1rem;
`;

const ListComponent = styled.div`
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;
`;

const MessageList: React.FC<Props> = ({
  messages,
  messageKeyList,
  fromUserPhone,
  fromUserRole,
  roomId,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current?.scrollHeight || 0;
    }
  }, [messageKeyList]);

  return (
    <Wrapper ref={ref}>
      <ListComponent>
        {messages &&
          messageKeyList &&
          messageKeyList.map((item, index) => {
            const message = messages[item];
            const nextKey = messageKeyList[index + 1];
            return (
              <React.Fragment key={item}>
                <Message
                  message={message}
                  currentPhone={fromUserPhone}
                  currentRole={fromUserRole}
                />
                {!(
                  nextKey &&
                  parseToDayjs(new Date(Number(nextKey))).isSame(new Date(Number(item)), 'day')
                ) && (
                  <Message
                    message={{
                      content: parseToDayjs(new Date(Number(item))).isSame(new Date(), 'day')
                        ? t('conversation.today')
                        : parseToDayjs(new Date(Number(item))).isBefore(new Date(), 'day')
                        ? t('conversation.yesterday')
                        : formatDateWithLocale(new Date(Number(item)), 'vi', 'dd/MM/yyyy'),
                      contentType: 'date',
                      createdAt: new Date(Number(item)),
                      isRead: false,
                      mobilePhone: '',
                      userName: '',
                      roomId: roomId || NaN,
                      userId: '',
                      roleId: 3,
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
      </ListComponent>
    </Wrapper>
  );
};

export default React.memo(MessageList);
