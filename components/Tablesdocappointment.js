import React from "react";

export default function Tablesdocappointment({ appointmentdata }) {
  return (
    <div className="bg-white pb-4 px-4 rounded-md w-full">
      <div className="pt-3">
        <h1 className="inline-block font-medium justify-self-start md:py-2 pt-6 ">
          DR Appointment List
        </h1>
      </div>
      <div className="shadow overflow-x-scroll">
        <div className="inline-block min-w-full shadow border rounded-lg">
          <table className="min-w-max leading-normal min-w-full">
            <thead>
              <tr>
                <th className="false  py-4 border-b-2 w-36 border-gray-200 text-start text-xs font-semibold text-black uppercase tracking-wider">
                  BOOKING ID
                </th>
                <th className="sticky left-0 bg-white w-36  py-4 border-b-2 border-gray-200 text-left text-xs font-semibold text-black uppercase tracking-wider">
                  DOCTOR NAME
                </th>
                <th className="false px-5 py-4 border-b-2 border-gray-200 text-left text-xs font-semibold text-black uppercase tracking-wider">
                  {" "}
                  DOCTOR CODE
                </th>
                <th className="false px-5 py-4 border-b-2 w-48 border-gray-200 text-left text-xs font-semibold text-black uppercase tracking-wider">
                  {" "}
                  HOSPITAL NAME
                </th>
                <th className="false px-5 py-4 border-b-2 w-72 border-gray-200 text-left text-xs font-semibold text-black uppercase tracking-wider">
                  DEPARTMENT NAME
                </th>
                <th className="false px-5 py-4 border-b-2 border-gray-200 text-left text-xs font-semibold text-black uppercase tracking-wider">
                  PATIENT NAME
                </th>
                <th className="false px-5 py-4 border-b-2 w-8 border-gray-200 text-left text-xs font-semibold text-black uppercase tracking-wider">
                  PATIENT ID
                </th>
                {/* <th className="false px-5 py-4 border-b-2 border-gray-200 text-left text-xs font-semibold text-black uppercase tracking-wider">
                  TYPE OF CONSULTATION
                </th> */}
              </tr>
            </thead>

            <tbody>
              {appointmentdata?.results.map((e, i) => (
                <tr key={i}>
                  <td>{e.ecom_receipt_no}</td>
                  <td>{e.doctor_id.doc_desc}</td>
                  <td>{e.doctor_id.doc_code}</td>
                  <td>{e.hospital_id.name}</td>
                  <td>{e.opdName}</td>
                  <td>{e.user_id.first_name + " " + e.user_id.last_name}</td>
                  <td>{e.user_id.uhid_number}</td>
                  {/* <td>
                    {e.consultation_type == "HV"
                      ? "Hospital Visit"
                      : "Video Consultation"}
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
