import DTable from 'app/components/DTable';
import { ColumnProps } from 'app/components/DTable/DTableHead';
import { PButton } from 'app/components/PButton';
import { PIcon } from 'app/components/PIcon';
import { PModal } from 'app/components/PModal';
import ConfirmRemoveModal from 'app/containers/TeacherHomePage/InteractionsList/ConfirmRemoveModal';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminLoading, getSubjectList } from 'store/selectors/admin';
import { getAccessToken } from 'store/selectors/session';
import { useAdminSlice } from 'store/slices/admin';
import { pxToRem } from 'styles/theme/utils';
import { styled } from 'twin.macro';
import { Subject } from 'types/Subject';
import { ConstantRoles, ROWS_PER_PAGE } from 'utils/constants';
import { paginate } from 'utils/helpers';
import useTable from 'utils/hook/useTable';
import SubjectDetailModal from './SubjectDetailModal';

const Container = styled.div``;

const StyledIcon = styled(PIcon)`
  margin: 0 ${pxToRem(8)}rem;
`;
const ActionGroup = styled.span`
  display: flex;
  justify-content: center;
`;
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
const SubjectManagement = () => {
  const { t } = useTranslation();
  const [isSubjectDetailModalOpen, setIsSubjectDetailModalOpen] = React.useState(false);
  const [isRemoveSubjectModalOpen, setIsRemoveSubjectModalOpen] = React.useState(false);
  const [selectedSubject, setSelectedSubject] = React.useState<Subject | null>(null);
  const [isRefresh, setIsRefresh] = React.useState(false);
  const { actions: adminActions } = useAdminSlice();
  const dispatch = useDispatch();
  const accessToken = useSelector(getAccessToken);
  const handleOpenSubjectDetailModal = (item: Subject) => {
    setIsSubjectDetailModalOpen(true);
    setSelectedSubject(item);
  };

  const handleRemoveSubject = useCallback(() => {
    if (accessToken && selectedSubject) {
      dispatch(
        adminActions.removeSubject({
          token: accessToken,
          subjectId: selectedSubject._id,
        })
      );
    }
  }, [accessToken, adminActions, dispatch, selectedSubject]);
  const handleOpenRemoveSubjectModal = (item: Subject) => {
    setIsRemoveSubjectModalOpen(true);
    setSelectedSubject(item);
  };

  // Start - Table logic section
  const subjectListData = useSelector(getSubjectList);
  const SubjectLoading = useSelector(getAdminLoading);
  const handleFetchSubjectListData = useCallback(() => {
    // fetch Subject list data
    if (accessToken) {
      dispatch(adminActions.loadSubjectList({ token: accessToken }));
    }
  }, [accessToken, adminActions, dispatch]);

  const columns: ColumnProps[] = useMemo(() => {
    return [
      {
        label: t('table.subjectId'),
        accessor: 'id',
        render: (item: Subject) => item._id,
      },
      {
        label: t('table.subjectName'),
        accessor: 'name',
        render: (item: Subject) => item.name,
      },
      {
        label: t('table.action'),
        accessor: 'action',
        render: (item: Subject) => (
          <ActionGroup>
            <PButton onClick={() => handleOpenSubjectDetailModal(item)}>
              <StyledIcon className='partei-pencil' />
            </PButton>
            <PButton onClick={() => handleOpenRemoveSubjectModal(item)}>
              <StyledIcon className='partei-bin' />
            </PButton>
          </ActionGroup>
        ),
        style: {
          width: `${pxToRem(70)}rem`,
          textAlign: 'center',
        },
      },
    ];
  }, [t]);

  const { paginationRange, setCurrentPage, currentPage } = useTable(
    subjectListData?.totalItem || 0,
    columns,
    ROWS_PER_PAGE,
    ''
  );

  const renderedData = useMemo(() => {
    if (subjectListData?.data) {
      return paginate(subjectListData?.data, currentPage, ROWS_PER_PAGE);
    }
    return [];
  }, [currentPage, subjectListData?.data]);

  useEffect(() => {
    if (isRefresh) {
      handleFetchSubjectListData();
      setIsRefresh(false);
    }
  }, [handleFetchSubjectListData, isRefresh]);
  // End - Table logic section

  useEffect(() => {
    if (!subjectListData) {
      handleFetchSubjectListData();
    }
  }, [handleFetchSubjectListData, subjectListData]);
  return (
    <Container>
      <Section>
        <ActionContainer>
          <HeaderTitle>{t('admin.management.subjectManagement.title')}</HeaderTitle>
          <StyledButton
            variant='primary'
            onClick={() => {
              setIsSubjectDetailModalOpen(true);
              setSelectedSubject(null);
            }}
          >
            {t('admin.management.subjectManagement.addNewSubject')}
          </StyledButton>
        </ActionContainer>
      </Section>
      <Section>
        <DTable
          columns={columns}
          tableData={renderedData}
          paginationRange={paginationRange}
          handleSorting={() => {}}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={subjectListData?.totalItem || 0}
          rowsPerPage={ROWS_PER_PAGE}
          isLoading={SubjectLoading}
          tableSetting={{
            tableLayout: 'fixed',
          }}
        />
      </Section>
      <PModal open={isSubjectDetailModalOpen} onClose={() => setIsSubjectDetailModalOpen(false)}>
        <SubjectDetailModal
          value={selectedSubject}
          type={selectedSubject ? 'edit' : 'add'}
          handleClose={() => setIsSubjectDetailModalOpen(false)}
          triggerRefresh={handleFetchSubjectListData}
        />
      </PModal>
      <PModal open={isRemoveSubjectModalOpen} onClose={() => setIsRemoveSubjectModalOpen(false)}>
        <ConfirmRemoveModal
          handleConfirm={handleRemoveSubject}
          handleClose={() => setIsRemoveSubjectModalOpen(false)}
          triggerRefresh={handleFetchSubjectListData}
        />
      </PModal>
    </Container>
  );
};

export default React.memo(SubjectManagement);
