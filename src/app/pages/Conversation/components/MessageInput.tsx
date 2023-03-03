import { PButton } from 'app/components/PButton';
import { PIcon } from 'app/components/PIcon';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

interface Props {
  message?: string;
  onChange?: (event: any) => void;
  sendMessage?: () => void;
}

const MessageInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(p) => p.theme.background};
  border-radius: 50rem;
  padding: 12px 20px;
  margin: 10px 1rem 22px;
`;

const Input = styled.textarea`
  border: none;
  width: 100%;
  outline: none;
  resize: none;
  padding: 0;
`;

const SendButton = styled(PButton)`
  min-width: 44px;
  min-height: 44px;
  padding: 0 !important;
  line-height: 1 !important;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HiddenDiv = styled.div`
  position: absolute;
  visibility: hidden;
  height: auto;
  width: auto;
  display: flex;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const MessageInput: React.FC<Props> = ({
  message = '',
  onChange = () => {},
  sendMessage = () => {},
}) => {
  const { t } = useTranslation();
  const hiddenRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [row, setRow] = useState(1);

  const handleEnter = useCallback(
    (e) => {
      const keyCode = e.which || e.keyCode;

      // 13 represents the Enter key
      if (keyCode === 13 && !e.shiftKey) {
        // Don't generate a new line
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage]
  );

  useEffect(() => {
    const inputWidth = inputRef.current?.getBoundingClientRect()?.width || 0;
    const hiddenWidth = Math.round(hiddenRef.current?.getBoundingClientRect()?.width || 0);
    const numberOfLineBreaks = (message.match(/\n/g) || []).length;
    if (numberOfLineBreaks > 0) {
      setRow(2);
    } else {
      if (inputWidth > 0 && hiddenWidth > 0 && message !== '') {
        if (hiddenWidth < inputWidth) {
          setRow(1);
        } else {
          setRow(2);
        }
      } else {
        setRow(1);
      }
    }
  }, [message]);

  return (
    <form>
      <MessageInputWrapper className='rounded-pill'>
        <InputWrapper>
          <Input
            ref={inputRef}
            rows={row}
            wrap='hard'
            value={message}
            placeholder={t('conversation.sendMesssage') as string}
            onChange={onChange}
            onKeyDown={handleEnter}
          />
          <HiddenDiv ref={hiddenRef}>{message}</HiddenDiv>
        </InputWrapper>
        <SendButton
          type='submit'
          onClick={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <PIcon className='umni-send' />
        </SendButton>
      </MessageInputWrapper>
    </form>
  );
};

export default React.memo(MessageInput);
