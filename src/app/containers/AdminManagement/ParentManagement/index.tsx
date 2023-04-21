import DTable from 'app/components/DTable';
import { ColumnProps } from 'app/components/DTable/DTableHead';
import { PButton } from 'app/components/PButton';
import { PIcon } from 'app/components/PIcon';
import { PModal } from 'app/components/PModal';
import ConfirmRemoveModal from 'app/containers/TeacherHomePage/InteractionsList/ConfirmRemoveModal';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from 'store/selectors/session';
import { useAdminSlice } from 'store/slices/admin';
import styled from 'styled-components';
import { pxToRem } from 'styles/theme/utils';
import { Parent } from 'types/Parent';
import ParentDetailModal from './ParentDetailModal';
import useTable from 'utils/hook/useTable';
import { ROWS_PER_PAGE } from 'utils/constants';
import { paginate } from 'utils/helpers';
import { getAdminLoading, getParentList } from 'store/selectors/admin';

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

const ParentManagement = () => {
  const { t } = useTranslation();
  const columns: ColumnProps[] = useMemo(() => {
    return [
      {
        label: t('table.parentName'),
        accessor: 'parentName',
        render: (item: Parent) => item.userId.fullname,
      },
      {
        label: t('form.firstName'),
        accessor: 'firstName',
        render: (item: Parent) => item.userId.firstname,
      },
      {
        label: t('form.lastName'),
        accessor: 'lastName',
        render: (item: Parent) => item.userId.lastname,
      },
      {
        label: t('table.email'),
        accessor: 'email',
        render: (item: Parent) => item.userId.email,
      },
      {
        label: t('table.age'),
        accessor: 'age',
        render: (item: Parent) => item.age,
      },
      {
        label: t('table.phoneNumber'),
        accessor: 'phoneNumber',
        render: (item: Parent) => item.userId.mobilePhone,
      },
      {
        label: t('table.isActive'),
        accessor: 'isActive',
        render: (item: Parent) => t(`common.${item.userId.isActive?.toString()}`),
      },
      {
        label: t('table.action'),
        accessor: 'action',
        render: (item: Parent) => (
          <ActionGroup>
            <PButton onClick={() => handleOpenParentDetailModal(item)}>
              <StyledIcon className='partei-pencil' />
            </PButton>
            <PButton onClick={() => handleOpenRemoveParentModal(item)}>
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

  const [isParentDetailModalOpen, setIsParentDetailModalOpen] = React.useState(false);
  const [isRemoveParentModalOpen, setIsRemoveParentModalOpen] = React.useState(false);
  const [isRefresh, setIsRefresh] = React.useState(false);
  const [selectedParent, setSelectedParent] = React.useState<Parent | null>(null);
  const accessToken = useSelector(getAccessToken);
  const dispatch = useDispatch();
  const { actions: adminActions } = useAdminSlice();

  const handleOpenParentDetailModal = (item: Parent) => {
    setIsParentDetailModalOpen(true);
    setSelectedParent(item);
  };

  const handleRemoveParent = useCallback(() => {
    if (accessToken && selectedParent) {
      dispatch(
        adminActions.removeParent({
          token: accessToken,
          parentId: selectedParent._id,
        })
      );
    }
  }, [accessToken, adminActions, dispatch, selectedParent]);
  const handleOpenRemoveParentModal = (item: Parent) => {
    setIsRemoveParentModalOpen(true);
    setSelectedParent(item);
  };

  // Start - Table logic section
  const handleFetchParentListData = useCallback(() => {
    // fetch parent list data
    if (accessToken) {
      dispatch(adminActions.loadParentList({ token: accessToken }));
    }
  }, [accessToken, adminActions, dispatch]);
  const parentListData = useSelector(getParentList);
  const adminLoading = useSelector(getAdminLoading);

  const { paginationRange, setCurrentPage, currentPage } = useTable(
    parentListData?.totalItem || 0,
    columns,
    ROWS_PER_PAGE,
    ''
  );

  const renderedData = useMemo(() => {
    if (parentListData?.data) {
      return paginate(parentListData.data, currentPage, ROWS_PER_PAGE);
    }
    return [];
  }, [currentPage, parentListData?.data]);

  useEffect(() => {
    if (isRefresh) {
      handleFetchParentListData();
      setIsRefresh(false);
    }
  }, [handleFetchParentListData, isRefresh]);
  // End - Table logic section

  useEffect(() => {
    if (!parentListData) {
      handleFetchParentListData();
    }
  }, [handleFetchParentListData, parentListData]);
  return (
    <Container>
      <Section>
        <ActionContainer>
          <HeaderTitle>{t('admin.management.classManagement.title')}</HeaderTitle>
          <StyledButton
            variant='primary'
            onClick={() => {
              setIsParentDetailModalOpen(true);
              setSelectedParent(null);
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
          totalItems={parentListData?.totalItem || 0}
          rowsPerPage={ROWS_PER_PAGE}
          isLoading={adminLoading}
          tableSetting={{
            tableLayout: 'fixed',
          }}
        />
      </Section>
      <PModal open={isParentDetailModalOpen} onClose={() => setIsParentDetailModalOpen(false)}>
        <ParentDetailModal
          value={selectedParent}
          type={selectedParent ? 'edit' : 'add'}
          handleClose={() => setIsParentDetailModalOpen(false)}
          triggerRefresh={handleFetchParentListData}
        />
      </PModal>
      <PModal open={isRemoveParentModalOpen} onClose={() => setIsRemoveParentModalOpen(false)}>
        <ConfirmRemoveModal
          handleConfirm={handleRemoveParent}
          handleClose={() => setIsRemoveParentModalOpen(false)}
          triggerRefresh={handleFetchParentListData}
        />
      </PModal>
    </Container>
  );
};

export default ParentManagement;
