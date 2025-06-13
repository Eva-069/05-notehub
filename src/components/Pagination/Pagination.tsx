import React from 'react';
import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ 
  pageCount, 
  currentPage, 
  onPageChange 
}) => {
  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected);
  };

  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage}
      onPageChange={handlePageClick}
      containerClassName={css.pagination}
      pageClassName={css.pageItem}
      pageLinkClassName={css.pageLink}
      previousClassName={css.pageItem}
      previousLinkClassName={css.pageLink}
      nextClassName={css.pageItem}
      nextLinkClassName={css.pageLink}
      activeClassName={css.active}
      disabledClassName={css.disabled}
      breakClassName={css.pageItem}
      breakLinkClassName={css.pageLink}
      previousLabel="‹"
      nextLabel="›"
      breakLabel="..."
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
    />
  );
};

export default Pagination;