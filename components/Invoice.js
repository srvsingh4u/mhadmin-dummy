import React from "react";
import jsPDF from "jspdf";

export default function Invoice() {
  function generatepdf() {
    var doc = new jsPDF("p", "pt", [1300, 2000]);
    doc.html(document.querySelector("#in-voice"), {
      callback: function (pdf) {
        pdf.save("mypdf.pdf");
      },
    });
  }

  return (
    <div className="invoice-main" id="in-voice">
      <div className="invoice">
        <div className="invoice-header">
          <div className="i-icon">
            <img
              className="i-logo"
              src="https://mhadmin.appiness.cc/logo.svg"
              alt="logo"
            ></img>
          </div>
          <div className="i-no-date">
            <div className="i-number">
              <div className="in-num-text">Invoice Number</div>
              <div className="in-num">123456789 </div>
            </div>
            <div className="i-date">
              <div className="i-date-text">Date</div>
              <div className="i-datee">12-07-2021</div>
            </div>
          </div>
        </div>
        <div className="app-person-detail">
          <div className="app-confirm">
            <h1> Appointment Confirmation Receipt</h1>
          </div>
          <div className="app-border"></div>
          <div className="app-name">Dear MR Vignesh Kumar</div>
          <div className="app-pay">
            {" "}
            Your Payment has been Successfully recived with the following
            appointment details.
          </div>
        </div>

        <div className="payment-detail">
          <div className="pay-header">Payment Details</div>
          <div className="header-border"> </div>
          <div className="pay-detail">
            <div className="pay-box">
              <div className="pay-right"> UHID</div>
              <div className="pay-left">MH005637902</div>
            </div>

            <div className="pay-box">
              <div className="pay-right">Transaction Status </div>
              <div className="pay-left">Success</div>
            </div>

            <div className="pay-box">
              <div className="pay-right"> Receipt Number</div>
              <div className="pay-left">MHS20ADP0000008</div>
            </div>

            <div className="pay-box">
              <div className="pay-right">Amount </div>
              <div className="pay-left">Rs.425.00</div>
            </div>

            <div className="pay-box">
              <div className="pay-right">Transaction ID </div>
              <div className="pay-left">ch_2020121610541186461</div>
            </div>

            <div className="pay-box">
              <div className="pay-right">Transaction Reference </div>
              <div className="pay-left">11841515415</div>
            </div>

            <div className="pay-box">
              <div className="pay-right"> Transaction Date & Time</div>
              <div className="pay-left">
                Wednesday, 16 December 2020 10:54 AM
              </div>
            </div>
          </div>
        </div>
        <div className="payment-detail">
          <div className="pay-header">Appointment Details</div>
          <div className="header-border"> </div>
          <div className="pay-detail">
            <div className="pay-box">
              <div className="pay-right"> Hospital Name</div>
              <div className="pay-left">Manipal Hospitals Vijayawada</div>
            </div>

            <div className="pay-box">
              <div className="pay-right">Patient Name</div>
              <div className="pay-left">MR Harman Singh</div>
            </div>

            <div className="pay-box">
              <div className="pay-right"> Mobile Number</div>
              <div className="pay-left">9786540227</div>
            </div>

            <div className="pay-box">
              <div className="pay-right">Email ID</div>
              <div className="pay-left">harman@mailintor.com</div>
            </div>

            <div className="pay-box">
              <div className="pay-right">Mode of Consultation</div>
              <div className="pay-left">Video</div>
            </div>

            <div className="pay-box">
              <div className="pay-right">Doctor Name</div>
              <div className="pay-left">DR. A.Rajaseaker</div>
            </div>

            <div className="pay-box">
              <div className="pay-right"> Appointment Date & Time</div>
              <div className="pay-left">
                Wednesday, 16 December 2020 10:54 AM
              </div>
            </div>
            <div className="acknowledg-text">
              Thank you for giving us the opportunity to serve you. we value our
              relationship.
            </div>
          </div>
        </div>
        <footer>
          <div className="footer-section">
            <div className="emergeny">
              <div className="e-text"> Emergency Contact Number</div>
              <div className="e-info"> +91 9876543210</div>
            </div>

            <div className="emergeny">
              <div className="e-text"> For More Information</div>
              <div className="e-info">www.manipalhospital.com </div>
            </div>

            <div className="emergeny">
              <div className="e-text"> Whatsapp Contact Number</div>
              <div className="e-info"> +91 9876543210 </div>
            </div>
          </div>

          <div className="footer-logo">
            <img
              className="f-logo"
              src="https://mhadmin.appiness.cc/logo.svg"
              alt="logo"
            ></img>
          </div>
        </footer>
        <div className="pdf">
          <button onClick={generatepdf}>Generate PDF</button>
        </div>
      </div>
    </div>
  );
}
