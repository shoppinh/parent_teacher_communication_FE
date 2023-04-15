import PBackdropLoading from 'app/components/PBackdropLoading';
import { PButton } from 'app/components/PButton';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getClassListError, getClassLoading } from 'store/selectors/class';
import { getAccessToken } from 'store/selectors/session';
import { useClassSlice } from 'store/slices/class';
import styled from 'styled-components';
import { StyleConstants } from 'styles/constants/style';
import { pxToRem } from 'styles/theme/utils';
import tw from 'twin.macro';
import { LeaveForm } from 'types/Student';
import { DateFormat, LEAVE_FORM_STATUS, queryString } from 'utils/constants';
import { formatDateWithLocale, formatDateWithTimezone } from 'utils/dateHelpers/formatDate';
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
const MainInfoContent = styled.div``;
const LeaveInfoModal: React.FC<Props> = ({ data, onClose }) => {
  const { t } = useTranslation();
  const [isFormSent, setIsFormSent] = React.useState(false);
  const accessToken = useSelector(getAccessToken);
  const dispatch = useDispatch();
  const { actions: classActions } = useClassSlice();
  const updateLoading = useSelector(getClassLoading);
  const updateError = useSelector(getClassListError);
  const classId = useQuery().get(queryString.classId);
  const handleUpdateLeaveFormStatus = useCallback(
    (status: LEAVE_FORM_STATUS) => {
      if (accessToken && data?._id && classId) {
        dispatch(
          classActions.updateLeaveFormStatus({
            token: accessToken,
            formId: data?._id,
            status,
            classId,
          })
        );
        setIsFormSent(true);
      }
    },
    [accessToken, classActions, data?._id, dispatch, classId]
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
          <InfoSection>
            <InfoLabel>{t('leaveForm.leaveTitleWithoutParam')}</InfoLabel>
            <InfoText>{data?.title}</InfoText>
          </InfoSection>
          <InfoSection>
            <InfoLabel>{t('table.studentName')}</InfoLabel>
            <InfoText>{data?.student.name}</InfoText>
          </InfoSection>
          <InfoSection>
            <InfoLabel>{t('leaveForm.reasonTitle')}</InfoLabel>
            <InfoText>{data?.reason}</InfoText>
          </InfoSection>
          <InfoSection>
            <InfoLabel>{t('leaveForm.leaveDate')}</InfoLabel>
            <InfoText>{formatDateWithLocale(data?.leaveDate)}</InfoText>
          </InfoSection>
          <InfoSection>
            <InfoLabel>{t('leaveForm.createdDate')}</InfoLabel>
            <InfoText>
              {formatDateWithTimezone(data?.createdAt, DateFormat.LOG_FULL_DATE_HOUR_MINUTE)}
            </InfoText>
          </InfoSection>
        </MainInfoContent>

        <ActionGroup>
          {data?.status === LEAVE_FORM_STATUS.PENDING && (
            <>
              <StyledButton
                type='submit'
                variant='primary'
                onClick={() => handleUpdateLeaveFormStatus(LEAVE_FORM_STATUS.APPROVED)}
              >
                {t('common.approve')}
              </StyledButton>
              <StyledButton
                type='button'
                variant='danger'
                onClick={() => handleUpdateLeaveFormStatus(LEAVE_FORM_STATUS.REJECTED)}
              >
                {t('common.reject')}
              </StyledButton>
            </>
          )}
        </ActionGroup>
        <PBackdropLoading isShow={updateLoading} />
      </InfoContainer>
    </Container>
  );
};

export default LeaveInfoModal;
