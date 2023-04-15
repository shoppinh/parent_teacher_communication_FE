import { PModal } from 'app/components/PModal';
import LeaveInfoModal from 'app/containers/LeaveList/LeaveInfoModal';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getCurrentLeaveFormList } from 'store/selectors/class';
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

const LeaveList = () => {
  const { t } = useTranslation();
  const [showConfirmModal, setIsShowConfirmModal] = React.useState(false);
  const [selectedLeaveForm, setSelectedLeaveForm] = React.useState<LeaveForm>();
  const leaveListData = useSelector(getCurrentLeaveFormList);
  const handleCloseConfirmModal = () => {
    setIsShowConfirmModal(false);
  };
  const handleOpenConfirmModal = (item: LeaveForm) => {
    setIsShowConfirmModal(true);
    setSelectedLeaveForm(item);
  };
  return (
    <Container>
      <Section>
        <HeaderTitle>{t('leaveForm.title')}</HeaderTitle>
      </Section>
      <Section>
        <SectionContent>
          <ItemList>
            {leaveListData?.map((item) => {
              return (
                <ItemRow key={item._id} onClick={() => handleOpenConfirmModal(item)}>
                  <InfoContent>
                    <InfoTitle>{t('leaveForm.studentName', { name: item.student.name })}</InfoTitle>
                    <ParentInfo>{t('leaveForm.leaveTitle', { title: item.title })}</ParentInfo>
                    <ParentInfo>
                      {t('leaveForm.leaveStatus')}
                      <StatusInfo status={item.status}>{t(`common.${item.status}`)}</StatusInfo>
                    </ParentInfo>
                  </InfoContent>
                </ItemRow>
              );
            })}
          </ItemList>
        </SectionContent>
      </Section>

      <PModal open={showConfirmModal} onClose={handleCloseConfirmModal}>
        <LeaveInfoModal onClose={handleCloseConfirmModal} data={selectedLeaveForm}></LeaveInfoModal>
      </PModal>
    </Container>
  );
};

export default LeaveList;
