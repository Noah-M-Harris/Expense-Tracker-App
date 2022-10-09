import React from "react";

const AppPagination = ({ pageNumber, setPage }) => {
  const arr = Array.from(Array(pageNumber).keys());
  return (
    <nav aria-label="...">
      <ul className="pagination">
        {arr?.map(page => (
          <>
            <li key={page} className="page-item">
              <button
                // Calling to setPage to a new page: page += 1
                onClick={(e) => setPage(e.target.textContent)}
                className="page-link"
              >
                {++page}
              </button>
            </li>
          </>
        ))}
      </ul>
    </nav>
  );
};

export default AppPagination;
