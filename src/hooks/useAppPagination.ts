import { useMemo } from "react";

export const ELLIPSIS = "...";

interface PaginationProps {
  totalPages: number | null;
  currentPage: number;
  siblingCount?: number;
  maxButtonsWhenUnknown?: number;
}

/**
 * A custom hook to generate professional pagination logic.
 * - Shows a simple sliding window when total pages are unknown.
 * - Shows a complex ellipsis-based UI when total pages are known.
 */
export const useAppPagination = ({
  totalPages,
  currentPage,
  siblingCount = 1,
  maxButtonsWhenUnknown = 5,
}: PaginationProps): (string | number)[] => {
  const pageNumbersToDisplay = useMemo((): (string | number)[] => {
    if (totalPages) {
      // SCENARIO 1: We KNOW the total number of pages
      const totalPageNumbersToShow = siblingCount + 5;

      if (totalPageNumbersToShow >= totalPages) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(
        currentPage + siblingCount,
        totalPages
      );

      const shouldShowLeftEllipsis = leftSiblingIndex > 2;
      const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

      const firstPageIndex = 1;
      const lastPageIndex = totalPages;

      if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
        const leftItemCount = 3 + 2 * siblingCount;
        const leftRange = Array.from(
          { length: leftItemCount },
          (_, i) => i + 1
        );
        return [...leftRange, ELLIPSIS, lastPageIndex];
      }

      if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
        const rightItemCount = 3 + 2 * siblingCount;
        const rightRange = Array.from(
          { length: rightItemCount },
          (_, i) => totalPages - rightItemCount + 1 + i
        );
        return [firstPageIndex, ELLIPSIS, ...rightRange];
      }

      if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
        const middleRange = [];
        for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
          middleRange.push(i);
        }
        return [
          firstPageIndex,
          ELLIPSIS,
          ...middleRange,
          ELLIPSIS,
          lastPageIndex,
        ];
      }
    } else {
      // SCENARIO 2: We DON'T know the total pages yet
      const pages: number[] = [];
      for (let i = 0; i < maxButtonsWhenUnknown; i++) {
        pages.push(currentPage + i);
      }
      return pages;
    }

    return [];
  }, [currentPage, totalPages, siblingCount, maxButtonsWhenUnknown]);

  return pageNumbersToDisplay;
};
