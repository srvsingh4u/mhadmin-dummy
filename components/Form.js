import React from "react";
import { useRouter } from "next/router";

export default function Form() {
  const router = useRouter();

  function moveback() {
    router.push("/testinclusion");
  }

  return (
    <div className="main-form">
      <div className="form-header">
        <div className="form-back">
          <div>
            <img
              className="back-icon"
              src="https://mhadmin.appiness.cc/icons/back-blue.svg"
              alt="back-icon"
              onClick={moveback}
            ></img>
          </div>
          <div className="form-back-text">Add Test Inclusion</div>
        </div>
        <div>
          <button className="btn-discard"> Discard Changes</button>
          <button className="btn-save">Save</button>
        </div>
      </div>
      <div className="form-content">
        <div className="form-data">
          <div className="form-input">
            <label>Test Code *</label>
            <input
              className="f-input"
              type="text"
              placeholder="Enter the test code"
            ></input>
          </div>
          <div className="form-input">
            <label>Test Name *</label>
            <input
              className="f-input"
              type="text"
              placeholder="Enter the test name"
            ></input>
          </div>
          <div className="form-input">
            <label>Category Name *</label>
            <input
              className="f-input"
              type="text"
              placeholder="Enter category"
            ></input>
          </div>
          <div className="form-input">
            <label>Sub Category *</label>
            <input
              className="f-input"
              type="text"
              placeholder="Enter sub category"
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}
