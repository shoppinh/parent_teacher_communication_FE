import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '../../../../store/selectors/session';
import { useProgressSlice } from '../../../../store/slices/progress';
import { Progress, ProgressListTokenQuery } from '../../../../types/Progress';
import { useQuery } from '../../../../utils/hook';
import { queryString, ROWS_PER_PAGE } from '../../../../utils/constants';
import {
  getCurrentProgress,
  getProgressList,
  getProgressLoading,
} from '../../../../store/selectors/progress';
import { styled } from 'twin.macro';
import DTable from '../../../components/DTable';
import { ColumnProps } from '../../../components/DTable/DTableHead';
import useTable from '../../../../utils/hook/useTable';
import { paginate } from '../../../../utils/helpers';
import { pxToRem } from '../../../../styles/theme/utils';
import { PIcon } from '../../../components/PIcon';
import { PModal } from '../../../components/PModal';
import AssignMarkModal from './AssignMarkModal';
import { PButton } from '../../../components/PButton';
import ConfirmRemoveModal from './ConfirmRemoveModal';
import { useTranslation } from 'react-i18next';

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
interface Props {
  isRefresh: boolean;
  triggerRefreshProgressList: () => void;
  setIsRefreshProgressList: (isRefresh: boolean) => void;
}

const InteractionList: React.FC<Props> = ({
  triggerRefreshProgressList,
  setIsRefreshProgressList,
  isRefresh,
}) => {
  const currentAccessToken = useSelector(getAccessToken);
  const classId = useQuery().get(queryString.classId);
  const [isAssignMarkModalOpen, setIsAssignMarkModalOpen] = useState(false);
  const [isNewAssignMarkModalOpen, setIsNewAssignMarkModalOpen] = useState(false);
  const [isRemoveMarkModalOpen, setIsRemoveMarkModalOpen] = useState(false);
  const [progressIdToRemove, setProgressIdToRemove] = useState<string>('');
  const { actions: progressActions } = useProgressSlice();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentProgress = useSelector(getCurrentProgress);
  const progressLoading = useSelector(getProgressLoading);
  const handleFetchProgressList = useCallback(() => {
    if (currentAccessToken && classId) {
      const currentYear = new Date().getFullYear();
      const currentSemester = new Date().getMonth() < 5 ? 1 : 2;
      const payload: ProgressListTokenQuery = {
        token: currentAccessToken,
        classId,
        semester: currentSemester,
        year: currentYear,
      };
      dispatch(progressActions.loadProgressList(payload));
    }
  }, [classId, currentAccessToken, dispatch, progressActions]);

  const handleCloseAssignMarkModal = useCallback(() => {
    setIsAssignMarkModalOpen(false);
  }, []);
  const handleCloseNewAssignMarkModal = useCallback(() => {
    setIsNewAssignMarkModalOpen(false);
  }, []);
  const handleCloseRemoveMarkModal = useCallback(() => {
    setIsRemoveMarkModalOpen(false);
  }, []);
  const handleOpenAssignMarkModal = useCallback(
    (progressId: string) => {
      if (currentAccessToken) {
        dispatch(progressActions.loadProgressDetail({ token: currentAccessToken, progressId }));
        setIsAssignMarkModalOpen(true);
      }
    },
    [currentAccessToken, dispatch, progressActions]
  );

  const handleOpenRemoveMarkModal = useCallback((assignId: string) => {
    setIsRemoveMarkModalOpen(true);
    setProgressIdToRemove(assignId);
  }, []);

  const handleRemoveMark = useCallback(() => {
    if (currentAccessToken && progressIdToRemove) {
      dispatch(
        progressActions.removeProgress({
          token: currentAccessToken,
          progressId: progressIdToRemove,
        })
      );
    }
  }, [currentAccessToken, dispatch, progressActions, progressIdToRemove]);

  // Start - Table logic section

  const columns: ColumnProps[] = useMemo(() => {
    return [
      {
        label: t('table.studentName'),
        accessor: 'studentName',
        render: (item: Progress) => item.student.name,
        style: {
          width: '20%',
          wordBreak: 'break-word',
        },
      },
      {
        label: t('table.subjectName'),
        accessor: 'subjectName',
        render: (item: Progress) => item.subject.name,
        style: {
          width: '10%',
          wordBreak: 'break-word',
        },
      },
      {
        label: t('table.frequentMark'),
        accessor: 'frequentMark',
        style: {
          width: '10%',
          wordBreak: 'break-word',
        },
        render: (item: Progress) => item.frequentMark.toFixed(2),
      },
      {
        label: t('table.middleExamMark'),
        accessor: 'middleExamMark',
        style: {
          width: '10%',
          wordBreak: 'break-word',
        },
        render: (item: Progress) => item.middleExamMark.toFixed(2),
      },
      {
        label: t('table.finalExamMark'),
        accessor: 'finalExamMark',
        style: {
          width: '10%',
          wordBreak: 'break-word',
        },
        render: (item: Progress) => item.finalExamMark.toFixed(2),
      },
      {
        label: t('table.averageMark'),
        accessor: 'averageMark',
        style: {
          width: '10%',
          wordBreak: 'break-word',
        },
        render: (item: Progress) => item.averageMark.toFixed(2),
      },
      {
        label: t('table.semester'),
        accessor: 'semester',
        style: {
          width: '10%',
          wordBreak: 'break-word',
        },
      },
      {
        label: t('table.year'),
        accessor: 'year',
        style: {
          width: '10%',
          wordBreak: 'break-word',
        },
      },
      {
        label: t('table.assessment'),
        accessor: 'note',
        style: {
          width: '20%',
          wordBreak: 'break-word',
        },
      },
      {
        label: t('table.action'),
        accessor: 'action',
        render: (item: Progress) => (
          <ActionGroup>
            <PButton onClick={() => handleOpenAssignMarkModal(item._id)}>
              <StyledIcon className='partei-pencil' />
            </PButton>
            <PButton onClick={() => handleOpenRemoveMarkModal(item._id)}>
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
  }, [handleOpenAssignMarkModal, handleOpenRemoveMarkModal, t]);

  const progressListData = useSelector(getProgressList);

  const { paginationRange, setCurrentPage, currentPage } = useTable(
    progressListData.totalItem,
    columns,
    ROWS_PER_PAGE,
    ''
  );
  const renderedData = useMemo(() => {
    if (progressListData.data) {
      return paginate(progressListData.data, currentPage, ROWS_PER_PAGE);
    }
    return [];
  }, [currentPage, progressListData.data]);

  useEffect(() => {
    if (isRefresh) {
      handleFetchProgressList();
      setIsRefreshProgressList(false);
    } else {
      handleFetchProgressList();
    }
  }, [handleFetchProgressList, isRefresh, setIsRefreshProgressList]);
  // End - Table logic section

  return (
    <Container>
      <Section>
        <ActionContainer>
          <HeaderTitle>{t('tab.trackingAndAssessment')}</HeaderTitle>
          <StyledButton variant='primary' onClick={() => setIsNewAssignMarkModalOpen(true)}>
            {t('trackingAndAssessment.add.title')}
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
          totalItems={progressListData.totalItem}
          rowsPerPage={ROWS_PER_PAGE}
          isLoading={progressLoading}
          tableSetting={{
            tableLayout: 'fixed',
          }}
        />
      </Section>

      <PModal open={isAssignMarkModalOpen} onClose={handleCloseAssignMarkModal}>
        <AssignMarkModal
          value={currentProgress}
          type='update'
          handleClose={handleCloseAssignMarkModal}
          triggerRefreshProgressList={triggerRefreshProgressList}
        />
      </PModal>
      <PModal open={isNewAssignMarkModalOpen} onClose={handleCloseNewAssignMarkModal}>
        <AssignMarkModal
          value={null}
          type='assign'
          handleClose={handleCloseNewAssignMarkModal}
          triggerRefreshProgressList={triggerRefreshProgressList}
        />
      </PModal>
      <PModal open={isRemoveMarkModalOpen} onClose={handleCloseRemoveMarkModal}>
        <ConfirmRemoveModal
          handleConfirm={handleRemoveMark}
          handleClose={handleCloseRemoveMarkModal}
          triggerRefresh={triggerRefreshProgressList}
        />
      </PModal>
    </Container>
  );
};

export default React.memo(InteractionList);
