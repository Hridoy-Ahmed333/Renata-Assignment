import { useState } from "react";
import { useDarkMode } from "../../Context/DarkModeContext";
import "./AllUsers.css";
import Wraper from "./sub-comp/Wraper";

function AllUsers({ data, setRe, re }) {
  const { darkMode } = useDarkMode();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePageClick = (page) => setCurrentPage(page);
  const handlePrev = () => currentPage > 1 && setCurrentPage((p) => p - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage((p) => p + 1);

  return (
    <div className={`users-list-cont ${darkMode ? "dark" : "light"}`}>
      <Wraper data={currentData} setRe={setRe} re={re} />

      <div className="pagination-controls">
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Prev
        </button>

        {[...Array(totalPages)].map((_, idx) => {
          const page = idx + 1;
          return (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={page === currentPage ? "active-page" : ""}
            >
              {page}
            </button>
          );
        })}

        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default AllUsers;
