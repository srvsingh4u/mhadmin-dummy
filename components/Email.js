import React from "react";
import EmailTable from "./EmailTable";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Email() {
  const router = useRouter();
  // console.log(router);
  const [activetab, setActivetab] = useState(router.query.tab || 0);
  // const [resetPage, setResetPage] = useState(1)

  return (
    <div className="email-main">
      <div>
        <h1>Email</h1>
      </div>
      <div className="switch-button">
        <button
          className={`s-button ${
            activetab == 0 ? "active-btn" : "box-shadow"
          } `}
          onClick={() => {
            // setActive("email template");
            router.query.tab = 0;
            setActivetab(0);
            router.push(router);
          }}
        >
          Email Template
        </button>

        <button
          className={`s-button ${
            activetab == 1 ? "active-btn" : "box-shadow"
          }  `}
          onClick={() => {
            console.log("hy");
            // setActive("email list");
            router.query.tab = 1;
            setActivetab(1);
            router.push(router);
          }}
        >
          Email List
        </button>
      </div>
      <EmailTable activetab={activetab} />
    </div>
  );
}
