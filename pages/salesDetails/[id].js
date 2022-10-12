import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useState } from "react";
import moment from "moment";
import Addedinfo from "../../components/Addedinfo";

export default function Salesid() {
  const [cookies, setCookies] = useCookies(["token"]);
  const [data, setData] = useState();
  const router = useRouter();
  const [showpay, setShowpay] = useState(true);
  const [showbill, setShowbill] = useState(false);
  const [pay, setPay] = useState(false);
  const [showhis, setShowhis] = useState(false);
  useEffect(() => {
    async function Orderdetails() {
      if (router.query.id) {
        const res = await axios.get(
          `https://mhbed.appiness.cc/api/admin/payment/order_detail_view/?order_id=${router.query.id}`,
          {
            headers: {
              Authorization: cookies.token,
            },
          }
        );
        console.log(res);
        setData(res.data.data);
      }
    }
    Orderdetails();
  }, [router.query.id]);

  return (
    <div className="salesid-main">
      {/* first-part */}
      <div className="w-full shadow-md">
        <div className="header flex justify-between items-center p-2 px-6">
          <div>
            {" "}
            <h1 className="inline-block font-medium justify-self-start md:py-2 pt-6 text-mhblue text-lg">
              Order Details
            </h1>
          </div>
          <div className="cursor-pointer">
            {" "}
            <img
              className="h-4"
              onClick={() => router.push("/salesDetails")}
              src="https://mhadmin.appiness.cc/icons/close.svg"
            ></img>
          </div>
        </div>
      </div>

      {/* order no  */}
      <div className="w-full flex py-2">
        <div className="border-r border-gray-300 px-6 flex items-center text-sm font-medium py-2">
          <div className="mr-2">
            <img
              className="w-4"
              src="https://mhadmin.appiness.cc/icons/draft-gray.svg"
            ></img>{" "}
          </div>
          <div> Order Number # {data?.ecom_receipt_no}</div>
        </div>
        <div className="border-r border-gray-300 px-6 flex items-center text-sm font-medium py-2">
          <div className="mr-2">
            <img
              className="w-4"
              src="https://mhadmin.appiness.cc/icons/CalendarGray.svg"
            ></img>{" "}
          </div>
          <div>{moment(data?.created_at).format("MMM Do YY")} </div>
        </div>
        <div className="px-6 flex items-center text-sm font-medium py-2">
          <div className="mr-2">
            {" "}
            <img
              className=" w-4"
              src="	https://mhadmin.appiness.cc/icons/time-gray.svg"
            ></img>
          </div>
          <div> {moment(data?.created_at).format("LT")}</div>
        </div>
      </div>

      {/* main-content */}
      <div className="details bg-gray-100 flex space-x-4 p-6 min-h-screen">
        <div className=" w-3/5">
          <div className="bg-white rounded p-4 pt-6">
            <div className="px-2 flex pb-3">
              <div className=" w-1/2  flex text-sm border-r border-gray-300 flex-col">
                <div className="title">
                  <h1 className="inline-block font-medium justify-self-start md:py-2 pt-6 text-sm text-gray-500">
                    Appointment Date
                  </h1>
                </div>
                <div className=" flex items-center text-sm font-medium py-2">
                  <div className="w-4 mr-2">
                    {" "}
                    <img src="https://mhadmin.appiness.cc/icons/CalendarGray.svg"></img>
                  </div>
                  <div className="mr-8">
                    {moment(data?.schedule).format("LL")}
                  </div>
                  <div>{moment(data?.schedule).format("LT")}</div>
                </div>
              </div>
              <div className="w-1/2 pl-6 flex text-sm mt-2">
                <div className="w-1/2 max-w-[120px]">
                  <div className="label mr-2">Ordered By</div>
                  <div className="label mr-2 mt-3">Ordered For</div>
                </div>
                <div className="w-1/2">
                  <div className="date font-medium  capitalize">
                    {" "}
                    {data?.ordered_by.first_name}
                  </div>
                  <div className="date font-medium mt-3  capitalize">
                    {data?.order_for}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-2 flex">
              <div className="w-1/2 flex text-sm border-gray-300">
                <div className="label mr-[46px]"> Order Status</div>
                <div className="date font-medium pl-1 capitalize">
                  cancelled
                </div>
              </div>
            </div>
            <div className="px-2 itemDetails border-t mt-4 pt-4">
              <div className="mb-4">
                <h1 className="inline-block font-medium justify-self-start md:py-2 pt-6 text-sm text-gray-500">
                  Item Details{" "}
                </h1>
              </div>
              <div className=" flex">
                <div className="w-1/2 text-sm border-r border-gray-300">
                  <div className=" font-medium mb-2">{data?.product_name}</div>
                  <div className=" font-normal">
                    Health Package Code:{data?.package_code}
                  </div>
                  <div className="inline-flex pt-4">
                    <div className="cursor-pointer p-2 border border-gray-500 text-gray-500 mr-4 rounded-md">
                      Total tests in package:{" "}
                      {data?.included_health_tests.length}
                    </div>
                  </div>
                </div>
                <div className="w-1/2 pl-6 pr-4 text-sm pb-8">
                  <div className="flex w-full items-center mb-3">
                    <div className="w-1/3 text-right mr-24 font-normal">
                      Price
                    </div>
                    <div className="bg-gray-200 p-2 px-4 text-xs w-20 text-center rounded">
                      {data?.order_amount}
                    </div>
                  </div>
                  <div className="total flex w-full items-center mb-4 font-medium">
                    <div className="w-1/3 text-right mr-24">Grand Total</div>
                    <div className="bg-gray-200 p-2 px-4 text-xs w-20 text-center rounded">
                      {data?.paid_amount == 0
                        ? data?.order_amount
                        : data?.paid_amount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded px-4 pt-4 pb-3 mt-6">
            <div className=" px-2">
              <h1 className="inline-block font-medium justify-self-start md:py-2 pt-6 text-sm text-gray-500">
                Additional Information
              </h1>{" "}
            </div>
            <div className=" text-sm pl-2 mb-2  text-black p-2 ">
              {" "}
              Health Package order push to LeadSquared is Pending{" "}
            </div>
            <hr></hr>
            <div className=" text-sm pl-2 mb-2  text-black p-2 mt-2">
              {" "}
              Payment is pending.
            </div>
            <hr></hr>
            <div className=" text-sm pl-2   text-black p-2 mt-2">
              {" "}
              Customer
              <span className=" ml-2 text-red-600">Not Notified </span>
            </div>
          </div>
        </div>
        <div className="w-2/5">
          <div className="borderDiv z-0 rounded-lg mb-2.5 p-0.5">
            <div className="bg-white rounded-lg py-3 pr-2 z-10">
              <h1 className=" px-4  mb-0  ">
                <button
                  className="relative flex items-center w-full md:py-1 lg:py-2 px-3 text-sm font-medium text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none collapsed justify-between description "
                  onClick={() => {
                    console.log("hy");
                    setShowpay(!showpay);
                  }}
                >
                  <span>Customer Information </span>
                  <span>
                    <img
                      className=" h-4 text-black"
                      src=" https://www.iconpacks.net/icons/2/free-arrow-down-icon-3101-thumb.png"
                    ></img>{" "}
                  </span>
                </button>
              </h1>
              <div className={showpay && "hidden"}>
                <div className="w-2/5">
                  <Addedinfo Orderdetails={data} />
                </div>
              </div>
            </div>
          </div>

          <div className="borderDiv z-0 rounded-lg mb-2.5 p-0.5">
            {" "}
            <div className="bg-white rounded-lg py-3 pr-2 z-10">
              <h1 className=" px-4  mb-0  ">
                <button className="relative flex items-center w-full md:py-1 lg:py-2 px-3 text-sm font-medium text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none collapsed justify-between">
                  <span>Billing Address</span>
                  <span>
                    <img
                      className=" h-4 text-black"
                      src=" https://www.iconpacks.net/icons/2/free-arrow-down-icon-3101-thumb.png"
                    ></img>{" "}
                  </span>
                </button>
              </h1>
            </div>
          </div>
          <div className="borderDiv z-0 rounded-lg mb-2.5 p-0.5">
            {" "}
            <div className="bg-white rounded-lg py-3 pr-2 z-10">
              <h1 className=" px-4  mb-0  ">
                <button className="relative flex items-center w-full md:py-1 lg:py-2 px-3 text-sm font-medium text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none collapsed justify-between">
                  <span>Payment Information </span>
                  <span>
                    <img
                      className=" h-4 text-black"
                      src=" https://www.iconpacks.net/icons/2/free-arrow-down-icon-3101-thumb.png"
                    ></img>{" "}
                  </span>
                </button>
              </h1>
            </div>
          </div>
          <div className="borderDiv z-0 rounded-lg mb-2.5 p-0.5">
            {" "}
            <div className="bg-white rounded-lg py-3 pr-2 z-10">
              <h1 className=" px-4  mb-0  ">
                <button className="relative flex items-center w-full md:py-1 lg:py-2 px-3 text-sm font-medium text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none collapsed justify-between">
                  <span>HIS Information </span>
                  <span>
                    <img
                      className=" h-4 text-black"
                      src=" https://www.iconpacks.net/icons/2/free-arrow-down-icon-3101-thumb.png"
                    ></img>{" "}
                  </span>
                </button>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
