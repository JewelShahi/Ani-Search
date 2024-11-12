import React from "react";
import {
  MdOutlineKeyboardArrowLeft as ArrowLeft,
  MdOutlineKeyboardArrowRight as ArrowRight,
  MdOutlineKeyboardDoubleArrowLeft as DoubleLeft,
  MdOutlineKeyboardDoubleArrowRight as DoubleRight,
} from "react-icons/md";

const PaginationButtons = ({
  currentPage,
  totalPages,
  onPageChange,
  onNextPage,
  onPrevPage,
  onFirstPage,
  onLastPage,
}) => {
  const renderPageButtons = () => {
    const buttons = [];
    const maxButtons = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxButtons - 1);

    // First Page Button
    buttons.push(
      <button
        key="first"
        onClick={onFirstPage}
        disabled={currentPage === 1}
        style={{background: currentPage === 1 ? "gray" : "white", cursor: currentPage === 1 ? "default" : "pointer"}}
        className="page-btn page-navigation"
      >
        <DoubleLeft className="page-navigation-arrows" />
      </button>
    );

    // Previous Page Button
    buttons.push(
      <button
        key="prev"
        onClick={onPrevPage}
        disabled={currentPage === 1}
        style={{background: currentPage === 1 ? "gray" : "white", cursor: currentPage === 1 ? "default" : "pointer"}}
        className="page-btn page-navigation"
      >
        <ArrowLeft className="page-navigation-arrows" />
      </button>
    );

    // Page Buttons
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          style={{
            background: i === currentPage ? "#025507" : "white",
            color: i === currentPage ? "white" : "black",
            cursor: i === currentPage ? "default" : "pointer",
          }}
          disabled={i === currentPage}
          className="page-btn"
        >
          {i}
        </button>
      );
    }

    // Next Page Button
    buttons.push(
      <button
        key="next"
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        style={{background: currentPage === totalPages ? "gray" : "white", cursor: currentPage === totalPages ? "default" : "pointer"}}
        className="page-btn page-navigation"
      >
        <ArrowRight className="page-navigation-arrows" />
      </button>
    );

    // Last Page Button
    buttons.push(
      <button
        key="last"
        onClick={onLastPage}
        disabled={currentPage === totalPages}
        style={{background: currentPage === totalPages ? "gray" : "white", cursor: currentPage === totalPages ? "default" : "pointer"}}
        className="page-btn page-navigation"
      >
        <DoubleRight className="page-navigation-arrows" />
      </button>
    );
    return buttons;
  };

  return <div className="page-buttons">{renderPageButtons()}</div>;
};

export default PaginationButtons;
