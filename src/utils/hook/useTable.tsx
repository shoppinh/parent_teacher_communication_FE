import React, { useCallback, useEffect, useState } from 'react';
import { SORT_TYPE } from '../constants';
import { ColumnProps } from '../../app/components/DTable/DTableHead';

const range = (start: number, end: number): Array<number> => {
  const length = end - start + 1;
  /*
            Create an array of certain length and set the elements within it from
          start value to end value.
        */
  return Array.from({ length }, (_, idx) => idx + start);
};

const DOTS = '...';

const useTable = (
  totalItems: number,
  columns: ColumnProps[],
  rowsPerPage: number,
  searchString?: string,
  defaultSortField?: string,
  defaultSortOrder?: SORT_TYPE,
  siblingCount = 1
) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState(defaultSortField || '');
  const [sortOrder, setSortOrder] = useState<SORT_TYPE>(defaultSortOrder || 'desc');

  const handleSorting = useCallback(
    (sortField: string, sortOrder: SORT_TYPE) => {
      if (sortField) {
        setSortField(sortField);
        setSortOrder(sortOrder);
        if (currentPage !== 1) {
          setCurrentPage(1);
        }
      }
    },
    [currentPage]
  );

  const paginationRange = React.useMemo(() => {
    if (rowsPerPage) {
      const totalPageCount = Math.ceil(totalItems / rowsPerPage);
      // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
      const totalPageNumbers = siblingCount + 5;
      /*
                          Case 1:
                          If the number of pages is less than the page numbers we want to show in our
                          paginationComponent, we return the range [1..totalPageCount]
                        */
      if (totalPageNumbers >= totalPageCount) {
        return range(1, totalPageCount);
      }

      /*
                            Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
                        */
      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

      /*
                          We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
                        */
      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

      const firstPageIndex = 1;
      const lastPageIndex = totalPageCount;

      // 3 includes: the current page, the previous page and the next page
      // siblingCount represents items appearing next to the extremities but excludes the one appearing next to the visible set of dots
      const oneSideItemCount = 3 + 2 * siblingCount;

      /*
                            Case 2: No left dots to show, but rights dots to be shown
                        */
      if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftRange = range(1, oneSideItemCount);

        return [...leftRange, DOTS, totalPageCount];
      }

      /*
                            Case 3: No right dots to show, but left dots to be shown
                        */
      if (shouldShowLeftDots && !shouldShowRightDots) {
        const rightRange = range(totalPageCount - oneSideItemCount + 1, totalPageCount);
        return [firstPageIndex, DOTS, ...rightRange];
      }

      /*
                            Case 4: Both left and right dots to be shown
                        */
      if (shouldShowLeftDots && shouldShowRightDots) {
        const middleRange = range(leftSiblingIndex, rightSiblingIndex);
        return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
      }
    }
    return [];
  }, [totalItems, rowsPerPage, siblingCount, currentPage]);

  useEffect(() => {
    if (searchString) {
      setCurrentPage(1);
    }
  }, [searchString, setCurrentPage]);

  return { paginationRange, handleSorting, currentPage, setCurrentPage, sortField, sortOrder };
};
export default useTable;
