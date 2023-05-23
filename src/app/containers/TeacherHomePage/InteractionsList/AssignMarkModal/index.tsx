import React, { useCallback, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import { Progress, ProgressDetailPayload } from '../../../../../types/Progress';
import { useForm } from 'react-hook-form';
import { PButton } from '../../../../components/PButton';
import { PIcon } from '../../../../components/PIcon';
import { pxToRem } from '../../../../../styles/theme/utils';
import PInput from '../../../../components/PInput';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrentProgressLoading,
  getProgressError,
  getProgressLoading,
} from '../../../../../store/selectors/progress';
import { PLoadingIndicator } from '../../../../components/PLoadingIndicatior';
import { useProgressSlice } from '../../../../../store/slices/progress';
import { getAccessToken } from '../../../../../store/selectors/session';
import { toast } from 'react-toastify';
import { PSelection } from '../../../../components/PSelection';
import { getStudentList } from '../../../../../store/selectors/student';
import { useQuery } from '../../../../../utils/hook';
import { queryString } from '../../../../../utils/constants';
import { getTeacherAssignmentDetail } from '../../../../../store/selectors/teacher';

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
const StyledSelection = styled(PSelection)`
  ${tw`w-full`}
`;

interface Props {
  value: Progress | null;
  type: 'assign' | 'update';
  handleClose: () => void;
  triggerRefreshProgressList: () => void;
}

const AssignMarkModal: React.FC<Props> = ({
  value,
  type,
  handleClose,
  triggerRefreshProgressList,
}) => {
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProgressDetailPayload>();

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions: progressActions } = useProgressSlice();
  const currentAccessToken = useSelector(getAccessToken);
  const currentProgressLoading = useSelector(getCurrentProgressLoading);
  const progressLoading = useSelector(getProgressLoading);
  const progressError = useSelector(getProgressError);
  const studentList = useSelector(getStudentList);
  const [isFormSent, setIsFormSent] = React.useState(false);
  const classId = useQuery().get(queryString.classId);
  const teacherAssignmentDetail = useSelector(getTeacherAssignmentDetail);
  const handleSubmitAssignment = useCallback(
    (data: ProgressDetailPayload) => {
      if (currentAccessToken) {
        if (type === 'update' && value?._id) {
          dispatch(
            progressActions.updateProgress({
              token: currentAccessToken,
              progressId: value?._id,
              payload: {
                ...data,
                averageMark:
                  (data.frequentMark + 2 * data.middleExamMark + 3 * data.finalExamMark) / 6,
              },
            })
          );
        }
        if (type === 'assign' && classId) {
          dispatch(
            progressActions.addProgress({
              token: currentAccessToken,
              payload: {
                ...data,
                classId: classId,
                averageMark:
                  (data.frequentMark + 2 * data.middleExamMark + 3 * data.finalExamMark) / 6,
              },
            })
          );
        }
        setIsFormSent(true);
      }
    },
    [classId, currentAccessToken, dispatch, progressActions, type, value?._id]
  );
  useEffect(() => {
    if (isFormSent && !progressLoading && !progressError) {
      toast(t('progress.addProgress.addSuccess'));
      triggerRefreshProgressList();
      handleClose();
      setIsFormSent(false);
    } else if (isFormSent && progressError) {
      toast.error(progressError.message);
      setIsFormSent(false);
    }
  }, [handleClose, isFormSent, progressError, progressLoading, t, triggerRefreshProgressList]);
  useEffect(() => {
    if (value) {
      const { subject, student, _id, createdAt, updatedAt, ...rest } = value;
      reset(rest);
    }
  }, [reset, value]);

  useEffect(() => {
    if (teacherAssignmentDetail) {
      setValue('subjectId', teacherAssignmentDetail.subjectId._id);
    }
  }, [setValue, teacherAssignmentDetail]);
  return (
    <Wrapper>
      {currentProgressLoading ? (
        <PLoadingIndicator />
      ) : (
        <>
          <ActionGroup>
            <ModalTitle>
              {type === 'update'
                ? t('progress.editProgress.title')
                : t('progress.addProgress.title')}
            </ModalTitle>
            <PButton onClick={() => handleClose()}>
              <StyledIcon className='partei-cross' />
            </PButton>
          </ActionGroup>

          <FormContainer onSubmit={handleSubmit(handleSubmitAssignment)}>
            <InputContainer>
              <InputLabel>{t('form.student')}</InputLabel>
              <StyledSelection {...register('studentId')}>
                {studentList?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </StyledSelection>
            </InputContainer>
            <InputContainer>
              <InputLabel>{t('form.subject')}</InputLabel>
              <StyledInput value={teacherAssignmentDetail?.subjectId?.name} disabled />
            </InputContainer>
            <InputContainer>
              <InputLabel>{t('form.frequentMark')}</InputLabel>
              <StyledInput {...register('frequentMark', { valueAsNumber: true })} />
              {errors.frequentMark && <Required>{errors.frequentMark.message}</Required>}
            </InputContainer>
            <InputContainer>
              <InputLabel>{t('form.middleExamMark')}</InputLabel>
              <StyledInput {...register('middleExamMark', { valueAsNumber: true })} />
              {errors.middleExamMark && <Required>{errors.middleExamMark.message}</Required>}
            </InputContainer>
            <InputContainer>
              <InputLabel>{t('form.finalExamMark')}</InputLabel>
              <StyledInput {...register('finalExamMark', { valueAsNumber: true })} />
              {errors.finalExamMark && <Required>{errors.finalExamMark.message}</Required>}
            </InputContainer>
            <InputContainer>
              <InputLabel>{t('form.semester')}</InputLabel>
              <StyledInput {...register('semester', { valueAsNumber: true })} />
              {errors.semester && <Required>{errors.semester.message}</Required>}
            </InputContainer>
            <InputContainer>
              <InputLabel>{t('form.year')}</InputLabel>
              <StyledInput {...register('year', { valueAsNumber: true })} />
              {errors.year && <Required>{errors.year.message}</Required>}
            </InputContainer>
            <InputContainer>
              <InputLabel>{t('form.assessment')}</InputLabel>
              <StyledInput {...register('note')} />
              {errors.note && <Required>{errors.note.message}</Required>}
            </InputContainer>
            <StyledButton type='submit' variant={'primary'}>
              {type === 'update' ? t('form.save') : t('form.add')}
            </StyledButton>
          </FormContainer>
        </>
      )}
    </Wrapper>
  );
};

export default React.memo(AssignMarkModal);
