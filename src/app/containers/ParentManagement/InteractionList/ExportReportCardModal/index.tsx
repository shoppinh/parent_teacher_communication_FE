import { PButton } from 'app/components/PButton';
import PInput from 'app/components/PInput';
import { PSelection } from 'app/components/PSelection';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from 'store/selectors/session';
import { useProgressSlice } from 'store/slices/progress';
import { StyleConstants } from 'styles/constants/style';
import { pxToRem } from 'styles/theme/utils';
import tw, { styled } from 'twin.macro';

const Container = styled.div`
  height: 50vh;
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

interface Props {
  studentId: string;
  onClose: () => void;
}
const ExportReportCardModal: React.FC<Props> = ({ studentId, onClose }) => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<{
    semester: number;
    year: number;
  }>({
    defaultValues: {
      semester: 1,
      year: new Date().getFullYear(),
    },
  });
  const { t } = useTranslation();
  const { actions: progressActions } = useProgressSlice();
  const accessToken = useSelector(getAccessToken);
  const dispatch = useDispatch();
  const onSubmit = useCallback(
    (data: { semester: number; year: number }) => {
      if (accessToken) {
        dispatch(
          progressActions.exportProgressReportCard({
            semester: data.semester,
            year: data.year,
            studentId,
            token: accessToken,
          })
        );
      }

      onClose();
    },
    [accessToken, dispatch, onClose, progressActions, studentId]
  );
  return (
    <Container>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <FormTitle>{t('form.exportStudentCardTitle')}</FormTitle>
        <InputContainer>
          <InputLabel>{t('table.year')}</InputLabel>
          <PInput
            type='number'
            min='1900'
            max='2099'
            step='1'
            {...register('year', {
              valueAsNumber: true,
            })}
          />
          {errors.year && <Required>{errors.year.message}</Required>}
        </InputContainer>
        <InputContainer>
          <InputLabel>{t('table.semester')}</InputLabel>
          <PSelection {...register('semester', { valueAsNumber: true })}>
            <option value='0'>{t('interactionList.allYear')}</option>
            <option value='1'>{t('interactionList.semester1')}</option>
            <option value='2'>{t('interactionList.semester2')}</option>
          </PSelection>
          {errors.semester && <Required>{errors.semester.message}</Required>}
        </InputContainer>
        <ActionGroup>
          <StyledButton type='submit' variant='primary'>
            {t('interactionList.exportReportCard')}
          </StyledButton>
        </ActionGroup>
      </FormContainer>
    </Container>
  );
};

export default ExportReportCardModal;
