import React from 'react';

const Pagination = ({ total, current, onChange }) => {
  const pages = [];
  for (let i = 1; i <= total; i++) {
    pages.push(i);
  }

  return (
    <nav className="pagination-container">
      <ul className="pagination">
        <li className={`page-item ${current === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onChange(1)}>&laquo;</button>
        </li>
        <li className={`page-item ${current === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onChange(current - 1)}>&lsaquo;</button>
        </li>
        {pages.map((page) => (
          <li key={page} className={`page-item ${current === page ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onChange(page)}>{page}</button>
          </li>
        ))}
        <li className={`page-item ${current === total ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onChange(current + 1)}>&rsaquo;</button>
        </li>
        <li className={`page-item ${current === total ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onChange(total)}>&raquo;</button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
