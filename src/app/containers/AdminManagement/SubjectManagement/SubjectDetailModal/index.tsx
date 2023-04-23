import PBackdropLoading from 'app/components/PBackdropLoading';
import { PButton } from 'app/components/PButton';
import { PIcon } from 'app/components/PIcon';
import PInput from 'app/components/PInput';
import { PLoadingIndicator } from 'app/components/PLoadingIndicatior';
import React, { useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAdminActionLoading, getAdminError, getAdminLoading } from 'store/selectors/admin';
import { getAccessToken } from 'store/selectors/session';
import { useAdminSlice } from 'store/slices/admin';
import { pxToRem } from 'styles/theme/utils';
import tw, { styled } from 'twin.macro';
import { Subject, SubjectPayload } from 'types/Subject';
interface Props {
  value: Subject | null;
  type: 'edit' | 'add';
  handleClose: () => void;
  triggerRefresh: () => void;
}
const Wrapper = styled.div`
  padding: 20px;
  background-color: ${(p) => p.theme.background};
  height: 100vh;
  overflow-y: auto;
  width: 50vw;
`;

const StyledButton = styled(PButton)`
  ${tw`rounded-full w-full`}
  font-weight: bold;
  font-size: 16px;
  padding: 10px 20px;
  margin-top: 10px;
`;

const ActionGroup = styled.div`
  ${tw`flex justify-between`};
  margin-bottom: 20px;
`;

const StyledIcon = styled(PIcon)`
  font-size: 20px;
`;

const FormContainer = styled.form`
  ${tw`w-full`}
  margin-bottom: ${pxToRem(20)}rem;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const InputContainer = styled.div`
  margin-bottom: ${pxToRem(10)}rem;
`;

const InputLabel = styled.div`
  font-size: ${pxToRem(16)}rem;
  line-height: ${pxToRem(24)}rem;
  color: ${(p) => p.theme.text};
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
const ModalTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
`;
const SubjectDetailModal: React.FC<Props> = ({ handleClose, triggerRefresh, type, value }) => {
  const { t } = useTranslation();
  const [isFormSent, setIsFormSent] = React.useState(false);
  const accessToken = useSelector(getAccessToken);
  const dispatch = useDispatch();
  const { actions: adminActions } = useAdminSlice();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<SubjectPayload>();
  const loading = useSelector(getAdminActionLoading);
  const fetchingDataLoading = useSelector(getAdminLoading);
  const adminError = useSelector(getAdminError);
  const handleSubmitClass = useCallback(
    (payload: SubjectPayload) => {
      if (accessToken) {
        if (type === 'edit' && value?._id) {
          dispatch(
            adminActions.updateSubject({
              token: accessToken,
              subjectId: value?._id,
              ...payload,
            })
          );
        } else {
          dispatch(
            adminActions.createSubject({
              token: accessToken,
              ...payload,
            })
          );
        }
        setIsFormSent(true);
      }
    },
    [accessToken, adminActions, dispatch, type, value?._id]
  );
  useEffect(() => {
    if (isFormSent && !loading && !adminError) {
      if (type === 'add') {
        toast(t('admin.management.subjectManagement.addSuccess'));
      } else toast(t('admin.management.subjectManagement.editSuccess'));
      triggerRefresh();
      handleClose();
      setIsFormSent(false);
    } else if (isFormSent && adminError) {
      toast.error(adminError.message);
      setIsFormSent(false);
    }
  }, [handleClose, isFormSent, adminError, loading, t, triggerRefresh, type]);
  useEffect(() => {
    if (value) {
      reset(value);
    }
  }, [reset, value]);

  return (
    <Wrapper>
      {fetchingDataLoading ? (
        <PLoadingIndicator />
      ) : (
        <>
          <ActionGroup>
            <ModalTitle>
              {type === 'add'
                ? t('admin.management.subjectManagement.addNewSubject')
                : t('admin.management.subjectManagement.editSubject')}
            </ModalTitle>
            <PButton onClick={() => handleClose()}>
              <StyledIcon className='partei-cross' />
            </PButton>
          </ActionGroup>

          <FormContainer onSubmit={handleSubmit(handleSubmitClass)}>
            <InputContainer>
              <InputLabel>{t('form.name')}</InputLabel>
              <StyledInput {...register('name')} />
              {errors.name && <Required>{errors.name.message}</Required>}
            </InputContainer>

            <StyledButton type='submit' variant={'primary'} disabled={!isDirty}>
              {type === 'add' ? t('form.add') : t('form.save')}
            </StyledButton>
          </FormContainer>
          <PBackdropLoading isShow={loading || false} />
        </>
      )}
    </Wrapper>
  );
};

export default React.memo(SubjectDetailModal);
