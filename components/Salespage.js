import React from "react";
import { Dropdown } from "@nextui-org/react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import OrderlistTable from "./OrderlistTable";
import DatePicker from "react-multi-date-picker";
import Toolbar from "react-multi-date-picker/plugins/toolbar";

export default function Salespage() {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["token"]);
  const [hoslist, setHoslist] = useState();
  const [dates, setDates] = useState([]);
  const [searchterm, setSearchterm] = useState("");
  const [active, setActive] = useState("Dashboard");

  useEffect(() => {
    async function hospitallist() {
      const res = await axios.get(
        "https://mhbed.appiness.cc/api/hospital/hospital-list/",
        {
          headers: {
            Authorization: cookies.token,
          },
        }
      );
      //   console.log(res);
      setHoslist(res.data.data);
    }
    hospitallist();
  }, []);
  //   console.log(hoslist);

  return (
    <div className="detailContent ">
      <div className="w-full">
        <div className="headerSection mb-2">
          <div className="flex justify-between px-0">
            <div>
              <h1 className="inline-block font-medium justify-self-start md:py-2 pt-6 text-mhblue text-lg">
                Sales Details
              </h1>
            </div>

            <div className="inline-block mr-6">
              <Dropdown>
                <Dropdown.Button
                  light
                  css={"width:200px"}
                  style={{
                    //   width: "300px",
                    border: "1px solid #d0c8c8",
                    marginRight: "17px",
                  }}
                >
                  <input
                    placeholder="search location"
                    disabled
                    style={{
                      outline: "none",
                      border: "none",
                      width: "200px",
                    }}
                  ></input>
                </Dropdown.Button>
                <Dropdown.Menu variant="light" css={{ height: "200px" }}>
                  <Dropdown.Item
                    key={"all locations"}
                    css={{ padding: "10px 7px" }}
                  >
                    <div>All Location</div>
                  </Dropdown.Item>
                  {hoslist?.map((e, i) => (
                    <Dropdown.Item key={i}>
                      <div className="text-gray-700 block  py-2 text-sm">
                        <p>{e.name}</p>
                      </div>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
      <div className="headerSection mb-2 px-0 py-4 bg-white">
        <div className="flex justify-between px-0 ml-5">
          <div className="flex items-center  switch-button">
            <button
              className={`text-xs px-20 py-3 shadow-lg block leading-normal ${
                active == "Dashboard" && "bg-[#21BEB5] text-white"
              }`}
              onClick={() => {
                setActive("Dashboard");
                router.query.tab = 0;
                router.push(router);
              }}
            >
              Dashboard
            </button>
            <button
              className={`text-xs px-20 py-3 shadow-lg block leading-normal ${
                active == "sales" && "bg-[#21BEB5] text-white"
              }`}
              onClick={() => {
                setActive("sales");
                router.query.tab = 1;
                router.push(router);
              }}
            >
              {" "}
              Salespage
            </button>
            <button
              className={`text-xs px-20 py-3 shadow-lg block leading-normal ${
                active == "orderList" && "bg-[#21BEB5] text-white"
              }`}
              onClick={() => {
                setActive("orderList");
                router.query.tab = 2;
                router.push(router);
                // salesorderlist();
              }}
            >
              {" "}
              orderList
            </button>
          </div>
        </div>
      </div>
      <div>{active == "orderList" && <OrderlistTable />}</div>
    </div>
  );
}
