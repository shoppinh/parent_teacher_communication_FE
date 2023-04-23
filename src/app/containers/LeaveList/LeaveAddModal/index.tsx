import PBackdropLoading from 'app/components/PBackdropLoading';
import { PButton } from 'app/components/PButton';
import PInput from 'app/components/PInput';
import { PSelection } from 'app/components/PSelection';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getParentActionLoading, getParentError, getParentLoading } from 'store/selectors/parent';
import { getAccessToken } from 'store/selectors/session';
import { getStudentList } from 'store/selectors/student';
import { useParentSlice } from 'store/slices/parent';
import styled from 'styled-components';
import { StyleConstants } from 'styles/constants/style';
import { pxToRem } from 'styles/theme/utils';
import tw from 'twin.macro';
import { AddLeaveFormPayload, LeaveForm } from 'types/Student';
import { DateFormat, LEAVE_FORM_STATUS } from 'utils/constants';
import { formatDateWithTemplate } from 'utils/dateHelpers/formatDate';

interface Props {
  data?: LeaveForm;
  onClose: () => void;
  triggerRefreshList: () => void;
}
const Container = styled.div`
  height: 90vh;
  width: 50vw;
  background-color: ${(p) => p.theme.background};
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: ${pxToRem(20)}rem;
`;
const FormTitle = styled.div`
  font-size: ${pxToRem(20)}rem;
  line-height: ${pxToRem(24)}rem;
  color: ${(p) => p.theme.text};
  margin-bottom: ${pxToRem(20)}rem;
  font-weight: 700;
`;
const InfoContainer = styled.div`
  color: ${(p) => p.theme.text};
  padding: ${pxToRem(20)}rem;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
const ActionGroup = styled.div`
  margin-top: ${pxToRem(20)}rem;
`;
const StyledButton = styled(PButton)`
  margin-bottom: ${pxToRem(20)}rem;
  font: normal bold 16px / ${StyleConstants.BASE_LINE_HEIGHT}px ${StyleConstants.FONT_FAMILY};
  ${tw`rounded-full w-full p-3`}
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
const MainInfoContent = styled.div``;
const LeaveAddModal: React.FC<Props> = ({ data, onClose, triggerRefreshList }) => {
  const { t } = useTranslation();
  const [isFormSent, setIsFormSent] = React.useState(false);
  const accessToken = useSelector(getAccessToken);
  const dispatch = useDispatch();
  const { actions: parentActions } = useParentSlice();
  const updateLoading = useSelector(getParentActionLoading);
  const updateError = useSelector(getParentError);
  const studentList = useSelector(getStudentList);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty },
  } = useForm<AddLeaveFormPayload>();

  const onSubmit = useCallback(
    (data: AddLeaveFormPayload) => {
      if (accessToken) {
        const foundStudent = studentList.find((student) => student._id === data.studentId);
        const payload: AddLeaveFormPayload = {
          classId: foundStudent?.classId || '',
          leaveDate: data.leaveDate,
          reason: data.reason,
          studentId: data.studentId,
          title: data.title,
        };
        dispatch(
          parentActions.submitLeaveForm({
            token: accessToken,
            ...payload,
          })
        );
        setIsFormSent(true);
      }
    },
    [accessToken, dispatch, parentActions, studentList]
  );
  const onUpdate = useCallback(
    (formData: AddLeaveFormPayload) => {
      if (accessToken && data) {
        const foundStudent = studentList.find((student) => student._id === formData.studentId);
        const payload: AddLeaveFormPayload = {
          classId: foundStudent?.classId || '',
          leaveDate: formData.leaveDate,
          reason: formData.reason,
          studentId: formData.studentId,
          title: formData.title,
        };

        dispatch(
          parentActions.updateLeaveForm({
            token: accessToken,
            ...payload,
            formId: data._id,
          })
        );
        setIsFormSent(true);
      }
    },
    [accessToken, data, dispatch, parentActions, studentList]
  );

  useEffect(() => {
    if (isFormSent && !updateLoading && !updateError) {
      toast(t('leaveForm.addSuccess'));
      setIsFormSent(false);
      triggerRefreshList();
      onClose();
    } else if (isFormSent && updateError) {
      toast.error(updateError.message);
      setIsFormSent(false);
    }
  }, [data, isFormSent, onClose, t, triggerRefreshList, updateError, updateLoading]);

  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        studentId: data.student._id,
        reason: data.reason,
        leaveDate: formatDateWithTemplate(data.leaveDate, DateFormat.FULL_DATE_WITH_SLASH),
        classId: data.class._id,
      });
    }
  }, [data, reset]);

  return (
    <Container>
      <FormTitle>{t('leaveForm.detailTitle')}</FormTitle>
      <InfoContainer>
        <MainInfoContent>
          <FormContainer>
            <InputContainer>
              <InputLabel>{t('leaveForm.leaveTitleWithoutParam')}</InputLabel>
              <StyledInput {...register('title')} />
              {errors.title && <Required>{errors.title.message}</Required>}
            </InputContainer>
            <InputContainer>
              <InputLabel>{t('form.student')}</InputLabel>
              <PSelection {...register('studentId')}>
                {studentList?.map((student) => {
                  return (
                    <option key={student._id} value={student._id}>
                      {student.name}
                    </option>
                  );
                })}
              </PSelection>
              {errors.studentId && <Required>{errors.studentId.message}</Required>}
            </InputContainer>
            <InputContainer>
              <InputLabel>{t('leaveForm.reasonTitle')}</InputLabel>
              <StyledInput {...register('reason')} multiple />
              {errors.reason && <Required>{errors.reason.message}</Required>}
            </InputContainer>
            <InputContainer>
              <InputLabel>{t('leaveForm.leaveDate')}</InputLabel>
              <StyledInput {...register('leaveDate')} type='date' />
              {errors.leaveDate && <Required>{errors.leaveDate.message}</Required>}
            </InputContainer>
          </FormContainer>
        </MainInfoContent>
        <ActionGroup>
          {data ? (
            data?.status === LEAVE_FORM_STATUS.PENDING && (
              <StyledButton
                type='button'
                variant='primary'
                disabled={!isDirty}
                onClick={handleSubmit(onUpdate)}
              >
                {t('common.update')}
              </StyledButton>
            )
          ) : (
            <StyledButton type='button' variant='primary' onClick={handleSubmit(onSubmit)}>
              {t('common.create')}
            </StyledButton>
          )}
        </ActionGroup>
        <PBackdropLoading isShow={updateLoading || false} />
      </InfoContainer>
    </Container>
  );
};

export default React.memo(LeaveAddModal);
