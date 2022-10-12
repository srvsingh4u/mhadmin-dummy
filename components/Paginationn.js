import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Loader from "./Loader";
import { Link } from "@nextui-org/react";
// import { disabled } from "express/lib/application";

export default function Paginationn({ hdata, changepage }) {
  const [pageno, setPageno] = useState(hdata?.current_page);

  return (
    <>
      <div className={`pagination ${hdata?.results.length == 0 && "justify"}`}>
        {pageno && hdata.results.length ? (
          <div className="page-count">
            Showing {(pageno - 1) * 10 + 1} -{" "}
            {hdata.page_ids[hdata.page_ids.length - 1] == pageno
              ? hdata.total_results
              : pageno * 10}{" "}
            of {hdata.total_results} records
          </div>
        ) : (
          ""
        )}

        <div className="next-page">
          <button
            className="previous-btn"
            disabled={pageno == 1}
            onClick={() => {
              setPageno(pageno - 1);
              changepage(pageno - 1);

              // disabled = { isLoading };
            }}
          >
            Previous
          </button>

          {hdata?.page_ids?.map((e, i) => (
            <button
              key={i}
              className={e == pageno ? "second-btn page-active" : "second-btn"}
              onClick={() => {
                changepage(e);
                setPageno(e);
              }}
            >
              {e}
            </button>
          ))}

          <button
            className="next-btn"
            disabled={pageno == hdata?.page_ids.length}
            onClick={() => {
              setPageno(pageno + 1);
              changepage(pageno + 1);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
