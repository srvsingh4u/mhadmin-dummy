import React from "react";

export default function Table({ data }) {
  return (
    <div>
      <table className="TableRecords min-w-full">
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

        <tbody>
          {data.length &&
            data.map((e, i) => (
              <tr key={i}>
                <td key={i}>
                  {" "}
                  <img
                    className="p-image"
                    src={
                      e.image
                        ? e.image
                        : "https://mhadmin.appiness.cc/icons/healthPackageDefault.png"
                    }
                    alt=""
                  />
                </td>
                <td> {e.package_name}</td>
                <td className="td-date">
                  <p> {e.updated_at.split("T")[0]}</p>
                  <p className="td-time">{e.updated_at.slice(11, 16)}</p>
                </td>
                <td> {e.updated_by ? e.updated_by.first_name : ""}</td>
                <td> {e.is_active ? "Active" : "inactive"}</td>
                <td>
                  <div>
                    <img
                      src="https://mhadmin.appiness.cc/icons/editGreen.svg"
                      alt=""
                    />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
