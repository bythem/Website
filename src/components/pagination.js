import React, { useState, useEffect, useParams } from "react";
export default function Pagination(props) {
  // Declare a new state variable, which we'll call "count"  const [count, setCount] = useState(0);
  //const { addToast } = useToasts()

  const handleNextClick = () => {
    console.log(props);
  };

  const handlePreviousClick = () => {
    console.log(props);
  };

  return (
    <div className="">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a
              className="page-link"
              onClick={() => props.handlePreviousClick()}
            >
              Previous
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" onClick={() => props.handleNextClick()}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
