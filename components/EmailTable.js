import React from "react";
import axios from "axios";
import { useEffect } from "react";
// import { useCookies } from "react-cookie";
import { useCookies } from "react-cookie";
import Cookies from "react-cookie";
import { useState } from "react";
import moment from "moment";
import Paginationn from "./Paginationn";
import Loader from "./Loader";
import { Link } from "@nextui-org/react";

export default function Table({ activetab }) {
  const [cookies, setCookie] = useCookies(["token"]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [wholedata, setWholedata] = useState();
  const [pageno, setPageno] = useState(1);

  const date = new Date();

  useEffect(() => {
    const emaildata = async () => {
      setIsLoading(true);
      const res = await axios.get(
        activetab == 0
          ? `https://mhbed.appiness.cc/api/admin/emailtemplate/email-template-list/10/1/`
          : `https://mhbed.appiness.cc/api/admin/hospital/get-hospital-email-list/10/${pageno}/`,
        {
          headers: {
            Authorization: cookies.token,
          },
        }
      );
      setData(res.data.results);

      setIsLoading(false);
      setPageno(res.data.current_page);
      console.log(res.data);
      setWholedata(res.data);
    };
    emaildata();
  }, [activetab, pageno]);

  const emailcount = (str) => {
    let strcount = 0;
    for (let i of str) {
      if (i == ",") {
        strcount++;
      }
    }
    return strcount + 1;
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <table className="Table-email min-w-full">
        <thead>
          {activetab == 0 && (
            <tr>
              <th className="one">Name</th>
              <th className="two">UPDATED AT</th>
              <th className="three"> CREATED AT</th>
              <th className="four">ACTION</th>
            </tr>
          )}

          {activetab == 1 && (
            <tr>
              <th className="one">HOSPITAL NAME</th>
              <th className="two">NO. OF TO EMAILS</th>
              <th className="three"> NO. OF CC EMAILS</th>
              <th className="four">ACTION</th>
            </tr>
          )}
        </thead>

        <tbody>
          {activetab == 0 &&
            data.length &&
            data.map((e, i) => (
              <tr className="t-pd" key={i}>
                <td>{e.verbose_name}</td>
                <td>
                  {moment(e.created_at).format("MMMM Do YYYY, h:mm:ss a")}
                </td>
                <td>{e.created_at}</td>
                <td>
                  <div>
                    <Link href={`/email/emailtemplate/${e.name}`}>
                      <a>
                        <img
                          src="https://mhadmin.appiness.cc/icons/editGreen.svg"
                          alt=""
                        />
                      </a>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}

          {activetab == 1 &&
            data.length &&
            data.map((e, i) => (
              <tr className="t-pd" key={i}>
                <td>{e.name}</td>
                <td>{e.is_trakCare_enabled}</td>
                <td>
                  {e.unit_cc_email_id ? emailcount(e.unit_cc_email_id) : "-"}
                </td>
                <td>
                  <div>
                    <Link href={`/email/emaillist/${e.id}`}>
                      <a>
                        <img
                          className=" cursor-pointer"
                          src="https://mhadmin.appiness.cc/icons/editGreen.svg"
                          alt=""
                        />
                      </a>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="pagination-email">
        <div className="email-records">
          {" "}
          Showing {(pageno - 1) * 10 + 1} -{" "}
          {wholedata?.page_ids[wholedata?.page_ids.length - 1] == pageno
            ? wholedata?.total_results
            : pageno * 10}{" "}
          of {wholedata?.total_results} records
        </div>

        <div className="page-btn">
          <button
            className="prev-email "
            onClick={() => setPageno(pageno - 1)}
            disabled={pageno == 1}
          >
            Previous
          </button>
          {wholedata?.page_ids.map((e, i) => (
            <button
              onClick={() => {
                console.log("hy");
                setPageno(e);
              }}
              key={i}
              className={
                e == wholedata.current_page ? "current-email" : "cr-email"
              }
            >
              {e}
            </button>
          ))}

          <button
            className="next-email"
            onClick={() => setPageno(pageno + 1)}
            disabled={pageno == wholedata?.page_ids.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
