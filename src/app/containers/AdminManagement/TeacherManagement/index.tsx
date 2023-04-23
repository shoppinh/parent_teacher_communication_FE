import DTable from 'app/components/DTable';
import { ColumnProps } from 'app/components/DTable/DTableHead';
import { PButton } from 'app/components/PButton';
import { PIcon } from 'app/components/PIcon';
import { PModal } from 'app/components/PModal';
import ConfirmRemoveModal from 'app/containers/TeacherHomePage/InteractionsList/ConfirmRemoveModal';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminLoading, getTeacherList } from 'store/selectors/admin';
import { getAccessToken } from 'store/selectors/session';
import { useAdminSlice } from 'store/slices/admin';
import styled from 'styled-components';
import { pxToRem } from 'styles/theme/utils';
import { Teacher } from 'types/Admin/Teacher';
import { ROWS_PER_PAGE } from 'utils/constants';
import { paginate } from 'utils/helpers';
import useTable from 'utils/hook/useTable';
import TeacherDetailModal from './TeacherDetailModal';

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

const TeacherManagement = () => {
  const { t } = useTranslation();
  const columns: ColumnProps[] = useMemo(() => {
    return [
      {
        label: t('table.teacherName'),
        accessor: 'teacherName',
        render: (item: Teacher) => item.userId.fullname,
      },
      {
        label: t('form.firstName'),
        accessor: 'firstName',
        render: (item: Teacher) => item.userId.firstname,
      },
      {
        label: t('form.lastName'),
        accessor: 'lastName',
        render: (item: Teacher) => item.userId.lastname,
      },
      {
        label: t('table.email'),
        accessor: 'email',
        render: (item: Teacher) => item.userId.email,
        style: {
          wordBreak: 'break-all',
        },
      },
      {
        label: t('table.age'),
        accessor: 'age',
        render: (item: Teacher) => item.age,
      },
      {
        label: t('table.phoneNumber'),
        accessor: 'phoneNumber',
        render: (item: Teacher) => item.userId.mobilePhone,
      },
      {
        label: t('table.degree'),
        accessor: 'degree',
        render: (item: Teacher) => item.degree,
      },
      {
        label: t('table.address'),
        accessor: 'address',
        render: (item: Teacher) => item.address,
      },
      {
        label: t('table.isActive'),
        accessor: 'isActive',
        render: (item: Teacher) => t(`common.${item.userId.isActive?.toString()}`),
      },
      {
        label: t('table.action'),
        accessor: 'action',
        render: (item: Teacher) => (
          <ActionGroup>
            <PButton onClick={() => handleOpenTeacherDetailModal(item)}>
              <StyledIcon className='partei-pencil' />
            </PButton>
            <PButton onClick={() => handleOpenRemoveTeacherModal(item)}>
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

  const [isTeacherDetailModalOpen, setIsTeacherDetailModalOpen] = React.useState(false);
  const [isRemoveTeacherModalOpen, setIsRemoveTeacherModalOpen] = React.useState(false);
  const [isRefresh, setIsRefresh] = React.useState(false);
  const [selectedTeacher, setSelectedTeacher] = React.useState<Teacher | null>(null);
  const accessToken = useSelector(getAccessToken);
  const dispatch = useDispatch();
  const { actions: adminActions } = useAdminSlice();

  const handleOpenTeacherDetailModal = (item: Teacher) => {
    setIsTeacherDetailModalOpen(true);
    setSelectedTeacher(item);
  };

  const handleRemoveTeacher = useCallback(() => {
    if (accessToken && selectedTeacher) {
      dispatch(
        adminActions.removeTeacher({
          token: accessToken,
          teacherId: selectedTeacher._id,
        })
      );
    }
  }, [accessToken, adminActions, dispatch, selectedTeacher]);
  const handleOpenRemoveTeacherModal = (item: Teacher) => {
    setIsRemoveTeacherModalOpen(true);
    setSelectedTeacher(item);
  };

  // Start - Table logic section
  const handleFetchTeacherListData = useCallback(() => {
    // fetch teacher list data
    if (accessToken) {
      dispatch(adminActions.loadTeacherList({ token: accessToken }));
    }
  }, [accessToken, adminActions, dispatch]);
  const teacherListData = useSelector(getTeacherList);
  const adminLoading = useSelector(getAdminLoading);

  const { paginationRange, setCurrentPage, currentPage } = useTable(
    teacherListData?.totalItem || 0,
    columns,
    ROWS_PER_PAGE,
    ''
  );

  const renderedData = useMemo(() => {
    if (teacherListData?.data) {
      return paginate(teacherListData.data, currentPage, ROWS_PER_PAGE);
    }
    return [];
  }, [currentPage, teacherListData?.data]);

  useEffect(() => {
    if (isRefresh) {
      handleFetchTeacherListData();
      setIsRefresh(false);
    }
  }, [handleFetchTeacherListData, isRefresh]);
  // End - Table logic section

  useEffect(() => {
    if (!teacherListData) {
      handleFetchTeacherListData();
    }
  }, [handleFetchTeacherListData, teacherListData]);
  return (
    <Container>
      <Section>
        <ActionContainer>
          <HeaderTitle>{t('admin.management.teacherManagement.title')}</HeaderTitle>
          <StyledButton
            variant='primary'
            onClick={() => {
              setIsTeacherDetailModalOpen(true);
              setSelectedTeacher(null);
            }}
          >
            {t('admin.management.teacherManagement.addNewTeacher')}
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
          totalItems={teacherListData?.totalItem || 0}
          rowsPerPage={ROWS_PER_PAGE}
          isLoading={adminLoading}
          tableSetting={{
            tableLayout: 'fixed',
          }}
        />
      </Section>
      <PModal open={isTeacherDetailModalOpen} onClose={() => setIsTeacherDetailModalOpen(false)}>
        <TeacherDetailModal
          value={selectedTeacher}
          type={selectedTeacher ? 'edit' : 'add'}
          handleClose={() => setIsTeacherDetailModalOpen(false)}
          triggerRefresh={handleFetchTeacherListData}
        />
      </PModal>
      <PModal open={isRemoveTeacherModalOpen} onClose={() => setIsRemoveTeacherModalOpen(false)}>
        <ConfirmRemoveModal
          handleConfirm={handleRemoveTeacher}
          handleClose={() => setIsRemoveTeacherModalOpen(false)}
          triggerRefresh={handleFetchTeacherListData}
        />
      </PModal>
    </Container>
  );
};

export default React.memo(TeacherManagement);
