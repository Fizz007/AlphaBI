import React, { useEffect, useState } from "react";

export default function Pagination({ setSkip, count }) {
  const [slice, setSlice] = useState(0);
  const [page, setPage] = useState([]);

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < count; i++) {
      arr[i] = i + 1;
    }
    setPage(arr);
  }, [count]);

  const handleClick = (e) => {
    setSkip((e - 1) * 9);
  };

  const handleSlice = (type) => {
    if (type === "prev") {
      setSlice(slice - 5);
    }
    if (type === "next") {
      setSlice(slice + 5);
      console.log(slice);
    }
  };

  return (
    <div className="pagination">
      {slice !== 0 && (
        <button className="btn" onClick={() => handleSlice("prev")}>
          Prev
        </button>
      )}
      <>
        {page.length > 0 &&
          page.slice(slice, slice + 5).map((ele, i) => (
            <button className="btn" key={i} onClick={() => handleClick(ele)}>
              {ele}
            </button>
          ))}
      </>
      {count > slice && (
        <button className="btn" onClick={() => handleSlice("next")}>
          Next
        </button>
      )}
    </div>
  );
}