import React from "react";
import moment from "moment";
import Paginationn from "./Paginationn";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link } from "@nextui-org/react";

export default function OrderlistTable() {
  const [page, setPage] = useState(1);
  const [orderlist, setOrderlist] = useState();
  const [cookies, setCookie] = useCookies(["token"]);

  useEffect(() => {
    async function salesorderlist() {
      const res = await axios.get(
        `https://mhbed.appiness.cc/api/admin/payment/order_list_sales/10/${page}/ `,
        {
          headers: {
            Authorization: cookies.token,
          },
        }
      );
      setOrderlist(res.data);
      console.log(res);
    }
    salesorderlist();
  }, [page]);
  return (
    <div className=" bg-white pb-4 px-4 rounded-md w-full">
      <div className="sm:pt-4">
        <div className="shadow overflow-x-scroll">
          <div className="inline-block  shadow border rounded-lg">
            <table className=" min-w-max leading-normal">
              <thead>
                <tr>
                  <th className="false px-5 py-4 border-b-2 border-gray-200 text-center text-xs font-semibold text-black uppercase tracking-wider">
                    ORDER NUMBER
                  </th>
                  <th className="false px-5 py-4 border-b-2 border-gray-200 text-center text-xs font-semibold text-black uppercase tracking-wider">
                    BILLING DATE & TIME
                  </th>
                  <th className="false px-5 py-4 border-b-2 border-gray-200 text-center text-xs font-semibold text-black uppercase tracking-wider">
                    APPOINTMENT DATE & TIME
                  </th>
                  <th className="false px-5 py-4 border-b-2 border-gray-200 text-start text-xs font-semibold text-black uppercase tracking-wider">
                    PACKAGE NAME
                  </th>
                  <th className="false px-5 py-4 border-b-2 border-gray-200 text-start text-xs font-semibold text-black uppercase tracking-wider">
                    PATIENT NAME
                  </th>
                  <th className="false px-5 py-4 border-b-2 border-gray-200 text-center text-xs font-semibold text-black uppercase tracking-wider">
                    PATIENT NUMBER
                  </th>
                  <th className="false px-5 py-4 border-b-2 border-gray-200 text-center text-xs font-semibold text-black uppercase tracking-wider">
                    ORDERED BY
                  </th>
                  {/* <th className="false px-5 py-4 border-b-2 border-gray-200 text-center text-xs font-semibold text-black uppercase tracking-wider">
                    ORDERED BY CONTACT NUMBER
                  </th> */}
                  {/* <th className="false px-5 py-4 border-b-2 border-gray-200 text-center text-xs font-semibold text-black uppercase tracking-wider">
                  ORDER STATUS
                </th>
                <th className="false px-5 py-4 border-b-2 border-gray-200 text-center text-xs font-semibold text-black uppercase tracking-wider">
                  USER NOTIFIED
                </th>
                <th className="false px-5 py-4 border-b-2 border-gray-200 text-center text-xs font-semibold text-black uppercase tracking-wider">
                  ACTION
                </th> */}
                  {/* <th className="false px-5 py-4 border-b-2 border-gray-200 text-center text-xs font-semibold text-black uppercase tracking-wider">
                    EMAIL ACTION
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {orderlist?.results.map((e, i) => {
                  return (
                    <tr key={i} className="color-child">
                      <Link href={`/salesDetails/${e.item_id}`}>
                        <td className=" p-3 text-sky-700  cursor-pointer">
                          <a> {e.ecom_receipt_no}</a>
                        </td>
                      </Link>
                      <td className="p-4">
                        {moment(e.created_at).format("MMM Do YY, h:mm:ss a")}
                      </td>
                      <td className="p-4">{e.schedule}</td>
                      <td className="p-4">{e.product_name}</td>
                      <td className="p-4">{e.patient_name}</td>
                      <td className="p-4">{e.patient_number}</td>
                      <td className="p-4">{e.ordered_by.first_name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {orderlist?.results && (
        <Paginationn hdata={orderlist} changepage={setPage} />
      )}
    </div>
  );
}
