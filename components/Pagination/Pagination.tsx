"use client";

import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      breakLabel={"..."}
      pageCount={totalPages}
      forcePage={Math.min(currentPage - 1, totalPages - 1)}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      containerClassName={styles.pagination}
      pageClassName={styles.page}
      pageLinkClassName={styles.link}
      previousClassName={styles.previous}
      previousLinkClassName={styles.link}
      nextClassName={styles.next}
      nextLinkClassName={styles.link}
      breakClassName={styles.break}
      breakLinkClassName={styles.link}
      activeClassName={styles.active}
      disabledClassName={styles.disabled}
    />
  );
}
