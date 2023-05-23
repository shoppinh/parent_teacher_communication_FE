import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '../../../../store/selectors/session';
import { useProgressSlice } from '../../../../store/slices/progress';
import { Progress, ProgressListByStudentTokenQuery } from '../../../../types/Progress';
import { ROWS_PER_PAGE } from '../../../../utils/constants';
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
import ExportReportCardModal from './ExportReportCardModal';

const Container = styled.div``;

const StyledIcon = styled(PIcon)`
  margin: 0 ${pxToRem(8)}rem;
`;
const ActionGroup = styled.span`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${pxToRem(10)}rem;
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${pxToRem(10)}rem;
`;
const StyledPSelection = styled(PSelection)`
  min-width: ${pxToRem(200)}rem;
`;
const TableTitle = styled.div`
  font-size: ${pxToRem(20)}rem;
  font-weight: 700;
  margin-bottom: ${pxToRem(10)}rem;
`;
const StyledButton = styled(PButton)`
  padding: ${pxToRem(10)}rem ${pxToRem(20)}rem;
  margin: ${pxToRem(5)}rem ${pxToRem(10)}rem ${pxToRem(5)}rem 0;
  border-radius: ${pxToRem(20)}rem;
  font-weight: 700;
`;

const InteractionList: React.FC = () => {
  const currentAccessToken = useSelector(getAccessToken);
  const [isExportReportModalOpen, setIsExportReportModalOpen] = useState(false);
  const [studentId, setStudentId] = useState<string>('');
  const studentList = useSelector(getStudentList);
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

  const handleCloseExportReportCardModal = useCallback(() => {
    setIsExportReportModalOpen(false);
  }, []);

  const handleOpenExportReportCardModal = useCallback(() => {
    setIsExportReportModalOpen(true);
  }, []);

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
          width: '15%',
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
    ];
  }, [t]);

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
    handleFetchProgressList();
  }, [handleFetchProgressList]);

  return (
    <Container>
      <ActionGroup>
        <TableTitle>{t('interactionList.title')}</TableTitle>
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
        <>
          <ButtonGroup>
            <StyledButton onClick={handleOpenExportReportCardModal} variant='primary'>
              {t('interactionList.exportStudentReportCard')}
            </StyledButton>
          </ButtonGroup>
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
              tableLayout: 'fixed'
            }}
          />
        </>
      )}

      <PModal open={isExportReportModalOpen} onClose={handleCloseExportReportCardModal}>
        <ExportReportCardModal studentId={studentId} onClose={handleCloseExportReportCardModal} />
      </PModal>
    </Container>
  );
};

export default React.memo(InteractionList);
