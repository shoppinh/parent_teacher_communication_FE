import DTable from 'app/components/DTable';
import { ColumnProps } from 'app/components/DTable/DTableHead';
import { PButton } from 'app/components/PButton';
import { PIcon } from 'app/components/PIcon';
import { PModal } from 'app/components/PModal';
import ConfirmRemoveModal from 'app/containers/TeacherHomePage/InteractionsList/ConfirmRemoveModal';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getClassList, getClassLoading } from 'store/selectors/class';
import { getAccessToken } from 'store/selectors/session';
import { useClassSlice } from 'store/slices/class';
import { pxToRem } from 'styles/theme/utils';
import { styled } from 'twin.macro';
import { Class } from 'types/Class';
import { ConstantRoles, ROWS_PER_PAGE } from 'utils/constants';
import { paginate } from 'utils/helpers';
import useTable from 'utils/hook/useTable';
import ClassDetailModal from './ClassDetailModal';

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
const ClassManagement = () => {
  const { t } = useTranslation();
  const [isClassDetailModalOpen, setIsClassDetailModalOpen] = React.useState(false);
  const [isRemoveClassModalOpen, setIsRemoveClassModalOpen] = React.useState(false);
  const [selectedClass, setSelectedClass] = React.useState<Class | null>(null);
  const [isRefresh, setIsRefresh] = React.useState(false);
  const { actions: classActions } = useClassSlice();
  const dispatch = useDispatch();
  const accessToken = useSelector(getAccessToken);
  const handleOpenClassDetailModal = (item: Class) => {
    setIsClassDetailModalOpen(true);
    setSelectedClass(item);
  };

  const handleRemoveClass = useCallback(() => {
    if (accessToken && selectedClass) {
      dispatch(
        classActions.removeClass({
          token: accessToken,
          classId: selectedClass._id,
        })
      );
    }
  }, [accessToken, classActions, dispatch, selectedClass]);
  const handleOpenRemoveClassModal = (item: Class) => {
    setIsRemoveClassModalOpen(true);
    setSelectedClass(item);
  };

  // Start - Table logic section
  const classListData = useSelector(getClassList);
  const classLoading = useSelector(getClassLoading);
  const handleFetchClassListData = useCallback(() => {
    // fetch class list data
    if (accessToken) {
      dispatch(classActions.loadClassList({ token: accessToken, role: ConstantRoles.SUPER_USER }));
    }
  }, [accessToken, classActions, dispatch]);

  const columns: ColumnProps[] = useMemo(() => {
    return [
      {
        label: t('table.className'),
        accessor: 'className',
        render: (item: Class) => item.name,
      },
      {
        label: t('table.isSchoolClass'),
        accessor: 'isSchoolClass',
        render: (item: Class) => t(`common.${item.isSchoolClass.toString()}`),
      },
      {
        label: t('table.isPrivateClass'),
        accessor: 'isPrivateClass',
        render: (item: Class) => t(`common.${item.isPrivateClass.toString()}`),
      },
      {
        label: t('table.action'),
        accessor: 'action',
        render: (item: Class) => (
          <ActionGroup>
            <PButton onClick={() => handleOpenClassDetailModal(item)}>
              <StyledIcon className='partei-pencil' />
            </PButton>
            <PButton onClick={() => handleOpenRemoveClassModal(item)}>
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
    classListData.total,
    columns,
    ROWS_PER_PAGE,
    ''
  );

  const renderedData = useMemo(() => {
    if (classListData.data) {
      return paginate(classListData.data, currentPage, ROWS_PER_PAGE);
    }
    return [];
  }, [currentPage, classListData.data]);

  useEffect(() => {
    if (isRefresh) {
      handleFetchClassListData();
      setIsRefresh(false);
    }
  }, [handleFetchClassListData, isRefresh]);
  // End - Table logic section
  return (
    <Container>
      <Section>
        <ActionContainer>
          <HeaderTitle>{t('admin.management.classManagement.title')}</HeaderTitle>
          <StyledButton
            variant='primary'
            onClick={() => {
              setIsClassDetailModalOpen(true);
              setSelectedClass(null);
            }}
          >
            {t('admin.management.classManagement.addNewClass')}
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
          totalItems={classListData.total}
          rowsPerPage={ROWS_PER_PAGE}
          isLoading={classLoading}
          tableSetting={{
            tableLayout: 'fixed',
          }}
        />
      </Section>
      <PModal open={isClassDetailModalOpen} onClose={() => setIsClassDetailModalOpen(false)}>
        <ClassDetailModal
          value={selectedClass}
          type={selectedClass ? 'edit' : 'add'}
          handleClose={() => setIsClassDetailModalOpen(false)}
          triggerRefresh={handleFetchClassListData}
        />
      </PModal>
      <PModal open={isRemoveClassModalOpen} onClose={() => setIsRemoveClassModalOpen(false)}>
        <ConfirmRemoveModal
          handleConfirm={handleRemoveClass}
          handleClose={() => setIsRemoveClassModalOpen(false)}
          triggerRefresh={handleFetchClassListData}
        />
      </PModal>
    </Container>
  );
};

export default ClassManagement;
