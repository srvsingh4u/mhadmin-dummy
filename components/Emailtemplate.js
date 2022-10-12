import Link from "next/link";
import React from "react";
import { DefaultEditor } from "react-simple-wysiwyg";
import { useState } from "react";

export default function Emailtemplate() {
  const [html, setHtml] = useState("my <b>HTML</b>");
  function onChange(e) {
    setHtml(e.target.value);
  }
  return (
    <div>
      <div className="headerSection mb-2">
        <div className="flex justify-between px-0">
          <Link href="/email/?tab=0">
            <a>
              <div className="flex items-center justify-center">
                <div className="inline-block mr-3 fill-current">
                  <img
                    src="https://mhadmin.appiness.cc/icons/back-blue.svg"
                    className=" w-4"
                  ></img>
                </div>
                <h1 className="inline-block font-medium justify-self-start md:py-2 pt-6 text-mhblue text-lg">
                  Edit Email Template
                </h1>
              </div>
            </a>
          </Link>
          <div>
            <Link href="/email/?tab=0">
              <a>
                <button className="text-xs bg-transparent text-mhblue border border-cyan-600 text-white rounded p-3 px-4 mr-4  disabled:opacity-50 disabled:cursor-not-allowed p-4 px-6 font-medium">
                  <div className="flex text-transparent bg-clip-text bg-gradient-to-r from-[#0E46A5] to-[#00B7AC] flex-row justify-center items-center w-full">
                    {" "}
                    Discard Changes
                  </div>
                </button>
              </a>
            </Link>
            <button className="text-xs mhbg text-white rounded p-3 px-4  disabled:opacity-50 disabled:cursor-not-allowed p-4 px-6 font-medium">
              {" "}
              save
            </button>
          </div>
        </div>
      </div>
      <DefaultEditor value={html} onChange={onChange} />
    </div>
  );
}
