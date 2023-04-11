import React, { useCallback } from 'react';
import { pxToRem } from '../../../../styles/theme/utils';
import { styled } from 'twin.macro';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentList, getStudentLoading } from '../../../../store/selectors/student';
import { PButton } from '../../../components/PButton';
import { PModal } from '../../../components/PModal';
import ChildrenDetailModal from '../../Porfolios/ChildrenDetailModal';
import { Student } from '../../../../types/Student';
import { PLoadingIndicator } from '../../../components/PLoadingIndicatior';
import AvatarPlaceholder from '../../../../assets/images/person-placeholder.png';
import { useStudentSlice } from '../../../../store/slices/student';
import { getAccessToken } from '../../../../store/selectors/session';
import { useTranslation } from 'react-i18next';

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
const StyledButton = styled(PButton)`
  padding: ${pxToRem(10)}rem ${pxToRem(20)}rem;
  margin: ${pxToRem(5)}rem ${pxToRem(10)}rem ${pxToRem(5)}rem 0;
  border-radius: ${pxToRem(20)}rem;
  font-weight: 700;
`;
const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  const [selectedItem, setSelectedItem] = React.useState<Student | null>(null);
  const [detailModalOpen, setDetailModalOpen] = React.useState<boolean>(false);
  const handleOpenDetailModal = (item: Student | null) => {
    setSelectedItem(item);
    setDetailModalOpen(true);
  };
  const handleRefetchStudentList = useCallback(() => {
    if (currentAccessToken) {
      dispatch(
        studentActions.loadStudentListForParent({
          token: currentAccessToken,
        })
      );
    }
  }, [currentAccessToken, dispatch, studentActions]);

  return (
    <Container>
      <Section>
        <ActionContainer>
          <HeaderTitle>{t('portfolios.title')}</HeaderTitle>
          <StyledButton variant='primary' onClick={() => handleOpenDetailModal(null)}>
            {t('portfolios.addChildren.title')}
          </StyledButton>
        </ActionContainer>
      </Section>
      <Section>
        <SectionTitle>{t('portfolios.childrenList')}</SectionTitle>
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
              />
            </PModal>
          </Container>
        </SectionContent>
      </Section>
    </Container>
  );
};

export default Portfolios;
