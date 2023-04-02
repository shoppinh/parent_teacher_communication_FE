import PBackdropLoading from 'app/components/PBackdropLoading';
import { PButton } from 'app/components/PButton';
import PInput from 'app/components/PInput';
import { PLoader } from 'app/components/PLoader';
import { PLoadingIndicator } from 'app/components/PLoadingIndicatior';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getConfigError, getConfigLoading } from 'store/selectors/config';
import { getAccessToken } from 'store/selectors/session';
import { useConfigSlice } from 'store/slices/config';
import { StyleConstants } from 'styles/constants/style';
import { pxToRem } from 'styles/theme/utils';
import tw, { styled } from 'twin.macro';
const Container = styled.div`
  width: 50vw;
  height: 70vh;
  background-color: ${(p) => p.theme.background};
  border-radius: 10px;
  padding: ${pxToRem(15)}rem;
`;
const InvitationModalHeader = styled.div`
  margin-bottom: ${pxToRem(20)}rem;
  text-align: center;
  font-size: ${pxToRem(22)}rem;
  font-weight: 700;
`;
const InvitationModalBody = styled.div``;
const InvitationModalContainer = styled.div`
  ${tw`container mx-auto`}
  padding: 0 40px;
`;
const FormContainer = styled.form`
  ${tw`w-full`}
  margin-bottom: ${pxToRem(20)}rem;
`;
const InputContainer = styled.div`
  margin-bottom: ${pxToRem(10)}rem;
`;

const InputLabel = styled.div`
  font-size: ${pxToRem(16)}rem;
  line-height: ${pxToRem(24)}rem;
  color: ${(p) => p.theme.text};
  margin-bottom: ${pxToRem(5)}rem;
`;
const Required = styled.span`
  color: ${(p) => p.theme.danger};
`;
const StyledInput = styled(PInput)`
  background: ${(p) => p.theme.background};
  padding: ${pxToRem(12)}rem ${pxToRem(20)}rem;
  font-size: ${pxToRem(16)}rem;
  line-height: ${pxToRem(24)}rem;
  width: 100%;
`;
const ActionGroup = styled.div`
  margin-top: ${pxToRem(20)}rem;
`;
const StyledButton = styled(PButton)`
  margin-bottom: ${pxToRem(20)}rem;
  font: normal bold 16px / ${StyleConstants.BASE_LINE_HEIGHT}px ${StyleConstants.FONT_FAMILY};
  ${tw`rounded-full w-full p-3`}
`;

interface Props {
  onClose: () => void;
}
const InvitationModal: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation();
  const { actions: configActions } = useConfigSlice();
  const [isFormSent, setIsFormSent] = React.useState(false);
  const dispatch = useDispatch();
  const currentAccessToken = useSelector(getAccessToken);
  const configError = useSelector(getConfigError);
  const configLoading = useSelector(getConfigLoading);
  const sendInvitation = useCallback(
    (data: { email: string }) => {
      if (currentAccessToken) {
        dispatch(
          configActions.sendInvitation({ email: data.email, accessToken: currentAccessToken })
        );
      }

      setIsFormSent(true);
    },
    [configActions, currentAccessToken, dispatch]
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<{
    email: string;
  }>();

  useEffect(() => {
    if (isFormSent && !configError && !configLoading) {
      setIsFormSent(false);
      toast.success(t('common.invitationSent'));
      onClose();
    } else if (isFormSent && configError && !configLoading) {
      setIsFormSent(false);
      toast.error(configError.message);
    }
  }, [configActions, configError, configLoading, dispatch, isFormSent, onClose, t]);

  return (
    <Container>
      <InvitationModalContainer>
        <InvitationModalHeader>{t('common.invitation')}</InvitationModalHeader>
        <InvitationModalBody>
          <FormContainer onSubmit={handleSubmit(sendInvitation)}>
            <InputContainer>
              <InputLabel>{t('form.email')}</InputLabel>
              <StyledInput {...register('email')} required />
              {errors.email && <Required>{errors.email.message}</Required>}
            </InputContainer>
            <ActionGroup>
              <StyledButton type='submit' disabled={!isDirty} variant='primary'>
                {t('form.sendInvitation')}
              </StyledButton>
            </ActionGroup>
          </FormContainer>
        </InvitationModalBody>
      </InvitationModalContainer>
      <PBackdropLoading isShow={configLoading || false} />
    </Container>
  );
};

export default InvitationModal;
