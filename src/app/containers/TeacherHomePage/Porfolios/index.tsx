import React, { useCallback, useEffect } from 'react';
import { pxToRem } from '../../../../styles/theme/utils';
import { styled } from 'twin.macro';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStudentList,
  getStudentLoading,
  getUnassignedStudentList,
} from '../../../../store/selectors/student';
import { PLoadingIndicator } from '../../../components/PLoadingIndicatior';
import { PModal } from '../../../components/PModal';
import ChildrenDetailModal from '../../Portfolios/ChildrenDetailModal';
import { Student } from '../../../../types/Student';
import AvatarPlaceholder from '../../../../assets/images/person-placeholder.png';
import { PButton } from '../../../components/PButton';
import { useStudentSlice } from '../../../../store/slices/student';
import { getAccessToken } from '../../../../store/selectors/session';
import { useQuery } from '../../../../utils/hook';
import { queryString } from '../../../../utils/constants';
import AssignStudentModal from '../../Portfolios/AssignStudentModal';
import { useTranslation } from 'react-i18next';
import { getTeacherAssignmentDetail } from 'store/selectors/teacher';

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
const SectionContent = styled.div``;
const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledButton = styled(PButton)`
  padding: ${pxToRem(10)}rem ${pxToRem(20)}rem;
  margin: ${pxToRem(5)}rem ${pxToRem(10)}rem ${pxToRem(5)}rem 0;
  border-radius: ${pxToRem(20)}rem;
  font-weight: 700;
`;
const Container = styled.div``;
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
    opacity: 0.6;
    cursor: pointer;
  }
`;
const AvatarBadge = styled.img`
  background-image: url(${AvatarPlaceholder});
  background-size: cover;
  background-position: center center;
  width: 70px;
  height: 70px;
  border-radius: 50px;
  margin-right: ${pxToRem(12)}rem;
`;
const InfoContent = styled.div``;
const InfoTitle = styled.h3`
  font: 400 ${pxToRem(14)}rem / ${pxToRem(20)}rem ${(p) => p.theme.fontFamily};
  color: ${(p) => p.theme.text};
`;
const Portfolios: React.FC = () => {
  const { t } = useTranslation();
  const studentList = useSelector(getStudentList);
  const studentListLoading = useSelector(getStudentLoading);
  const { actions: studentActions } = useStudentSlice();
  const currentAccessToken = useSelector(getAccessToken);
  const dispatch = useDispatch();
  const classId = useQuery().get(queryString.classId);
  const [selectedItem, setSelectedItem] = React.useState<Student | null>(null);
  const [detailModalOpen, setDetailModalOpen] = React.useState<boolean>(false);
  const [assignStudentModalOpen, setAssignStudentModalOpen] = React.useState<boolean>(false);
  const teacherAssignmentDetail = useSelector(getTeacherAssignmentDetail);

  const handleOpenDetailModal = (item: Student | null) => {
    setSelectedItem(item);
    setDetailModalOpen(true);
  };

  const handleOpenAssignStudentModal = () => {
    setAssignStudentModalOpen(true);
  };

  const handleRefetchStudentList = useCallback(() => {
    if (currentAccessToken && classId) {
      dispatch(
        studentActions.loadStudentListByClass({
          token: currentAccessToken,
          classId,
        })
      );
    }
  }, [classId, currentAccessToken, dispatch, studentActions]);

  return (
    <Container>
      <Section>
        <ActionContainer>
          <HeaderTitle>{t('portfolios.title')}</HeaderTitle>
          <StyledButton variant='primary' onClick={handleOpenAssignStudentModal}>
            {t('portfolios.assignStudent.title')}
          </StyledButton>
        </ActionContainer>
      </Section>
      <Section>
        <SectionTitle>{t('portfolios.studentList')}</SectionTitle>
        <SectionContent>
          <Container>
            {studentListLoading ? (
              <PLoadingIndicator />
            ) : (
              <ItemList>
                {studentList?.map((item, index) => {
                  return (
                    <ItemRow key={index} onClick={() => handleOpenDetailModal(item)}>
                      <AvatarBadge />
                      <InfoContent>
                        <InfoTitle>{item?.name}</InfoTitle>
                      </InfoContent>
                    </ItemRow>
                  );
                })}
              </ItemList>
            )}
            <PModal open={detailModalOpen} onClose={() => setDetailModalOpen(false)}>
              <ChildrenDetailModal
                data={selectedItem}
                handleRefetchStudentList={handleRefetchStudentList}
                onClose={() => setDetailModalOpen(false)}
                type='student'
                isClassAdmin={teacherAssignmentDetail?.isClassAdmin}
              />
            </PModal>
            <PModal open={assignStudentModalOpen} onClose={() => setAssignStudentModalOpen(false)}>
              <AssignStudentModal
                onClose={() => setAssignStudentModalOpen(false)}
                handleRefetchStudentList={handleRefetchStudentList}
              />
            </PModal>
          </Container>
        </SectionContent>
      </Section>
    </Container>
  );
};

export default React.memo(Portfolios);
