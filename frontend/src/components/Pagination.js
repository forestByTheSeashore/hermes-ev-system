// src/components/Pagination.js
import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div style={paginationStyle}>
      <button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1} 
        style={pageButtonStyle}
      >
        上一页
      </button>
      <span>{currentPage} / {totalPages}</span>
      <button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages} 
        style={pageButtonStyle}
      >
        下一页
      </button>
    </div>
  );
}

const paginationStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '20px',
};

const pageButtonStyle = {
  padding: '8px 15px',
  fontSize: '16px',
  backgroundColor: '#2196F3',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  margin: '0 10px',
};

export default Pagination;
