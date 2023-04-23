import DTable from 'app/components/DTable';
import { ColumnProps } from 'app/components/DTable/DTableHead';
import { PButton } from 'app/components/PButton';
import { PIcon } from 'app/components/PIcon';
import { PModal } from 'app/components/PModal';
import ConfirmRemoveModal from 'app/containers/TeacherHomePage/InteractionsList/ConfirmRemoveModal';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAdminLoading,
  getSubjectList,
  getTeacherAssignmentList,
  getTeacherList,
} from 'store/selectors/admin';
import { getAccessToken } from 'store/selectors/session';
import { useAdminSlice } from 'store/slices/admin';
import styled from 'styled-components';
import { pxToRem } from 'styles/theme/utils';
import { TeacherAssignment } from 'types/TeacherAssignment';
import { ConstantRoles, ROWS_PER_PAGE } from 'utils/constants';
import { paginate } from 'utils/helpers';
import useTable from 'utils/hook/useTable';
import AssignmentDetailModal from './AssignmentDetailModal';
import { getClassList } from 'store/selectors/class';
import { useClassSlice } from 'store/slices/class';

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

const AssignmentManagement = () => {
  const { t } = useTranslation();
  const columns: ColumnProps[] = useMemo(() => {
    return [
      {
        label: t('table.teacherName'),
        accessor: 'teacherName',
        render: (item: TeacherAssignment) => item.teacherId?.userId?.fullname,
      },
      {
        label: t('form.subject'),
        accessor: 'subject',
        render: (item: TeacherAssignment) => item.subjectId?.name,
      },
      {
        label: t('table.className'),
        accessor: 'className',
        render: (item: TeacherAssignment) => item.classId?.name,
        style: {
          wordBreak: 'break-all',
        },
      },
      {
        label: t('table.isClassAdmin'),
        accessor: 'isClassAdmin',
        render: (item: TeacherAssignment) => t(`common.${item.isClassAdmin?.toString()}`),
      },
      {
        label: t('table.action'),
        accessor: 'action',
        render: (item: TeacherAssignment) => (
          <ActionGroup>
            <PButton onClick={() => handleOpenTeacherAssignmentDetailModal(item)}>
              <StyledIcon className='partei-pencil' />
            </PButton>
            <PButton onClick={() => handleOpenRemoveTeacherAssignmentModal(item)}>
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

  const [isTeacherAssignmentDetailModalOpen, setIsTeacherAssignmentDetailModalOpen] =
    React.useState(false);
  const [isRemoveTeacherAssignmentModalOpen, setIsRemoveTeacherAssignmentModalOpen] =
    React.useState(false);
  const [isRefresh, setIsRefresh] = React.useState(false);
  const [selectedTeacherAssignment, setSelectedTeacherAssignment] =
    React.useState<TeacherAssignment | null>(null);
  const accessToken = useSelector(getAccessToken);
  const dispatch = useDispatch();
  const { actions: adminActions } = useAdminSlice();
  const { actions: classActions } = useClassSlice();
  const handleOpenTeacherAssignmentDetailModal = (item: TeacherAssignment) => {
    setIsTeacherAssignmentDetailModalOpen(true);
    setSelectedTeacherAssignment(item);
  };

  const handleRemoveTeacherAssignment = useCallback(() => {
    if (accessToken && selectedTeacherAssignment) {
      dispatch(
        adminActions.removeAssignment({
          token: accessToken,
          teacherAssignmentId: selectedTeacherAssignment._id,
        })
      );
    }
  }, [accessToken, adminActions, dispatch, selectedTeacherAssignment]);
  const handleOpenRemoveTeacherAssignmentModal = (item: TeacherAssignment) => {
    setIsRemoveTeacherAssignmentModalOpen(true);
    setSelectedTeacherAssignment(item);
  };

  // Start - Table logic section
  const handleFetchTeacherAssignmentListData = useCallback(() => {
    // fetch parent list data
    if (accessToken) {
      dispatch(adminActions.loadAssignmentList({ token: accessToken }));
    }
  }, [accessToken, adminActions, dispatch]);
  const teacherAssignmentListData = useSelector(getTeacherAssignmentList);
  const adminLoading = useSelector(getAdminLoading);

  const { paginationRange, setCurrentPage, currentPage } = useTable(
    teacherAssignmentListData?.totalItem || 0,
    columns,
    ROWS_PER_PAGE,
    ''
  );

  const renderedData = useMemo(() => {
    if (teacherAssignmentListData?.data) {
      return paginate(teacherAssignmentListData.data, currentPage, ROWS_PER_PAGE);
    }
    return [];
  }, [currentPage, teacherAssignmentListData?.data]);

  useEffect(() => {
    if (isRefresh) {
      handleFetchTeacherAssignmentListData();
      setIsRefresh(false);
    }
  }, [handleFetchTeacherAssignmentListData, isRefresh]);
  // End - Table logic section

  useEffect(() => {
    if (!teacherAssignmentListData) {
      handleFetchTeacherAssignmentListData();
    }
  }, [handleFetchTeacherAssignmentListData, teacherAssignmentListData]);

  // If teacher list is empty, fetch it
  const teacherList = useSelector(getTeacherList);
  useEffect(() => {
    if (accessToken && !teacherList) {
      dispatch(adminActions.loadTeacherList({ token: accessToken }));
    }
  }, [accessToken, adminActions, dispatch, teacherList]);
  // If subject list is empty, fetch it
  const subjectList = useSelector(getSubjectList);
  useEffect(() => {
    if (accessToken && !subjectList) {
      dispatch(adminActions.loadSubjectList({ token: accessToken }));
    }
  }, [accessToken, adminActions, dispatch, subjectList]);
  // If class list is empty, fetch it
  const classList = useSelector(getClassList);
  useEffect(() => {
    if (accessToken && !classList) {
      dispatch(classActions.loadClassList({ token: accessToken, role: ConstantRoles.SUPER_USER }));
    }
  }, [accessToken, dispatch, classList, classActions]);
  return (
    <Container>
      <Section>
        <ActionContainer>
          <HeaderTitle>{t('admin.management.teacherAssignmentManagement.title')}</HeaderTitle>
          <StyledButton
            variant='primary'
            onClick={() => {
              setIsTeacherAssignmentDetailModalOpen(true);
              setSelectedTeacherAssignment(null);
            }}
          >
            {t('admin.management.teacherAssignmentManagement.addNewTeacherAssignment')}
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
          totalItems={teacherAssignmentListData?.totalItem || 0}
          rowsPerPage={ROWS_PER_PAGE}
          isLoading={adminLoading}
          tableSetting={{
            tableLayout: 'fixed',
          }}
        />
      </Section>
      <PModal
        open={isTeacherAssignmentDetailModalOpen}
        onClose={() => setIsTeacherAssignmentDetailModalOpen(false)}
      >
        <AssignmentDetailModal
          value={selectedTeacherAssignment}
          type={selectedTeacherAssignment ? 'edit' : 'add'}
          handleClose={() => setIsTeacherAssignmentDetailModalOpen(false)}
          triggerRefresh={handleFetchTeacherAssignmentListData}
        />
      </PModal>
      <PModal
        open={isRemoveTeacherAssignmentModalOpen}
        onClose={() => setIsRemoveTeacherAssignmentModalOpen(false)}
      >
        <ConfirmRemoveModal
          handleConfirm={handleRemoveTeacherAssignment}
          handleClose={() => setIsRemoveTeacherAssignmentModalOpen(false)}
          triggerRefresh={handleFetchTeacherAssignmentListData}
        />
      </PModal>
    </Container>
  );
};

export default React.memo(AssignmentManagement);
