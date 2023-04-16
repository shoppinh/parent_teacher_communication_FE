import { PLoadingIndicator } from 'app/components/PLoadingIndicatior';
import { PModal } from 'app/components/PModal';
import { PSelection } from 'app/components/PSelection';
import LeaveAddModal from 'app/containers/LeaveList/LeaveAddModal';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getLeaveFormList, getParentLoading } from 'store/selectors/parent';
import { getAccessToken } from 'store/selectors/session';
import { getStudentList } from 'store/selectors/student';
import { useParentSlice } from 'store/slices/parent';
import { pxToRem } from 'styles/theme/utils';
import { styled } from 'twin.macro';
import { LeaveForm } from 'types/Student';
import { LEAVE_FORM_STATUS } from 'utils/constants';

interface StatusProps {
  status: LEAVE_FORM_STATUS;
}

const Container = styled.div``;
const Section = styled.div`
  margin-bottom: ${pxToRem(12)}rem;
`;
const SectionTitle = styled.p`
  font: 700 ${pxToRem(17)}rem / ${pxToRem(20)}rem ${(p) => p.theme.fontFamily};
  margin-bottom: ${pxToRem(12)}rem;
`;
const HeaderTitle = styled(SectionTitle)`
  font: 700 ${pxToRem(20)}rem / ${pxToRem(20)}rem ${(p) => p.theme.fontFamily};
`;
const ItemList = styled.ul`
  list-style: none;
  padding: 0;
`;
const ItemRow = styled.li`
  display: flex;
  align-items: center;
  background-color: ${(p) => p.theme.background};
  padding: ${pxToRem(12)}rem;
  border-bottom: 1px solid ${(p) => p.theme.borderLight};

  &:hover {
    background-color: ${(p) => p.theme.contrastBackground};
    cursor: pointer;
  }
`;
const InfoContent = styled.div``;
const InfoTitle = styled.h3`
  font: 400 ${pxToRem(14)}rem / ${pxToRem(20)}rem ${(p) => p.theme.fontFamily};
  color: ${(p) => p.theme.text};
`;
const ParentInfo = styled.div`
  font: 400 ${pxToRem(14)}rem / ${pxToRem(20)}rem ${(p) => p.theme.fontFamily};
  color: ${(p) => p.theme.textContrast};
`;
const StatusInfo = styled(ParentInfo)<StatusProps>`
  ${(p) => {
    switch (p.status) {
      case LEAVE_FORM_STATUS.PENDING:
        return `
          color: ${p.theme.text};
        `;
      case LEAVE_FORM_STATUS.APPROVED:
        return `
          color: ${p.theme.primary};
        `;
      case LEAVE_FORM_STATUS.REJECTED:
        return `
          color: ${p.theme.danger};
        `;
      default:
        return `
          color: ${p.theme.textContrast};
        `;
    }
  }}
  display: inline-block;
`;
const SectionContent = styled.div``;
const ActionGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${pxToRem(10)}rem;
`;
const StyledPSelection = styled(PSelection)`
  min-width: ${pxToRem(200)}rem;
`;
const NotiText = styled.p`
  font: 400 ${pxToRem(14)}rem / ${pxToRem(20)}rem ${(p) => p.theme.fontFamily};
  text-align: center;
`;
const LeaveFormList = () => {
  const { t } = useTranslation();
  const [showConfirmModal, setIsShowConfirmModal] = React.useState(false);
  const { actions: parentActions } = useParentSlice();
  const [selectedStudentId, setSelectedStudentId] = React.useState<string>('');
  const [selectedLeaveForm, setSelectedLeaveForm] = React.useState<LeaveForm>();
  const leaveListData = useSelector(getLeaveFormList);
  const parentLoading = useSelector(getParentLoading);
  const currentAccessToken = useSelector(getAccessToken);
  const studentList = useSelector(getStudentList);
  const dispatch = useDispatch();
  const handleCloseConfirmModal = () => {
    setIsShowConfirmModal(false);
  };
  const handleOpenConfirmModal = (item: LeaveForm) => {
    setIsShowConfirmModal(true);
    setSelectedLeaveForm(item);
  };
  const handleFetchLeaveFormList = useCallback(() => {
    if (currentAccessToken && selectedStudentId) {
      dispatch(
        parentActions.loadLeaveFormList({
          token: currentAccessToken,
          studentId: selectedStudentId,
        })
      );
    }
  }, [currentAccessToken, dispatch, parentActions, selectedStudentId]);

  useEffect(() => {
    handleFetchLeaveFormList();
  }, [handleFetchLeaveFormList]);
  return (
    <Container>
      <ActionGroup>
        <HeaderTitle>{t('leaveForm.title')}</HeaderTitle>
        <StyledPSelection
          onChange={(e) => {
            setSelectedStudentId(e.target.value);
          }}
        >
          <option value=''>{t('common.pleaseSelectChildren')}</option>
          {studentList?.map((student) => {
            return (
              <option key={student._id} value={student._id}>
                {student.name}
              </option>
            );
          })}
        </StyledPSelection>
      </ActionGroup>
      <Section>
        <SectionContent>
          {parentLoading ? (
            <PLoadingIndicator />
          ) : (
            <ItemList>
              {selectedStudentId && leaveListData?.data?.length > 0 ? (
                leaveListData?.data?.map((item) => {
                  return (
                    <ItemRow key={item._id} onClick={() => handleOpenConfirmModal(item)}>
                      <InfoContent>
                        <InfoTitle>
                          {t('leaveForm.studentName', { name: item.student.name })}
                        </InfoTitle>
                        <ParentInfo>{t('leaveForm.leaveTitle', { title: item.title })}</ParentInfo>
                        <ParentInfo>
                          {t('leaveForm.leaveStatus')}
                          <StatusInfo status={item.status}>{t(`common.${item.status}`)}</StatusInfo>
                        </ParentInfo>
                      </InfoContent>
                    </ItemRow>
                  );
                })
              ) : (
                <NotiText>{t('common.noData')}</NotiText>
              )}
            </ItemList>
          )}
        </SectionContent>
      </Section>

      <PModal open={showConfirmModal} onClose={handleCloseConfirmModal}>
        <LeaveAddModal
          onClose={handleCloseConfirmModal}
          data={selectedLeaveForm}
          triggerRefreshList={handleFetchLeaveFormList}
        />
      </PModal>
    </Container>
  );
};

export default LeaveFormList;
