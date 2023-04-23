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
import {
  getAdminActionLoading,
  getAdminError,
  getAdminLoading,
  getSubjectList,
  getTeacherList,
} from 'store/selectors/admin';
import { getClassList } from 'store/selectors/class';
import { getAccessToken } from 'store/selectors/session';
import { useAdminSlice } from 'store/slices/admin';
import { pxToRem } from 'styles/theme/utils';
import tw, { styled } from 'twin.macro';
import { Parent, ParentPayload } from 'types/Parent';
import { TeacherAssignment, TeacherAssignmentPayload } from 'types/TeacherAssignment';
import { ConstantRoles } from 'utils/constants';
interface Props {
  value: TeacherAssignment | null;
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
const InputSection = styled.div``;
const ModalTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
`;
const AssignmentDetailModal: React.FC<Props> = ({ handleClose, triggerRefresh, type, value }) => {
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
  } = useForm<TeacherAssignmentPayload>();
  const loading = useSelector(getAdminActionLoading);
  const fetchingDataLoading = useSelector(getAdminLoading);
  const classList = useSelector(getClassList);
  const subjectList = useSelector(getSubjectList);
  const teacherList = useSelector(getTeacherList);
  const adminError = useSelector(getAdminError);
  const handleSubmitClass = useCallback(
    (payload: TeacherAssignmentPayload) => {
      if (accessToken) {
        if (type === 'edit' && value?._id) {
          dispatch(
            adminActions.updateAssignment({
              token: accessToken,
              teacherAssignmentId: value?._id,
              ...payload,
            })
          );
        } else {
          dispatch(
            adminActions.createAssignment({
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
        toast(t('admin.management.teacherAssignmentManagement.addSuccess'));
      } else toast(t('admin.management.teacherAssignmentManagement.editSuccess'));
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
        classId: value.classId?._id || '',
        teacherId: value.teacherId?._id || '',
        isClassAdmin: value.isClassAdmin,
        subjectId: value.subjectId?._id || '',
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
                ? t('admin.management.parentManagement.addNewParent')
                : t('admin.management.parentManagement.editParent')}
            </ModalTitle>
            <PButton onClick={() => handleClose()}>
              <StyledIcon className='partei-cross' />
            </PButton>
          </ActionGroup>
          <FormContainer onSubmit={handleSubmit(handleSubmitClass)}>
            <InputSection>
              <InputContainer>
                <InputLabel>{t('form.teacher')}</InputLabel>
                <PSelection {...register('teacherId')}>
                  <option value=''>{t('input.pleaseSelect', { label: t('form.teacher') })}</option>
                  {teacherList?.data?.map((teacher) => (
                    <option value={teacher?._id} key={teacher?._id}>
                      {teacher?.userId?.fullname}
                    </option>
                  ))}
                </PSelection>
                {errors.teacherId && <Required>{errors.teacherId.message}</Required>}
              </InputContainer>
              <InputContainer>
                <InputLabel>{t('form.class')}</InputLabel>
                <PSelection {...register('classId')}>
                  <option value=''>{t('input.pleaseSelect', { label: t('form.class') })}</option>
                  {classList?.data?.map((classItem) => (
                    <option value={classItem._id} key={classItem._id}>
                      {classItem?.name}
                    </option>
                  ))}
                </PSelection>
                {errors.classId && <Required>{errors.classId.message}</Required>}
              </InputContainer>
              <InputContainer>
                <InputLabel>{t('form.subject')}</InputLabel>
                <PSelection {...register('subjectId')}>
                  <option value=''>{t('input.pleaseSelect', { label: t('form.subject') })}</option>
                  {subjectList?.data?.map((subject) => (
                    <option value={subject?._id} key={subject?._id}>
                      {subject?.name}
                    </option>
                  ))}
                </PSelection>
                {errors.subjectId && <Required>{errors.subjectId.message}</Required>}
              </InputContainer>
              <InputContainer>
                <InputLabel>{t('form.isClassAdmin')}</InputLabel>
                <PCheckbox {...register('isClassAdmin')} />
                {errors.isClassAdmin && <Required>{errors.isClassAdmin.message}</Required>}
              </InputContainer>
            </InputSection>
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

export default React.memo(AssignmentDetailModal);
