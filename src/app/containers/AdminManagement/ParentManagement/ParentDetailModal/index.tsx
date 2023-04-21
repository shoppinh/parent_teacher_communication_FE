import PBackdropLoading from 'app/components/PBackdropLoading';
import { PButton } from 'app/components/PButton';
import PCheckbox from 'app/components/PCheckbox';
import { PIcon } from 'app/components/PIcon';
import PInput from 'app/components/PInput';
import { PLoadingIndicator } from 'app/components/PLoadingIndicatior';
import { PSelection } from 'app/components/PSelection';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAdminActionLoading, getAdminError, getAdminLoading } from 'store/selectors/admin';
import { getAccessToken } from 'store/selectors/session';
import { useAdminSlice } from 'store/slices/admin';
import { pxToRem } from 'styles/theme/utils';
import tw, { styled } from 'twin.macro';
import { Parent, ParentPayload } from 'types/Parent';
import { ConstantRoles } from 'utils/constants';
interface Props {
  value: Parent | null;
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
const ParentDetailModal: React.FC<Props> = ({ handleClose, triggerRefresh, type, value }) => {
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
  } = useForm<ParentPayload>();
  const loading = useSelector(getAdminActionLoading);
  const fetchingDataLoading = useSelector(getAdminLoading);
  const adminError = useSelector(getAdminError);
  const handleSubmitClass = useCallback(
    (payload: ParentPayload) => {
      if (accessToken) {
        if (type === 'edit' && value?._id) {
          dispatch(
            adminActions.updateParent({
              token: accessToken,
              parentId: value?._id,
              ...payload,
            })
          );
        } else {
          dispatch(
            adminActions.createParent({
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
        toast(t('admin.management.classManagement.addSuccess'));
      } else toast(t('admin.management.classManagement.editSuccess'));
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
      reset({
        username: value.userId.username,
        email: value.userId.email,
        firstName: value.userId.firstname,
        lastName: value.userId.lastname,
        fullName: value.userId.fullname,
        mobilePhone: value.userId.mobilePhone,
        roleKey: value.userId.role,
        password: '',
        address: value.address,
        age: value.age,
        gender: value.gender,
        job: value.job,
        isActive: value.userId.isActive,
      });
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
                ? t('admin.management.classManagement.addNewClass')
                : t('admin.management.classManagement.editClass')}
            </ModalTitle>
            <PButton onClick={() => handleClose()}>
              <StyledIcon className='partei-cross' />
            </PButton>
          </ActionGroup>

          <FormContainer onSubmit={handleSubmit(handleSubmitClass)}>
            <InputContainer>
              <InputLabel>{t('form.username')}</InputLabel>
              <StyledInput {...register('username')} />
              {errors.username && <Required>{errors.username.message}</Required>}
            </InputContainer>
            <InputContainer>
              <InputLabel>{t('form.email')}</InputLabel>
              <StyledInput {...register('email')} />
              {errors.email && <Required>{errors.email.message}</Required>}
            </InputContainer>
            <InputContainer>
              <InputLabel>{t('form.firstName')}</InputLabel>
              <StyledInput {...register('firstName')} />
              {errors.firstName && <Required>{errors.firstName.message}</Required>}
            </InputContainer>
            <InputContainer>
              <InputLabel>{t('form.lastName')}</InputLabel>
              <StyledInput {...register('lastName')} />
              {errors.lastName && <Required>{errors.lastName.message}</Required>}
            </InputContainer>
            <InputContainer>
              <InputLabel>{t('form.fullName')}</InputLabel>
              <StyledInput {...register('fullName')} />
              {errors.fullName && <Required>{errors.fullName.message}</Required>}
            </InputContainer>
            <InputContainer>
              <InputLabel>{t('form.age')}</InputLabel>
              <StyledInput {...register('age', { valueAsNumber: true })} />
              {errors.age && <Required>{errors.age.message}</Required>}
            </InputContainer>
            <InputContainer>
              <InputLabel>{t('form.role')}</InputLabel>
              <PSelection {...register('roleKey')}>
                {Object.values(ConstantRoles)?.map((role) => {
                  return (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  );
                })}
              </PSelection>
              {errors.roleKey && <Required>{errors.roleKey.message}</Required>}

            </InputContainer>
            <InputContainer>
              <InputLabel>{t('form.gender')}</InputLabel>
              <StyledInput {...register('gender')} />
              {errors.gender && <Required>{errors.gender.message}</Required>}
            </InputContainer>
            <InputContainer>
              <InputLabel>{t('form.address')}</InputLabel>
              <StyledInput {...register('address')} />
              {errors.address && <Required>{errors.address.message}</Required>}
            </InputContainer>
            <InputContainer>
              <InputLabel>{t('form.isActive')}</InputLabel>
              <PCheckbox {...register('isActive')} />
              {errors.isActive && <Required>{errors.isActive.message}</Required>}
            </InputContainer>
            <InputContainer>
              <InputLabel>{t('form.job')}</InputLabel>
              <StyledInput {...register('job')} />
              {errors.job && <Required>{errors.job.message}</Required>}
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

export default ParentDetailModal;
