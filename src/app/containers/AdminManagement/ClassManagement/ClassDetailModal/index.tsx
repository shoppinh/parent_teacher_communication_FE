import React, { useCallback, useEffect } from 'react';
import PBackdropLoading from 'app/components/PBackdropLoading';
import { PButton } from 'app/components/PButton';
import PCheckbox from 'app/components/PCheckbox';
import { PIcon } from 'app/components/PIcon';
import PInput from 'app/components/PInput';
import { PLoadingIndicator } from 'app/components/PLoadingIndicatior';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getActionLoading, getClassListError, getClassLoading } from 'store/selectors/class';
import { getAccessToken } from 'store/selectors/session';
import { useClassSlice } from 'store/slices/class';
import { pxToRem } from 'styles/theme/utils';
import tw, { styled } from 'twin.macro';
import { Class, ClassPayload } from 'types/Class';
interface Props {
  value: Class | null;
  type: 'add' | 'edit';
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
const ClassDetailModal: React.FC<Props> = ({ handleClose, triggerRefresh, type, value }) => {
  const { t } = useTranslation();
  const [isFormSent, setIsFormSent] = React.useState(false);
  const accessToken = useSelector(getAccessToken);
  const dispatch = useDispatch();
  const { actions: classActions } = useClassSlice();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ClassPayload>();
  const loading = useSelector(getActionLoading);
  const fetchingDataLoading = useSelector(getClassLoading);
  const classError = useSelector(getClassListError);
  const handleSubmitClass = useCallback(
    (payload: ClassPayload) => {
      if (accessToken) {
        if (type === 'edit' && value?._id) {
          dispatch(
            classActions.updateClass({
              token: accessToken,
              classId: value?._id,
              ...payload,
            })
          );
        } else {
          dispatch(
            classActions.createClass({
              token: accessToken,
              ...payload,
            })
          );
        }
        setIsFormSent(true);
      }
    },
    [accessToken, classActions, dispatch, type, value?._id]
  );
  useEffect(() => {
    if (isFormSent && !loading && !classError) {
      if (type === 'add') {
        toast(t('admin.management.classManagement.addSuccess'));
      } else toast(t('admin.management.classManagement.editSuccess'));
      triggerRefresh();
      handleClose();
      setIsFormSent(false);
    } else if (isFormSent && classError) {
      toast.error(classError.message);
      setIsFormSent(false);
    }
  }, [handleClose, isFormSent, classError, loading, t, triggerRefresh, type]);
  useEffect(() => {
    if (value) {
      reset({
        isPrivateClass: value.isPrivateClass,
        isSchoolClass: value.isSchoolClass,
        name: value.name,
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
              <InputLabel>{t('form.name')}</InputLabel>
              <StyledInput {...register('name')} />
              {errors.name && <Required>{errors.name.message}</Required>}
            </InputContainer>
            <InputContainer>
              <InputLabel>{t('form.isSchoolClass')}</InputLabel>
              <PCheckbox {...register('isSchoolClass')} />
              {errors.isSchoolClass && <Required>{errors.isSchoolClass.message}</Required>}
            </InputContainer>
            <InputContainer>
              <InputLabel>{t('form.isPrivateClass')}</InputLabel>
              <PCheckbox {...register('isPrivateClass')} />
              {errors.isPrivateClass && <Required>{errors.isPrivateClass.message}</Required>}
            </InputContainer>
            <StyledButton type='submit' variant={'primary'} disabled={!isDirty}>
              {type === 'add' ? t('form.add') : t('form.save')}
            </StyledButton>
          </FormContainer>
          <PBackdropLoading isShow={loading} />
        </>
      )}
    </Wrapper>
  );
};

export default ClassDetailModal;
