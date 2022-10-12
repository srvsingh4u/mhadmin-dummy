import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
// import Paginationn from "./Paginationn";
import { Dropdown } from "@nextui-org/react";
import Paginationn from "./Paginationn";
import Table from "./Table";
import Loader from "./Loader";

export default function Healthcheckup() {
  const [cookies, setCookie] = useCookies(["token"]);
  const [data, setData] = useState([]);
  const [hospitallist, setHospitallist] = useState([]);
  const [code, setCode] = useState("KMC");
  const [hosname, setHosname] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [hdata, setHdata] = useState();
  const [page, setPage] = useState(1);
  const [totalpage, setTotalpage] = useState();

  // console.log(cookies);

  useEffect(() => {
    async function tabledata() {
      setIsLoading(true);
      const res = await axios.get(
        `https://mhbed.appiness.cc/api/admin/health-checkup/health-package-list/10/1/??search_term=${
          code ? `&hospital=${code}` : " "
        }`,
        {
          headers: { Authorization: cookies.token },
        }
      );
      console.log(res.data.data);
      setData(res.data.data.results);
      setHdata(res.data.data);
      setIsLoading(false);
      setTotalpage(res.data.data.page_ids);
    }
    tabledata();
  }, [code]);

  async function changepage(page) {
    setIsLoading(true);
    const res = await axios.get(
      `https://mhbed.appiness.cc/api/admin/health-checkup/health-package-list/10/${page}/??search_term=${
        code ? `&hospital=${code}` : " "
      }`,
      {
        headers: { Authorization: cookies.token },
      }
    );
    setData(res.data.data.results);
    setHdata(res.data.data);
    setIsLoading(false);
  }

  useEffect(() => {
    async function hospitaldata() {
      const res = await axios.get(
        "https://mhbed.appiness.cc/api/hospital/hospital-list/"
      );
      // console.log(res.data.data);
      setHospitallist(res.data.data);
    }
    hospitaldata();
  }, []);

  //   console.log(data);

  return (
    <div className="healthcheckup">
      <div className="h-header">
        <div className="header-content">
          <div className="header-text"> Health Checkup</div>
          <div className="header-second">
            <div>
              {hospitallist.length && (
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
                      value={hosname}
                      disabled
                      style={{
                        outline: "none",
                        border: "none",
                        width: "200px",
                      }}
                    ></input>
                  </Dropdown.Button>
                  <Dropdown.Menu
                    variant="light"
                    aria-label="Actions"
                    css={{ height: "200px" }}
                  >
                    <Dropdown.Item
                      key={"all locations"}
                      css={{ padding: "10px 7px" }}
                    >
                      <div
                        onClick={() => {
                          setCode("");
                          setHosname("All Location");
                        }}
                      >
                        All Location
                      </div>
                    </Dropdown.Item>
                    {hospitallist.map((e, i) => (
                      <Dropdown.Item key={i} css={{ padding: "10px 7px" }}>
                        <div
                          key={i}
                          onClick={() => {
                            setPage(1);
                            setCode(e.code);

                            setHosname(e.name);
                          }}
                        >
                          {e.name}
                        </div>
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
            <div className="input-icon-search">
              <div className="search-icon">
                <img
                  className="s-icon"
                  src="https://mhadmin.appiness.cc/icons/search.svg"
                  alt="search-icon"
                />
              </div>

              <input type="text" className="test-search" placeholder="search" />
            </div>
            <div>
              <button className="new-pack">Add New Package</button>
            </div>
          </div>
        </div>
      </div>
      <div className="package-list">
        <div className="p-list">
          <h4> Package List</h4>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <div className="package-details">
              {data.length ? (
                <Table data={data} />
              ) : (
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th className="t-image">Image</th>
                        <th className="t-pname">PACKAGE NAME</th>
                        <th className="t-modifi"> MODIFIED ON</th>
                        <th className="t-mod"> MODIFIED BY</th>
                        <th className="t-status">STATUS</th>
                        <th className="t-action">ACTION</th>
                      </tr>
                    </thead>
                  </table>
                  <div className="no-record"> No Records found </div>
                </div>
              )}
              {/* <div className="b-btm"> </div> */}
            </div>
            <Paginationn
              hdata={hdata}
              changepage={changepage}
              isLoading={isLoading}
              totalpage={totalpage}
              url="healthCheckup"
            />
          </div>
        )}
      </div>
      {/* {hdata && (
        <div>
          <Paginationn
            hdata={hdata}
            changepage={changepage}
            isLoading={isLoading}
          />
        </div>
      )} */}
    </div>
  );
}
