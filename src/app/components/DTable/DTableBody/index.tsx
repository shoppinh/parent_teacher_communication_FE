import { styled } from 'twin.macro';
import { ColumnProps } from '../DTableHead';
import React from 'react';
import {pxToRem} from "../../../../styles/theme/utils";

const StyledTableData = styled.td`
  border-bottom: ${pxToRem(1)}rem solid ${(p) => p.theme.tableBorder};
  border-right: ${pxToRem(1)}rem solid ${(p) => p.theme.tableBorder};
  padding: ${pxToRem(12.75)}rem ${pxToRem(8)}rem;
  &:first-child {
    border-left: ${pxToRem(1)}rem solid ${(p) => p.theme.tableBorder};
  }
`;

interface TableBodyProps {
  tableData: any[];
  columns: ColumnProps[];
  dataKey?: string;
}

const TableBody: React.FC<TableBodyProps> = ({ tableData, columns, dataKey = '' }) => {
  return (
    <tbody>
      {tableData.map((data, index) => {
        return (
          <tr key={data._id || data?.[dataKey] || index}>
            {columns.map(({ accessor, render, isRendered = true, style }) => {
              if (isRendered)
                return (
                  <StyledTableData key={accessor} {...{ style }}>
                    {render ? render(data) : data[accessor] ? data[accessor] : ''}
                  </StyledTableData>
                );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
