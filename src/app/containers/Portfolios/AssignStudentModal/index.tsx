import React, { useCallback, useEffect } from 'react';
import { Student } from '../../../../types/Student';
import tw, { styled } from 'twin.macro';
import { pxToRem } from '../../../../styles/theme/utils';
import { PSelection } from '../../../components/PSelection';
import { queryString } from '../../../../utils/constants';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '../../../../store/selectors/session';
import { useTeacherSlice } from '../../../../store/slices/teacher';
import { useQuery } from '../../../../utils/hook';
import { getTeacherError, getTeacherLoading } from '../../../../store/selectors/teacher';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { PButton } from '../../../components/PButton';
import { StyleConstants } from '../../../../styles/constants/style';
import { getUnassignedStudentList } from '../../../../store/selectors/student';
import { useStudentSlice } from '../../../../store/slices/student';

interface Props {
  onClose: () => void;
  handleRefetchStudentList: () => void;
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
const ActionGroup = styled.div`
  margin-top: ${pxToRem(20)}rem;
`;
const StyledButton = styled(PButton)`
  margin-bottom: ${pxToRem(20)}rem;
  font: normal bold 16px / ${StyleConstants.BASE_LINE_HEIGHT}px ${StyleConstants.FONT_FAMILY};
  ${tw`rounded-full w-full p-3`}
`;
const AssignStudentModal: React.FC<Props> = ({ onClose, handleRefetchStudentList }) => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<{
    studentId: string;
  }>({});
  const { t } = useTranslation();
  const currentAccessToken = useSelector(getAccessToken);
  const classId = useQuery().get(queryString.classId);
  const { actions: teacherActions } = useTeacherSlice();
  const { actions: studentActions } = useStudentSlice();
  const studentListWithoutClass = useSelector(getUnassignedStudentList);

  const teacherLoading = useSelector(getTeacherLoading);
  const teacherError = useSelector(getTeacherError);
  const [isFormSent, setIsFormSent] = React.useState(false);
  const dispatch = useDispatch();
  const onSubmit = useCallback(
    (data: { studentId: string }) => {
      if (currentAccessToken && classId) {
        dispatch(
          teacherActions.assignStudent({
            token: currentAccessToken,
            studentId: data.studentId,
            classId,
          })
        );
        setIsFormSent(true);
      }
    },
    [classId, currentAccessToken, dispatch, teacherActions]
  );

  useEffect(() => {
    if (isFormSent && !teacherLoading && !teacherError) {
      setIsFormSent(false);
      toast.success(t('portfolios.assignStudent.assignSuccess'));
      handleRefetchStudentList();
      onClose();
    } else if (isFormSent && !teacherLoading && teacherError) {
      setIsFormSent(false);
      toast.error(t('portfolios.assignStudent.assignFail'));
    }
  }, [handleRefetchStudentList, isFormSent, onClose, t, teacherError, teacherLoading]);

  useEffect(() => {
    if (currentAccessToken) {
      dispatch(
        studentActions.loadUnassignedStudentList({
          token: currentAccessToken,
        })
      );
    }
  }, [currentAccessToken, dispatch, studentActions]);

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <FormTitle>{t('form.assignStudentTitle')}</FormTitle>
        <InputContainer>
          <InputLabel>{t('table.studentName')}</InputLabel>
          <PSelection {...register('studentId')}>
            <option value=''>{t('portfolios.assignStudent.pleaseSelectStudent')}</option>
            {studentListWithoutClass?.map((student) => (
              <option value={student._id} key={student._id}>
                {student.name}
              </option>
            ))}
          </PSelection>
          {errors.studentId && <Required>{errors.studentId.message}</Required>}
        </InputContainer>
        <ActionGroup>
          <StyledButton type='submit' variant='primary'>
            {t('common.assign')}
          </StyledButton>
        </ActionGroup>
      </FormContainer>
    </Container>
  );
};

export default React.memo(AssignStudentModal);
