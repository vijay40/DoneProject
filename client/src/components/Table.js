import React from 'react';
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';
import TablePagination from './TablePagination';

const getHeaderColumn = (column) => {
  if (!column.disableSortBy) {
    if (column.isSorted) {
      if (column.isSortedDesc) {
        return (
          <div className="table__header">
            <span>{column.render('Header')}</span>
            <span>
              <i className="uil-angle-down table__sort-icon table__sort-icon--active"></i>
            </span>
          </div>
        );
      }
      return (
        <div className="table__header">
          <span>{column.render('Header')}</span>
          <span>
            <i className="uil-angle-up table__sort-icon table__sort-icon--active"></i>
          </span>
        </div>
      );
    }
    return (
      <div className="table__header">
        <span>{column.render('Header')}</span>
        <span>
          <i className="uil-sort table__sort-icon"></i>
        </span>
      </div>
    );
  }
  return (
    <div>
      <span>{column.render('Header')}</span>
    </div>
  );
};

const Table = ({ columns, data }) => {
  const instance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    pageOptions,
    page,
    state: { pageIndex, pageSize },
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
  } = instance;

  // Render the UI for your table
  return (
    <div className="table__wrapper">
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(
                    column.getSortByToggleProps({
                      className: column.className,
                    }),
                  )}
                >
                  {getHeaderColumn(column)}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps({
                      className: cell.column.className,
                    })}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <TablePagination
          pageIndex={pageIndex}
          pageOptions={pageOptions}
          previousPage={previousPage}
          nextPage={nextPage}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          gotoPage={gotoPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </div>
    </div>
  );
};

export default Table;
