import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { useCookies } from "react-cookie";
import Test from "./Test";
import Form from "./Form";
import Healthcheckup from "./Healthcheckup";
import Email from "./Email";
import Doctorsappointment from "./Doctorsappointment";
import Salespage from "./Salespage";
import Emaillist from "./Emaillist";
import Emailtemplate from "./Emailtemplate";

export default function Userpage() {
  const router = useRouter();
  // console.log(router);
  const [isOpen, setIsOpen] = useState(false);
  const [cookies, removeCookie] = useCookies(["token"]);
  // console.log(cookies.token);

  const openModal = () => {
    // console.log(isOpen);
    if (isOpen === true) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  function logout() {
    removeCookie("token");
    router.push("/");
  }

  return (
    <>
      {isOpen && (
        <>
          <div className="overlay"></div>
          <div className="modal">
            <div className="modal-content">
              <div className="profile">
                <div>
                  {" "}
                  <img
                    className="icon"
                    src="https://mhadmin.appiness.cc/icons/profile-blue.svg"
                    alt="icon"
                  />
                </div>
                <div className="text">Profile</div>
              </div>
              <div className="profile">
                <div>
                  <img
                    className="icon-key"
                    src="https://mhadmin.appiness.cc/icons/resetPswd-blue.svg"
                    alt="icon"
                  />{" "}
                </div>
                <div className="text">Change password </div>
              </div>
              <div className="profile" onClick={logout}>
                <div>
                  {" "}
                  <img
                    className="icon"
                    src="https://mhadmin.appiness.cc/icons/logout.svg"
                    alt="icon"
                  />{" "}
                </div>
                <div className="text"> Logout</div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="userpage">
        <div className="header">
          <img
            className="header-logo"
            src="https://mhadmin.appiness.cc/logo.svg"
            alt="headerlogo"
          />
          <div className="user-profile">
            <div className="user-name">Saurav</div>

            {/* {localStorage.getItem("name")} */}
            <div className="user-icon" onClick={openModal}>
              S{/* {localStorage.getItem("name")[0]} */}
            </div>
          </div>
        </div>
        <div className="userpage-main-content">
          <div className="userpage-nav-bar">
            <div className="nav-content">
              <Link href="/home">
                <div
                  className={`nav-btn ${router.asPath == "/home" && "active"}`}
                >
                  <div className="nav-icon">
                    <img
                      src="	https://mhadmin.appiness.cc/icons/menu-home.svg"
                      alt="icon"
                    />{" "}
                  </div>
                  <div>Home Page</div>
                </div>
              </Link>
              <Link href="/healthcheckup">
                <div
                  className={`nav-btn ${
                    router.asPath == "/healthcheckup" && "active"
                  }`}
                >
                  <div className="nav-icon">
                    <img
                      src="	https://mhadmin.appiness.cc/icons/menu-activity.svg"
                      alt="icon"
                    />{" "}
                  </div>
                  <div>Health Checkup</div>
                </div>
              </Link>
              <Link href="/salesDetails">
                <div
                  className={`nav-btn ${
                    router.asPath == "/salesDetails" && "active"
                  }`}
                >
                  <div className="nav-icon">
                    <img
                      src="	https://mhadmin.appiness.cc/icons/menu-clipboard.svg"
                      alt="icon"
                    />{" "}
                  </div>
                  <div>Sales Details</div>
                </div>
              </Link>

              <Link href="/doctorappointment">
                <div
                  className={`nav-btn ${
                    router.asPath == "/doctorappointment" && "active"
                  }`}
                >
                  <div className="nav-icon">
                    <img
                      src="https://mhadmin.appiness.cc/icons/menu-cross.svg"
                      alt="icon"
                    />{" "}
                  </div>
                  <div>Doctor Appointment</div>
                </div>
              </Link>
              <Link href="/doctorlist">
                <div
                  className={`nav-btn ${
                    router.asPath == "/doctorlist" && "active"
                  }`}
                >
                  <div className="nav-icon">
                    <img
                      src="https://mhadmin.appiness.cc/icons/menu-contact.svg"
                      alt="icon"
                    />{" "}
                  </div>
                  <div>Doctors List</div>
                </div>
              </Link>
              <Link href="testinclusion">
                <div
                  className={`nav-btn ${
                    router.asPath == "/testinclusion" && "active"
                  } `}
                >
                  <div className="nav-icon">
                    <img
                      src="https://mhadmin.appiness.cc/icons/menu-edit.svg"
                      alt="icon"
                    />{" "}
                  </div>
                  <div>Test Inclusion</div>
                </div>
              </Link>

              <Link href="/email">
                <div
                  className={`nav-btn ${
                    router.asPath == "/email" && "active"
                  } `}
                >
                  <div className="nav-icon">
                    <img
                      src="https://mhadmin.appiness.cc/icons/menu-mail.svg"
                      alt="icon"
                    />{" "}
                  </div>
                  <div>Email Template</div>
                </div>
              </Link>

              {/* <div>Health Checkup</div>
            <div>Sales Details</div>
            <div>Doctor Appointment</div>
            <div>Doctors List</div>
            <div>Test Inclusion</div>
            <div>Email Template</div> */}
            </div>
          </div>
          <div className="userpage-nav-detail">
            {router.asPath == "/testinclusion" && <Test />}
            {router.asPath == "/testinclusion/newform" && <Form />}

            {router.asPath == "/healthcheckup" && <Healthcheckup />}
            {router.asPath == "/doctorappointment" && <Doctorsappointment />}
            {(router.asPath == "/email?tab=0" ||
              router.asPath == "/email?tab=1" ||
              router.asPath == "/email") && <Email />}
            {router.pathname.includes("/email/emaillist") && <Emaillist />}
            {router.pathname.includes("/email/emailtemplate") && (
              <Emailtemplate />
            )}
            {router.asPath.includes("salesDetails") && <Salespage />}
          </div>
        </div>
      </div>
    </>
  );
}
