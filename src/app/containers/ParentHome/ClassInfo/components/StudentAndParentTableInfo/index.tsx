import React, { useMemo } from 'react';
import { StudentParentIncludedInfo } from '../../../../../../types/Student';
import useTable from '../../../../../../utils/hook/useTable';
import { ROWS_PER_PAGE } from '../../../../../../utils/constants';
import { paginate } from '../../../../../../utils/helpers';
import { ColumnProps } from '../../../../../components/DTable/DTableHead';
import { Progress } from '../../../../../../types/Progress';
import { useTranslation } from 'react-i18next';
import DTable from '../../../../../components/DTable';
interface Props {
  data: StudentParentIncludedInfo[];
  loading: boolean;
}
const StudentAndParentTableInfo: React.FC<Props> = ({ data, loading }) => {
  const { t } = useTranslation();
  const columns: ColumnProps[] = useMemo(() => {
    return [
      {
        label: t('table.studentId'),
        accessor: '_id',
        style: {
          wordBreak: 'break-word',
          width: '20%',
        },
      },
      {
        label: t('table.studentName'),
        accessor: 'name',
        style: {
          width: '20%',
        },
      },
      {
        label: t('table.age'),
        accessor: 'age',
        style: {
          width: '20%',
        },
      },
      {
        label: t('table.gender'),
        accessor: 'gender',
        style: {
          width: '20%',
        },
      },
      {
        label: t('table.parentId'),
        accessor: 'parentId',
        render: (item: StudentParentIncludedInfo) => item.parentId._id,
        style: {
          width: '20%',
          wordBreak: 'break-word',
        },
      },

      {
        label: t('table.parentName'),
        accessor: 'parentName',
        render: (item: StudentParentIncludedInfo) =>
          item.parentId?.userId?.fullName || item.parentId?.userId?.username,
        style: {
          width: '20%',
        },
      },
      {
        label: t('table.phoneNumber'),
        accessor: 'parentPhone',
        render: (item: StudentParentIncludedInfo) => item.parentId?.userId?.mobilePhone,
        style: {
          width: '20%',
        },
      },
      {
        label: t('table.parentAge'),
        accessor: 'parentAge',
        render: (item: StudentParentIncludedInfo) => item.parentId.age,
        style: {
          width: '20%',
        },
      },
      {
        label: t('table.address'),
        accessor: 'parentAddress',
        render: (item: StudentParentIncludedInfo) => item.parentId.address,
        style: {
          width: '20%',
        },
      },
      {
        label: t('table.relationship'),
        accessor: 'parentRelationship',
        render: (item: StudentParentIncludedInfo) => item.relationship,
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

export default React.memo(StudentAndParentTableInfo);
