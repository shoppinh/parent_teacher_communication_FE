import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '../../../../store/selectors/session';
import { useProgressSlice } from '../../../../store/slices/progress';
import {
  Progress,
  ProgressListByStudentTokenQuery,
  ProgressListTokenQuery,
} from '../../../../types/Progress';
import { useQuery } from '../../../../utils/hook';
import { queryString, ROWS_PER_PAGE } from '../../../../utils/constants';
import { getProgressList, getProgressLoading } from '../../../../store/selectors/progress';
import { styled } from 'twin.macro';
import DTable from '../../../components/DTable';
import { ColumnProps } from '../../../components/DTable/DTableHead';
import useTable from '../../../../utils/hook/useTable';
import { paginate } from '../../../../utils/helpers';
import { pxToRem } from '../../../../styles/theme/utils';
import { PIcon } from '../../../components/PIcon';
import { PModal } from '../../../components/PModal';
import { PButton } from '../../../components/PButton';
import { useTranslation } from 'react-i18next';
import { getStudentList } from '../../../../store/selectors/student';
import { PSelection } from '../../../components/PSelection';

const Container = styled.div``;

const StyledIcon = styled(PIcon)`
  margin: 0 ${pxToRem(8)}rem;
`;
const ActionGroup = styled.span`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${pxToRem(10)}rem;
`;
const StyledPSelection = styled(PSelection)`
  min-width: ${pxToRem(200)}rem;
`;
const TableTitle = styled.div`
  font-size: ${pxToRem(20)}rem;
  font-weight: 700;
  margin-bottom: ${pxToRem(10)}rem;
  padding: 0 ${pxToRem(10)}rem;
`;

const InteractionList: React.FC = () => {
  const currentAccessToken = useSelector(getAccessToken);
  const [isAssignMarkModalOpen, setIsAssignMarkModalOpen] = useState(false);
  const [studentId, setStudentId] = useState<string>('');
  const studentList = useSelector(getStudentList);
  // const classId = useQuery().get(queryString.classId);
  const { actions: progressActions } = useProgressSlice();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const progressLoading = useSelector(getProgressLoading);
  const handleFetchProgressList = useCallback(() => {
    if (currentAccessToken && studentId) {
      const payload: ProgressListByStudentTokenQuery = {
        token: currentAccessToken,
        studentId,
      };
      dispatch(progressActions.loadProgressListByStudent(payload));
    }
  }, [currentAccessToken, dispatch, progressActions, studentId]);

  const handleCloseAssignMarkModal = useCallback(() => {
    setIsAssignMarkModalOpen(false);
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
        label: t('table.studentId'),
        accessor: 'studentId',
        render: (item: Progress) => item.student._id,
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
          width: '20%',
          wordBreak: 'break-word',
        },
      },
      {
        label: t('table.frequentMark'),
        accessor: 'frequentMark',
        style: {
          width: '20%',
          wordBreak: 'break-word',
        },
      },
      {
        label: t('table.middleExamMark'),
        accessor: 'middleExamMark',
        style: {
          width: '20%',
          wordBreak: 'break-word',
        },
      },
      {
        label: t('table.finalExamMark'),
        accessor: 'finalExamMark',
        style: {
          width: '20%',
          wordBreak: 'break-word',
        },
      },
      {
        label: t('table.averageMark'),
        accessor: 'averageMark',
        style: {
          width: '20%',
          wordBreak: 'break-word',
        },
      },
      {
        label: t('table.semester'),
        accessor: 'semester',
        style: {
          width: '20%',
          wordBreak: 'break-word',
        },
      },
      {
        label: t('table.year'),
        accessor: 'year',
        style: {
          width: '20%',
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
              <StyledIcon className='partei-eye' />
            </PButton>
          </ActionGroup>
        ),
        style: {
          width: `${pxToRem(70)}rem`,
          textAlign: 'center',
        },
      },
    ];
  }, [handleOpenAssignMarkModal, t]);

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
  // const renderedStudentList = useMemo(() => {
  //   if (studentList && classId) {
  //     return studentList.filter((student) => student.classId === classId);
  //   }
  //   return [];
  // }, [classId, studentList]);

  useEffect(() => {
    handleFetchProgressList();
  }, [handleFetchProgressList]);

  // useEffect(() => {
  //   if (classId) {
  //     setStudentId('');
  //   }
  // }, [classId]);

  return (
    <Container>
      <ActionGroup>
        <TableTitle>Bảng điểm của học sinh</TableTitle>
        <StyledPSelection
          onChange={(e) => {
            setStudentId(e.target.value);
          }}
        >
          <option value=''>{t('common.pleaseSelectChildren')}</option>
          {studentList?.map((student) => {
            return (
              <option key={student._id} value={student._id}>
                {student.name}
              </option>
            );
          })}
        </StyledPSelection>
      </ActionGroup>

      {studentId && (
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
      )}

      <PModal open={isAssignMarkModalOpen} onClose={handleCloseAssignMarkModal}>
        <div>View Detail Modal</div>
      </PModal>
    </Container>
  );
};

export default InteractionList;
