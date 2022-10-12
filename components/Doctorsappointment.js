import React from "react";
import DatePicker from "react-multi-date-picker";
import { DateObject } from "react-multi-date-picker";
import Toolbar from "react-multi-date-picker/plugins/toolbar";
import { useState } from "react";
import { Dropdown, Pagination } from "@nextui-org/react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import Tablesdocappointment from "./Tablesdocappointment";
import Loader from "./Loader";
import Paginationn from "./Paginationn";

export default function Doctorsappointment() {
  const [cookies, setCookie] = useCookies(["token"]);
  const [data, setData] = useState();
  const [hoscode, setHoscode] = useState("");
  const [selected, setSelected] = useState("");
  const [searchterm, setSearchterm] = useState("");
  const [appointmentdata, setAppointmentdata] = useState();
  const [dates, setDates] = useState([]);
  const [isloding, setIsloding] = useState(true);
  const [page, setPage] = useState(1);

  //   const [shouldCloseCalendar, setShouldCloseCalendar] = useState(false);

  useEffect(() => {
    async function doctorappointment() {
      const res = await axios.get(
        "https://mhbed.appiness.cc/api/hospital/hospital-list/",
        {
          headers: {
            Authorization: cookies.token,
          },
        }
      );
      //   console.log(res.data.data);
      setData(res.data.data);

      //
    }

    doctorappointment();
  }, []);

  const dateconverter = function (dates) {
    return `${dates.day < 10 ? `0${dates.day}` : dates.day}-${
      dates.month.number < 10 ? `0${dates.month.number}` : dates.month.number
    }-${dates.year}`;
  };

  useEffect(() => {
    async function hospitaldata() {
      setIsloding(true);

      const res = await axios.get(
        `https://mhbed.appiness.cc/api/admin/doctor-appointment/doctor-appointment-list/8/${page}/?${
          hoscode ? `hospital=${hoscode}` : ""
        }${
          dates.length == 2
            ? `&from_date=${dateconverter(dates[0])}&to_date=${dateconverter(
                dates[1]
              )}`
            : ""
        }${searchterm ? `&search_term=${searchterm}` : ""} `,

        {
          headers: {
            Authorization: cookies.token,
          },
        }
      );
      console.log(res);
      setAppointmentdata(res.data);
      setIsloding(false);
    }
    hospitaldata();
  }, [hoscode, searchterm, dates.length == 2, page]);
  //   console.log(dates[0]?.day, dates[1]?.day);

  return (
    <div>
      <div className="flex justify-between px-0 w-full">
        <div className="flex items-center  justify-center">
          <h1 className="inline-block font-medium justify-self-start md:py-2 pt-6 text-mhblue text-lg">
            {" "}
            Doctor Appointment
          </h1>
        </div>
        <div>
          <div className="inline-block mr-6">
            <div className="calander-btn w-[200px] border-gray-300 rounded-md bg-white ">
              <DatePicker
                value={dates}
                range
                placeholder={"From date-To date"}
                style={{ padding: "18px 35px ", fontSize: "10px" }}
                onChange={(date) => {
                  setDates(date);
                }}
                format="DD-MM-YYYY"
                plugins={[
                  <Toolbar
                    key="date-pick-btn"
                    position="bottom"
                    names={{
                      today: "Today",
                      deselect: "Clear",
                      close: "Close",
                    }}
                  />,
                ]}
              />
            </div>
          </div>
          <div className="inline-block mr-6">
            <div className="px-5 py-2 text-xs">
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
                    value={selected}
                  ></input>
                </Dropdown.Button>
                <Dropdown.Menu
                  variant="light"
                  //   aria-label="Actions"
                  css={{ height: "200px" }}
                  selectedKeys={selected}
                  aria-label="Single selection actions"
                  color="secondary"
                  disallowEmptySelection
                  selectionMode="single"
                  //   selectedKeys={selected}
                  onSelectionChange={setSelected}
                >
                  <Dropdown.Item
                    key={"all locations"}
                    css={{ padding: "10px 7px" }}
                  >
                    <div
                      onClick={() => {
                        setSelected("All Location");
                        setHoscode("");
                      }}
                    >
                      All Location
                    </div>
                  </Dropdown.Item>
                  {data?.map((e, i) => (
                    <Dropdown.Item key={i}>
                      <div
                        className="text-gray-700 block  py-2 text-sm"
                        onClick={() => {
                          setSelected(e.name);
                          setHoscode(e.code);
                        }}
                      >
                        {e.name}
                      </div>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className="inline-block mr-6">
            <div className="input-icon-search">
              <div className="search-icon">
                <img
                  className="s-icon"
                  src="https://mhadmin.appiness.cc/icons/search.svg"
                  alt="search-icon"
                />
              </div>

              <input
                onChange={(e) => setSearchterm(e.target.value)}
                type="text"
                className="test-search"
                placeholder="search"
                value={searchterm}
              />
            </div>
          </div>
        </div>
      </div>
      {isloding ? (
        <Loader />
      ) : (
        <>
          <Tablesdocappointment appointmentdata={appointmentdata} />
          <Paginationn hdata={appointmentdata} changepage={setPage} />
        </>
      )}
    </div>
  );
}
