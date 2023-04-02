import { PButton } from 'app/components/PButton';
import { t } from 'i18next';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSessionSlice } from 'store/slices/session';
import { StyleConstants } from 'styles/constants/style';
import { pxToRem } from 'styles/theme/utils';
import tw, { styled } from 'twin.macro';
import { AuthPayLoad } from 'types/Session';
import { PREVIOUS_STORAGE_KEY } from 'utils/constants';
const Container = styled.div`
  width: 50vw;
  height: 70vh;
  background-color: ${(p) => p.theme.background};
  border-radius: 10px;
  padding: ${pxToRem(15)}rem;
`;
const SettingModalHeader = styled.div`
  margin-bottom: ${pxToRem(20)}rem;
  text-align: center;
  font-size: ${pxToRem(22)}rem;
  font-weight: 700;
`;
const SettingModalBody = styled.div``;
const SettingModalContainer = styled.div`
  ${tw`container mx-auto`}
  padding: 0 40px;
`;
const StyledButton = styled(PButton)`
  margin-bottom: ${pxToRem(20)}rem;
  font: normal bold 16px / ${StyleConstants.BASE_LINE_HEIGHT}px ${StyleConstants.FONT_FAMILY};
  ${tw`rounded-full w-full p-3`}
`;

interface Props {
  onClose: () => void;
}
const SettingModal: React.FC<Props> = ({ onClose }) => {
  const previousAuthStorage = localStorage.getItem(PREVIOUS_STORAGE_KEY);
  const previousAuth = JSON.parse(
    previousAuthStorage && previousAuthStorage !== '' ? previousAuthStorage : '{}'
  ) as AuthPayLoad;
  const { actions: sessionActions } = useSessionSlice();
  const dispatch = useDispatch();

  return (
    <Container>
      <SettingModalContainer>
        <SettingModalHeader>{t('common.settings')}</SettingModalHeader>
        <SettingModalBody>
          <StyledButton
            variant='primary'
            onClick={() => {
              if (previousAuth.accessToken && previousAuth.accessToken !== '') {
                dispatch(
                  sessionActions.doLogout({
                    userId: previousAuth.user?.data?._id,
                    fcmToken: previousAuth.fcmToken,
                    token: previousAuth.accessToken,
                  })
                );
              }
            }}
          >
            {t('common.logout')}
          </StyledButton>
        </SettingModalBody>
      </SettingModalContainer>
    </Container>
  );
};

export default SettingModal;
