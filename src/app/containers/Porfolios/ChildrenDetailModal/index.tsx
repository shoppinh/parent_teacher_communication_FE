import React, { useCallback, useEffect, useState } from 'react';
import { Student } from '../../../../types/Student';
import { useForm } from 'react-hook-form';
import tw, { styled } from 'twin.macro';
import { pxToRem } from '../../../../styles/theme/utils';
import PInput from '../../../components/PInput';
import { useTranslation } from 'react-i18next';
import { PSelection } from '../../../components/PSelection';
import { GENDERS } from '../../../../utils/constants';
import { PButton } from '../../../components/PButton';
import { StyleConstants } from '../../../../styles/constants/style';
import { useStudentSlice } from '../../../../store/slices/student';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '../../../../store/selectors/session';
import { getStudentError, getStudentLoading } from '../../../../store/selectors/student';
import PBackdropLoading from '../../../components/PBackdropLoading';
import { toast } from 'react-toastify';
import { getSchoolInfo } from '../../../../store/selectors/config';

interface Props {
  data: Student | null;
  handleRefetchStudentList: () => void;
  onClose: () => void;
  type?: 'student' | 'children';
  isClassAdmin?: boolean;
}

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
const ActionGroup = styled.div`
  margin-top: ${pxToRem(20)}rem;
`;
const StyledButton = styled(PButton)`
  margin-bottom: ${pxToRem(20)}rem;
  font: normal bold 16px / ${StyleConstants.BASE_LINE_HEIGHT}px ${StyleConstants.FONT_FAMILY};
  ${tw`rounded-full w-full p-3`}
`;
const ChildrenDetailModal: React.FC<Props> = ({
  data,
  handleRefetchStudentList,
  onClose,
  isClassAdmin,
  type = 'children',
}) => {
  const schoolInfo = useSelector(getSchoolInfo);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<Student>({
    defaultValues: {
      classId: schoolInfo?._id,
    },
  });
  const { actions: studentActions } = useStudentSlice();
  const dispatch = useDispatch();
  const accessToken = useSelector(getAccessToken);
  const studentLoading = useSelector(getStudentLoading);
  const studentError = useSelector(getStudentError);
  const [isFormSent, setIsFormSent] = useState(false);
  const onSubmit = useCallback(
    (submitData: Student) => {
      if (accessToken) {
        if (data) {
          // update
          dispatch(
            studentActions.updateStudent({
              classId: submitData.classId,
              studentId: submitData._id,
              name: submitData.name,
              age: submitData.age,
              gender: submitData.gender,
              relationship: submitData.relationship,
              parentId: submitData.parentId,
              token: accessToken,
            })
          );
        } else {
          // create
          dispatch(
            studentActions.addStudent({
              classId: submitData.classId,
              name: submitData.name,
              age: submitData.age,
              gender: submitData.gender,
              relationship: submitData.relationship,
              token: accessToken,
            })
          );
        }

        setIsFormSent(true);
      }
    },
    [accessToken, data, dispatch, studentActions]
  );
  const handleRemoveStudentFromClass = useCallback(() => {
    if (accessToken && data?._id && schoolInfo?._id) {
      dispatch(
        studentActions.removeStudentFromClass({
          studentId: data._id,
          classId: schoolInfo._id,
          token: accessToken,
        })
      );
      setIsFormSent(true);
    }
  }, [accessToken, schoolInfo?._id, data?._id, dispatch, studentActions]);

  const handleRemoveStudentFromParent = useCallback(() => {
    if (accessToken && data?._id) {
      dispatch(
        studentActions.removeStudentFromParent({
          studentId: data._id,
          token: accessToken,
        })
      );
      setIsFormSent(true);
    }
  }, [accessToken, data?._id, dispatch, studentActions]);
  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  useEffect(() => {
    if (isFormSent && !studentLoading && !studentError) {
      handleRefetchStudentList();
      setIsFormSent(false);
      toast.success('Thành công');
      onClose();
    } else if (isFormSent && !studentLoading && studentError) {
      toast.error(studentError.message);
      setIsFormSent(false);
    }
  }, [handleRefetchStudentList, isFormSent, onClose, studentError, studentLoading]);

  return (
    <Container>
      <FormTitle>
        {data === null ? t('form.addChildrenTitle') : t('form.childrenDetailTitle')}
      </FormTitle>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <InputLabel>{t('form.name')}</InputLabel>
          <StyledInput {...register('name')} disabled={type === 'children'} />
          {errors.name && <Required>{errors.name.message}</Required>}
        </InputContainer>
        <InputContainer>
          <InputLabel>
            {t('classInfo.title', {
              className: data?.class?.name,
            })}
          </InputLabel>
        </InputContainer>
        <InputContainer>
          <InputLabel>{t('form.age')}</InputLabel>
          <StyledInput
            {...register('age', {
              valueAsNumber: true,
            })}
            disabled={type === 'children'}
          />
          {errors.age && <Required>{errors.age.message}</Required>}
        </InputContainer>
        <InputContainer>
          <InputLabel>{t('form.gender')}</InputLabel>
          <PSelection {...register('gender')} disabled={type === 'children'}>
            {GENDERS.map((gender) => (
              <option value={gender} key={gender}>
                {t(`common.${gender}`)}
              </option>
            ))}
          </PSelection>
          {errors.gender && <Required>{errors.gender.message}</Required>}
        </InputContainer>
        {type === 'children' && (
          <InputContainer>
            <InputLabel>{t('form.relationship')}</InputLabel>
            <StyledInput {...register('relationship')} disabled={type === 'children'} />
            {errors.relationship && <Required>{errors.relationship.message}</Required>}
          </InputContainer>
        )}

        <ActionGroup>
          {type === 'student' && isClassAdmin && (
            <>
              <StyledButton type='submit' variant='primary'>
                {data === null ? t('common.create') : t('common.update')}
              </StyledButton>
              <StyledButton type='button' onClick={handleRemoveStudentFromClass} variant='danger'>
                {t('common.removeThisStudentFromClass')}
              </StyledButton>
            </>
          )}
        </ActionGroup>
      </FormContainer>
      <PBackdropLoading isShow={studentLoading} />
    </Container>
  );
};

export default ChildrenDetailModal;
