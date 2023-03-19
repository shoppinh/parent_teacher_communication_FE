import React from 'react';
import { styled } from 'twin.macro';
import { SORT_TYPE } from '../../../../utils/constants';
import { pxToRem } from '../../../../styles/theme/utils';
import { PIcon } from '../../PIcon';

interface TableHeadProps {
  sortable?: boolean;
}

interface TableHeadCellProps {
  columns: ColumnProps[];
  handleSorting: (sortField: string, sortOrder: SORT_TYPE) => void;
  sortField?: string;
  sortOrder?: SORT_TYPE;
}

export interface ColumnProps {
  label: string;
  accessor: string;
  sortable?: boolean;
  isRendered?: boolean;
  render?: (data: any) => React.ReactNode;
  style?: React.CSSProperties;
}

const StyledTabledHead = styled.th<TableHeadProps>`
  background: #fff;
  padding: ${pxToRem(13)}rem ${pxToRem(8)}rem;
  border-top: ${pxToRem(1)}rem solid ${(p) => p.theme.tableBorder};
  border-bottom: ${pxToRem(1)}rem solid ${(p) => p.theme.tableBorder};
  border-right: ${pxToRem(1)}rem solid ${(p) => p.theme.tableBorder};
  min-width: ${pxToRem(75)}rem;

  &:first-child {
    border-left: ${pxToRem(1)}rem solid ${(p) => p.theme.tableBorder};
  }

  font-weight: bold;
  text-align: left;
  ${(p) =>
    p.sortable &&
    `
    cursor: pointer;
    `}
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const StyledIcon = styled(PIcon)`
  cursor: pointer;
  font-size: ${pxToRem(11)}rem;
  color: ${(p) => p.theme.text};
  opacity: 0.5;
`;

const TableHead = ({ columns, handleSorting, sortField, sortOrder }: TableHeadCellProps) => {
  const handleSortingChange = (accessor: string) => {
    const order = accessor === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
    handleSorting(accessor, order);
  };

  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor, sortable, style, isRendered = true }) => {
          const cl = sortable
            ? sortField === accessor && sortOrder === 'asc'
              ? 'up'
              : sortField === accessor && sortOrder === 'desc'
              ? 'down'
              : 'default'
            : 'disabled';
          if (isRendered)
            return (
              <StyledTabledHead
                key={accessor}
                onClick={sortable ? () => handleSortingChange(accessor) : () => {}}
                {...{ style }}
                sortable={sortable}
              >
                {sortable ? (
                  <Container>
                    <span>{label}</span>
                    <StyledIcon className={`partei-arrow-${cl}`} />
                  </Container>
                ) : (
                  <>{label}</>
                )}
              </StyledTabledHead>
            );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
