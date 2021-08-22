import React from 'react';
import { Button } from 'react-bootstrap';

const separate = (a, b) => {
  if (a - b === 0) {
    return [a];
  } else if (a - b === 1) {
    return [a, b];
  } else {
    return [a, '...', b];
  }
};

const pagination = (currentPage, pageCount, delta = 2) => {
  return Array(delta * 2 + 1)
    .fill(0)
    .map((_, index) => currentPage - delta + index)
    .filter((page) => page > 0 && page <= pageCount)
    .flatMap((page, index, { length }) => {
      if (!index) return separate(1, page);
      if (index === length - 1) return separate(page, pageCount);

      return [page];
    });
};

const getPageBtn = (page, currentPage, gotoPage) => {
  if (page === '...') {
    return (
      <Button
        key={'...'}
        outline
        className="pagination-btn__circular pagination-btn__circular--disabled"
        disabled
      >
        ...
      </Button>
    );
  }
  // if page is not '...' then it is a pageNumber, so converting it to Number.
  const pageNumber = Number(page);
  if (pageNumber === currentPage) {
    return (
      <Button
        key={pageNumber}
        outline
        className="pagination-btn__circular pagination-btn__circular--active"
        onClick={() => gotoPage(pageNumber - 1)}
      >
        {pageNumber}
      </Button>
    );
  }
  return (
    <Button
      key={pageNumber}
      outline
      className="pagination-btn__circular"
      onClick={() => gotoPage(pageNumber - 1)}
    >
      {pageNumber}
    </Button>
  );
};

const prevBtn = (canPreviousPage, previousPage) => {
  if (canPreviousPage) {
    return (
      <Button
        key={'<'}
        outline
        className="pagination-btn__circular"
        onClick={previousPage}
      >{`<`}</Button>
    );
  }
  return (
    <Button
      key={'<'}
      outline
      className="pagination-btn__circular pagination-btn__circular--disabled"
      disabled
    >{`<`}</Button>
  );
};

const nextBtn = (canNextPage, nextPage) => {
  if (!canNextPage) {
    return (
      <Button
        key={'>'}
        outline
        className="pagination-btn__circular pagination-btn__circular--disabled"
        disabled
      >{`>`}</Button>
    );
  }
  return (
    <Button
      key={'>'}
      outline
      className="pagination-btn__circular"
      onClick={nextPage}
    >{`>`}</Button>
  );
};

const TablePagination = ({
  pageIndex,
  pageOptions,
  previousPage,
  canPreviousPage,
  nextPage,
  canNextPage,
  gotoPage,
}) => {
  const totalPages = pageOptions.length;
  const currentPage = pageIndex + 1;
  const pages = pagination(currentPage, totalPages);
  return (
    <div className="pagination-wrapper">
      <div className="pagination-details">{`Showing ${currentPage} of ${totalPages} pages`}</div>
      <div className="pagination-action">
        {prevBtn(canPreviousPage, previousPage)}
        {pages.map((page) => getPageBtn(page, currentPage, gotoPage))}
        {nextBtn(canNextPage, nextPage)}
      </div>
    </div>
  );
};

export default TablePagination;
