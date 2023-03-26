import React, { useMemo } from 'react';
import { TeacherAssignmentForClass } from '../../../../../../types/TeacherAssignment';
import { useTranslation } from 'react-i18next';
import { ColumnProps } from '../../../../../components/DTable/DTableHead';
import { StudentParentIncludedInfo } from '../../../../../../types/Student';
import useTable from '../../../../../../utils/hook/useTable';
import { ROWS_PER_PAGE } from '../../../../../../utils/constants';
import { paginate } from '../../../../../../utils/helpers';
import DTable from '../../../../../components/DTable';
interface Props {
  data: TeacherAssignmentForClass[];
  loading: boolean;
}
const TeacherAssignmentTableInfo: React.FC<Props> = ({ data, loading }) => {
  const { t } = useTranslation();
  const columns: ColumnProps[] = useMemo(() => {
    return [
      {
        label: t('table.assignmentId'),
        accessor: '_id',
        style: {
          wordBreak: 'break-word',
          width: '20%',
        },
      },
      {
        label: t('table.teacherName'),
        accessor: 'teacherName',
        render: (item: TeacherAssignmentForClass) =>
          item.teacher?.userId?.fullName || item.teacher?.userId?.username,
        style: {
          width: '20%',
        },
      },
      {
        label: t('table.age'),
        accessor: 'teacherAge',
        style: {
          width: '20%',
        },
        render: (item: TeacherAssignmentForClass) => item.teacher.age,
      },
      {
        label: t('table.gender'),
        accessor: 'teacherGender',
        style: {
          width: '20%',
        },
        render: (item: TeacherAssignmentForClass) => item.teacher.gender,
      },
      {
        label: t('table.degree'),
        accessor: 'teacherDegree',
        render: (item: TeacherAssignmentForClass) => item.teacher.degree,
        style: {
          width: '20%',
        },
      },
      {
        label: t('table.email'),
        accessor: 'teacherEmail',
        render: (item: TeacherAssignmentForClass) => item.teacher?.userId?.email,
        style: {
          width: '20%',
          wordBreak: 'break-word',

        },
      },
      {
        label: t('table.phoneNumber'),
        accessor: 'teacherEmail',
        render: (item: TeacherAssignmentForClass) => item.teacher?.userId?.mobilePhone,
        style: {
          width: '20%',
          wordBreak: 'break-word',
        },
      },
      {
        label: t('table.subjectName'),
        accessor: 'teacherEmail',
        render: (item: TeacherAssignmentForClass) => item.subject?.name,
        style: {
          width: '20%',
        },
      },
    ];
  }, [t]);
  const { paginationRange, setCurrentPage, currentPage } = useTable(
    data?.length || 0,
    columns,
    ROWS_PER_PAGE,
    ''
  );
  const renderedData = useMemo(() => {
    if (data) {
      return paginate(data, currentPage, ROWS_PER_PAGE);
    }
    return [];
  }, [currentPage, data]);
  return (
    <DTable
      columns={columns}
      tableData={renderedData}
      paginationRange={paginationRange}
      handleSorting={() => {}}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalItems={data?.length || 0}
      rowsPerPage={ROWS_PER_PAGE}
      isLoading={loading}
      tableSetting={{
        tableLayout: 'fixed',
      }}
    />
  );
};

export default TeacherAssignmentTableInfo;
