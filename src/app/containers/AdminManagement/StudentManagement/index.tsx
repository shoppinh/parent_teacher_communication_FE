import DTable from 'app/components/DTable';
import { ColumnProps } from 'app/components/DTable/DTableHead';
import { PButton } from 'app/components/PButton';
import { PIcon } from 'app/components/PIcon';
import { PModal } from 'app/components/PModal';
import ChildrenDetailModal from 'app/containers/Portfolios/ChildrenDetailModal';
import ConfirmRemoveModal from 'app/containers/TeacherHomePage/InteractionsList/ConfirmRemoveModal';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminLoading, getParentList, getStudentList } from 'store/selectors/admin';
import { getAccessToken } from 'store/selectors/session';
import { useAdminSlice } from 'store/slices/admin';
import styled from 'styled-components';
import { pxToRem } from 'styles/theme/utils';
import { Student } from 'types/Student';
import { ROWS_PER_PAGE } from 'utils/constants';
import { paginate } from 'utils/helpers';
import useTable from 'utils/hook/useTable';

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

const StudentManagement = () => {
  const { t } = useTranslation();
  const columns: ColumnProps[] = useMemo(() => {
    return [
      {
        label: t('table.studentName'),
        accessor: 'studentName',
        render: (item: Student) => item.name,
      },
      {
        label: t('form.gender'),
        accessor: 'gender',
        render: (item: Student) => item.gender,
      },
      {
        label: t('form.age'),
        accessor: 'age',
        render: (item: Student) => item.age,
      },
      {
        label: t('table.className'),
        accessor: 'className',
        render: (item: Student) => item.class?.name,
      },
      {
        label: t('table.parentName'),
        accessor: 'parentName',
        render: (item: Student) => item.parent?.userId?.fullname,
      },
      {
        label: t('table.phoneNumber'),
        accessor: 'phoneNumber',
        render: (item: Student) => item.parent?.userId?.mobilePhone,
      },
      {
        label: t('table.address'),
        accessor: 'address',
        render: (item: Student) => item.parent?.address,
      },
      {
        label: t('table.relationship'),
        accessor: 'relationship',
        render: (item: Student) => item.relationship,
      },
      {
        label: t('table.action'),
        accessor: 'action',
        render: (item: Student) => (
          <ActionGroup>
            <PButton onClick={() => handleOpenStudentDetailModal(item)}>
              <StyledIcon className='partei-pencil' />
            </PButton>
            <PButton onClick={() => handleOpenRemoveStudentModal(item)}>
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

  const [isStudentDetailModalOpen, setIsStudentDetailModalOpen] = React.useState(false);
  const [isRemoveStudentModalOpen, setIsRemoveStudentModalOpen] = React.useState(false);
  const [isRefresh, setIsRefresh] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(null);
  const accessToken = useSelector(getAccessToken);
  const dispatch = useDispatch();
  const { actions: adminActions } = useAdminSlice();
  const parentListData = useSelector(getParentList);

  const handleOpenStudentDetailModal = (item: Student) => {
    setIsStudentDetailModalOpen(true);
    setSelectedStudent(item);
  };

  const handleRemoveStudent = useCallback(() => {
    if (accessToken && selectedStudent) {
      dispatch(
        adminActions.removeStudent({
          token: accessToken,
          studentId: selectedStudent._id,
        })
      );
    }
  }, [accessToken, adminActions, dispatch, selectedStudent]);
  const handleOpenRemoveStudentModal = (item: Student) => {
    setIsRemoveStudentModalOpen(true);
    setSelectedStudent(item);
  };

  // Start - Table logic section
  const handleFetchStudentListData = useCallback(() => {
    // fetch teacher list data
    if (accessToken) {
      dispatch(adminActions.loadStudentList({ token: accessToken }));
    }
  }, [accessToken, adminActions, dispatch]);
  const studentListData = useSelector(getStudentList);
  const adminLoading = useSelector(getAdminLoading);

  const { paginationRange, setCurrentPage, currentPage } = useTable(
    studentListData?.totalItem || 0,
    columns,
    ROWS_PER_PAGE,
    ''
  );

  const renderedData = useMemo(() => {
    if (studentListData?.data) {
      return paginate(studentListData.data, currentPage, ROWS_PER_PAGE);
    }
    return [];
  }, [currentPage, studentListData?.data]);

  useEffect(() => {
    if (isRefresh) {
      handleFetchStudentListData();
      setIsRefresh(false);
    }
  }, [handleFetchStudentListData, isRefresh]);
  // End - Table logic section

  // Get parent list if current user is super user
  useEffect(() => {
    if (accessToken && !parentListData) {
      dispatch(adminActions.loadParentList({ token: accessToken }));
    }
  }, [accessToken, adminActions, dispatch, parentListData]);

  useEffect(() => {
    if (!studentListData) {
      handleFetchStudentListData();
    }
  }, [handleFetchStudentListData, studentListData]);
  return (
    <Container>
      <Section>
        <ActionContainer>
          <HeaderTitle>{t('admin.management.studentManagement.title')}</HeaderTitle>
          <StyledButton
            variant='primary'
            onClick={() => {
              setIsStudentDetailModalOpen(true);
              setSelectedStudent(null);
            }}
          >
            {t('admin.management.studentManagement.addNewStudent')}
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
          totalItems={studentListData?.totalItem || 0}
          rowsPerPage={ROWS_PER_PAGE}
          isLoading={adminLoading}
          tableSetting={{
            tableLayout: 'fixed',
          }}
        />
      </Section>
      <PModal open={isStudentDetailModalOpen} onClose={() => setIsStudentDetailModalOpen(false)}>
        <ChildrenDetailModal
          data={selectedStudent}
          type='student'
          onClose={() => setIsStudentDetailModalOpen(false)}
          handleRefetchStudentList={handleFetchStudentListData}
        />
      </PModal>
      <PModal open={isRemoveStudentModalOpen} onClose={() => setIsRemoveStudentModalOpen(false)}>
        <ConfirmRemoveModal
          handleConfirm={handleRemoveStudent}
          handleClose={() => setIsRemoveStudentModalOpen(false)}
          triggerRefresh={handleFetchStudentListData}
        />
      </PModal>
    </Container>
  );
};

export default React.memo(StudentManagement);
