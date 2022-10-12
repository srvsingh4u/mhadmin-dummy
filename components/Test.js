import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Test() {
  const router = useRouter();
  function openform() {
    router.push("/testinclusion/newform", undefined, { shallow: true });
  }

  return (
    <div>
      <div className="test-bar">
        <div className="test">Test Inclusion</div>
        <div className="serch-and-newform">
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
          <button className="test-button" onClick={openform}>
            Add new Test
          </button>
        </div>
      </div>
    </div>
  );
}
