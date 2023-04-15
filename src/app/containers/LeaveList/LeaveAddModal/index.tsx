import PBackdropLoading from 'app/components/PBackdropLoading';
import { PButton } from 'app/components/PButton';
import PInput from 'app/components/PInput';
import { PSelection } from 'app/components/PSelection';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getClassListError, getClassLoading } from 'store/selectors/class';
import { getAccessToken } from 'store/selectors/session';
import { getStudentList } from 'store/selectors/student';
import { useClassSlice } from 'store/slices/class';
import styled from 'styled-components';
import { StyleConstants } from 'styles/constants/style';
import { pxToRem } from 'styles/theme/utils';
import tw from 'twin.macro';
import { AddLeaveFormPayload, LeaveForm } from 'types/Student';
import { LEAVE_FORM_STATUS, queryString } from 'utils/constants';
import { useQuery } from 'utils/hook';

interface Props {
  data?: LeaveForm;
  onClose: () => void;
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
const InfoSection = styled.div`
  margin-bottom: ${pxToRem(10)}rem;
`;
const InfoLabel = styled.div`
  font: 700 ${pxToRem(16)}rem / ${pxToRem(20)}rem ${(p) => p.theme.fontFamily};
  margin-bottom: ${pxToRem(5)}rem;
  color: ${(p) => p.theme.placeholder};
`;
const InfoText = styled.div`
  font: 700 ${pxToRem(16)}rem / ${pxToRem(20)}rem ${(p) => p.theme.fontFamily};
  color: ${(p) => p.theme.backgroundVariant};
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
const LeaveAddModal: React.FC<Props> = ({ data, onClose }) => {
  const { t } = useTranslation();
  const [isFormSent, setIsFormSent] = React.useState(false);
  const accessToken = useSelector(getAccessToken);
  const dispatch = useDispatch();
  const { actions: classActions } = useClassSlice();
  const updateLoading = useSelector(getClassLoading);
  const updateError = useSelector(getClassListError);
  const classId = useQuery().get(queryString.classId);
  const studentList = useSelector(getStudentList);

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddLeaveFormPayload>();
  const onSubmit = useCallback(
    (data: AddLeaveFormPayload) => {
      const foundStudent = studentList.find((student) => student._id === data.studentId);
      const payload: AddLeaveFormPayload = {
        classId: foundStudent?.classId || '',
        leaveDate: data.leaveDate,
        reason: data.reason,
        studentId: data.studentId,
        title: data.title,
      };
      setIsFormSent(true);
    },
    [studentList]
  );

  useEffect(() => {
    if (isFormSent && !updateLoading && !updateError) {
      toast(t('progress.addProgress.addSuccess'));
      onClose();
      setIsFormSent(false);
    } else if (isFormSent && updateError) {
      toast.error(updateError.message);
      setIsFormSent(false);
    }
  }, [isFormSent, onClose, t, updateError, updateLoading]);
  return (
    <Container>
      <FormTitle>{t('leaveForm.detailTitle')}</FormTitle>
      <InfoContainer>
        <MainInfoContent>
          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <InputContainer>
              <InputLabel>{t('leaveForm.leaveTitleWithoutParam')}</InputLabel>
              <StyledInput {...register('title')} />
              {errors.title && <Required>{errors.title.message}</Required>}
            </InputContainer>
            <InputContainer>
              <InputLabel>{t('form.gender')}</InputLabel>
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
              <StyledInput {...register('reason')} />
              {errors.reason && <Required>{errors.reason.message}</Required>}
            </InputContainer>
            <InputContainer>
              <InputLabel>{t('leaveForm.leaveDate')}</InputLabel>
              <StyledInput {...register('leaveDate')} />
              {errors.leaveDate && <Required>{errors.leaveDate.message}</Required>}
            </InputContainer>
          </FormContainer>
        </MainInfoContent>
        <ActionGroup>
          {data ? (
            data?.status === LEAVE_FORM_STATUS.PENDING && (
              <StyledButton type='submit' variant='primary'>
                {t('common.update')}
              </StyledButton>
            )
          ) : (
            <StyledButton type='submit' variant='primary'>
              {t('common.create')}
            </StyledButton>
          )}
        </ActionGroup>
        <PBackdropLoading isShow={updateLoading} />
      </InfoContainer>
    </Container>
  );
};

export default LeaveAddModal;
