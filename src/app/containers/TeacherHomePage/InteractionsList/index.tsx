import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '../../../../store/selectors/session';
import { useProgressSlice } from '../../../../store/slices/progress';
import { Progress, ProgressListTokenQuery } from '../../../../types/Progress';
import { useQuery } from '../../../../utils/hook';
import { queryString, ROWS_PER_PAGE } from '../../../../utils/constants';
import {getCurrentProgress, getProgressList, getProgressLoading} from '../../../../store/selectors/progress';
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
import RemoveMarkModal from './RemoveMarkModal';

const Container = styled.div``;

const StyledIcon = styled(PIcon)`
  margin: 0 ${pxToRem(8)}rem;
`;
const ActionGroup = styled.span`
  display: flex;
  justify-content: center;
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
  const [isRemoveMarkModalOpen, setIsRemoveMarkModalOpen] = useState(false);
  const { actions: progressActions } = useProgressSlice();
  const dispatch = useDispatch();
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
  }, []);

  const handleRemoveMark = useCallback(
    (progressId: string) => {
      if (currentAccessToken) {
        dispatch(progressActions.removeProgress({ token: currentAccessToken, progressId }));
      }
    },
    [currentAccessToken, dispatch, progressActions]
  );

  const columns: ColumnProps[] = useMemo(() => {
    return [
      {
        label: 'Student Name',
        accessor: 'studentName',
        render: (item: Progress) => item.student.name,
      },
      {
        label: 'Student ID',
        accessor: 'studentId',
        render: (item: Progress) => item.student._id,
      },
      {
        label: 'Subject Name',
        accessor: 'subjectName',
        render: (item: Progress) => item.subject.name,
      },
      {
        label: 'Frequent Mark',
        accessor: 'frequentMark',
      },
      {
        label: 'Middle Exam Mark',
        accessor: 'middleExamMark',
      },
      {
        label: 'Final Exam Mark',
        accessor: 'finalExamMark',
      },
      {
        label: 'Average Mark',
        accessor: 'averageMark',
      },
      {
        label: 'Semester',
        accessor: 'semester',
      },
      {
        label: 'Year',
        accessor: 'year',
      },
      {
        label: 'Action',
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
  }, [handleOpenAssignMarkModal, handleOpenRemoveMarkModal]);

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
  return (
    <Container>
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
      />
      <PModal open={isAssignMarkModalOpen} onClose={handleCloseAssignMarkModal}>
        <AssignMarkModal
          value={currentProgress}
          type='update'
          handleClose={handleCloseAssignMarkModal}
          triggerRefreshProgressList={triggerRefreshProgressList}
        />
      </PModal>
      <PModal open={isRemoveMarkModalOpen} onClose={handleCloseRemoveMarkModal}>
        <RemoveMarkModal />
      </PModal>
    </Container>
  );
};

export default InteractionList;
