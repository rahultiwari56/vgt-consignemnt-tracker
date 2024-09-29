import { useState, useEffect } from "react";
import SubmitButton from "@/components/buttons/SubmitButton";
import axios from "axios";
import styles from "./receiptForm.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReceiptForm = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [uniqueDate, setuniqueDate] = useState(new Date());
  const [formData, setFormData] = useState({
    demurrageChargeable: "",
    daysFromToday: "",
    insuranceCompany: "",
    policyNo: "",
    date: startDate,
    amount: "",
    risk: "",
    addressOfDeliveryOffice: "",
    uniqueNumber: "",
    uniqueDate: uniqueDate,
    consignorNameAddress: "",
    consigneeNameAddress: "",
    from: "",
    to: "",
    packages: "",
    description: "",
    weightActual: "",
    weightCharged: "",
    rate: "",
    amountToPayasRs: "",
    amountToPayasP: "",
    totalAmountasRs: "",
    totalAmountasP: "",
    ewayBillNo: "",
    validUpto: "",
    addressOfIssuingOffice: "",
    truckNo: "",
    gstNoConsignor: "",
    gstNoConsignee: "",
    gstPayable: "",
    value: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchUniqueId = async () => {
    try {
      const response = await fetch("/api/uniqueNumber");
      const data = await response.json();
      setFormData((prevData) => ({
        ...prevData,
        uniqueNumber: data.uniqueId,
      }));
    } catch (error) {
      console.error("Error fetching unique ID:", error);
    }
  };
  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }

    fetchUniqueId();
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form submission started");
      const response = await axios.post("/api/receipts", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200 && response.data.success) {
        alert("Form submitted successfully");
        setFormData({
          demurrageChargeable: "",
          daysFromToday: "",
          insuranceCompany: "",
          policyNo: "",
          date: startDate,
          amount: "",
          risk: "",
          addressOfDeliveryOffice: "",
          uniqueNumber: "",
          uniqueDate: uniqueDate,
          consignorNameAddress: "",
          consigneeNameAddress: "",
          from: "",
          to: "",
          packages: "",
          description: "",
          weightActual: "",
          weightCharged: "",
          rate: "",
          amountToPayasRs: "",
          amountToPayasP: "",
          totalAmountasRs: "",
          totalAmountasP: "",
          ewayBillNo: "",
          validUpto: "",
          addressOfIssuingOffice: "",
          truckNo: "",
          gstNoConsignor: "",
          gstNoConsignee: "",
          gstPayable: "",
          value: "",
        });
        fetchUniqueId();
      } else {
        alert("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error.message || error);
      alert("Error submitting form");
    }
  };

  return (
    <>
      <div className={styles.coverDiv}>
        <div className={styles.topDiv}>
          <h1 className={styles.logo}>VGT</h1>
          <div>
            <h1 className={styles.nameContent}>Vishakha Golden Transport</h1>
            <h3 className={styles.addContent}>
              D.No. 8-19-57, Gopal Nagar, Beside Treasury Office Yettu Bridge
              Road, Vizianagaram-535003 (A.P.) <br />
              Cell: 9701523640, 8756314575.:: E-mail:
              visakhagoldentransport@gmail.com{" "}
            </h3>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.rapeFlex}>
            <div className={styles.formDataHandle}>
              <div className={styles.formInnerDataHandler}>
                <div className={styles.formSection1}>
                  <div className={styles.demurrageSection}>
                    <h1 className={styles.overAllFontSize}>
                      SCHEDULE OF DEMURRAGE CHARGES{" "}
                    </h1>
                    <hr className={styles.overAllHr} />
                    <div className={styles.demurrageSec1}>
                      <h1 className={styles.overAllFontSize}>
                        Demurrage chargeable agte
                      </h1>
                      <input
                        name="demurrageChargeable"
                        value={formData.demurrageChargeable}
                        onChange={handleChange}
                        className={styles.overAllInputBox}
                        required
                        type="text"
                        autoComplete="off"
                      />
                    </div>
                    <div className={styles.demurrageSec2}>
                      <h1 className={styles.overAllFontSize}>
                        days from today @Rs
                      </h1>
                      <input
                        name="daysFromToday"
                        value={formData.daysFromToday}
                        onChange={handleChange}
                        className={styles.overAllInputBox}
                        required
                        type="text"
                      />
                    </div>
                    <h1 className={styles.overAllFontSize}>
                      per day per Qtl, on weight charged.{" "}
                    </h1>
                  </div>

                  <div className={styles.noteSection}>
                    <h1 className={styles.overAllFontSizeText}>NOTE </h1>
                    <hr className={styles.overAllHr} />
                    <div
                      className={styles.noteSec1}
                      style={{ display: "flex", margin: "1px" }}
                    >
                      <h1 className={styles.overAllFontSize}>
                        The Consignment covered by this Lorry Receipt shall be
                        stored at the destination under the control of the
                        Transport Operator and shall be delivered to or to the
                        order of the Consignee Bank whose name is men- tioned in
                        the Lorry Receipt. It will under no circum- stances be
                        delivered to anyone without the written authority from
                        the Consignee Bank or its order, en- dorsed on the
                        Consignee copy or on a separate Letter
                      </h1>
                    </div>
                  </div>
                </div>

                <div className={styles.formSection2}>
                  <div className={styles.CONSIGNEESection}>
                    <h1 className={styles.overAllFontSizeText}>
                      CONSIGNEE COPY{" "}
                    </h1>
                    <hr className={styles.overAllHr} />
                    <div className={styles.CONSIGNEESec1}>
                      <h1 className={styles.overAllFontSizeText}>
                        AT/ CARRIERs RISK/OWNERs RISK <br /> (Delete Whichever
                        is inapplicable) INSURANCE
                      </h1>
                    </div>
                  </div>

                  <div className={styles.insuranceSection}>
                    <h1 className={styles.overAllFontSizeText}>INSURANCE </h1>
                    <hr className={styles.overAllHr} />
                    <div className={styles.insuranceSec1}>
                      <div className={styles.demurrageSec1}>
                        <p style={{ fontSize: "12px" }}>
                          The consignor has stated that he has not insured the
                          consignment OR he has insured the consignment Company
                        </p>

                        <input
                          name="insuranceCompany"
                          value={formData.insuranceCompany}
                          onChange={handleChange}
                          className={styles.overAllInputBox}
                          required
                          type="text"
                        />
                      </div>
                      <div className={styles.demurrageSec1}>
                        <div className={styles.overAllFontSize}>
                          <p>Policy No</p>

                          <input
                            name="policyNo"
                            value={formData.policyNo}
                            onChange={handleChange}
                            className={styles.overAllInputBox2}
                            required
                            type="text"
                          />
                        </div>
                        <div className={styles.demurrageSec1}>
                          Date
                          <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            className={styles.overAllInputBox2}
                          />
                          {/* <input
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className={styles.overAllInputBox2}
                            required
                            type="text"
                          /> */}
                        </div>
                      </div>
                      <div className={styles.demurrageSec1}>
                        <div className={styles.overAllFontSize}>
                          <p>Amount</p>
                          <input
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                            className={styles.overAllInputBox2}
                            type="number"
                          />
                        </div>
                        <div className={styles.overAllFontSize}>
                          <p>Risk</p>
                          <input
                            name="risk"
                            value={formData.risk}
                            className={styles.overAllInputBox2}
                            onChange={handleChange}
                            required
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.formSection2}>
                  <div className={styles.cautionSection}>
                    <h1 className={styles.overAllFontSizeText}>CAUTION </h1>
                    <hr className={styles.overAllHr} />
                    <div
                      className={styles.cautionSec1}
                      style={{ margin: "1px" }}
                    >
                      <h1 style={{ fontSize: "12px" }}>
                        The Consignment will not be detained, diverted, to out
                        Commigen Banks Wris- Sen permission, Will be delivered
                        at the destination.
                      </h1>
                    </div>
                  </div>

                  <div className={styles.cautionAddressSection}>
                    <h1 className={styles.overAllFontSize}>
                      Address of delivery office:-
                    </h1>
                    <textarea
                      name="addressOfDeliveryOffice"
                      value={formData.addressOfDeliveryOffice}
                      onChange={handleChange}
                      className={styles.overAllTextBox}
                      required
                    />

                    <h1 className={styles.overAllFontSizeText}>
                      CONSIGNMENT NOTE{" "}
                    </h1>
                    <hr className={styles.overAllHr} />
                    <div className={styles.demurrageSec1}>
                      <div style={{ fontSize: "12px", marginBottom: "10px" }}>
                        <p>No.</p>
                        <input
                          name="uniqueNumber"
                          value={formData.uniqueNumber}
                          onChange={handleChange}
                          className={styles.overAllInputBox2}
                          required
                          type="text"
                          readOnly
                        />
                      </div>
                      <div className={styles.overAllFontSize}>
                        <p>Date</p>
                        <DatePicker
                          name="uniqueDate"
                          selected={uniqueDate}
                          onChange={(date) => setuniqueDate(date)}
                          className={styles.overAllInputBox2}
                        />
                        {/* <input
                          className={styles.overAllInputBox2}
                          value={formData.uniqueDate}
                          onChange={handleChange}
                          required
                          type="text"
                        /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.formSection1}>
                <div className={styles.demurrageSection}>
                  <h1 className={styles.h1Inner}>Consignor Name & Address</h1>
                  <textarea
                    name="consignorNameAddress"
                    value={formData.consignorNameAddress}
                    onChange={handleChange}
                    className={styles.overAllTextBox2}
                    required
                  />
                  <h1 className={styles.h1Inner}>Consignee Name & Address</h1>
                  <textarea
                    name="consigneeNameAddress"
                    value={formData.consigneeNameAddress}
                    onChange={handleChange}
                    className={styles.overAllTextBox2}
                    required
                  />
                </div>
                <div className={styles.demurrageSection}>
                  <div className={styles.demurrageSection}>
                    <h1 className={styles.h1Inner}>From </h1>
                    <textarea
                      name="from"
                      value={formData.from}
                      onChange={handleChange}
                      className={styles.overAllTextBox4}
                      required
                    />
                  </div>
                  <div className={styles.demurrageSection}>
                    <h1 className={styles.h1Inner}>To </h1>
                    <textarea
                      name="to"
                      value={formData.to}
                      onChange={handleChange}
                      className={styles.overAllTextBox4}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th
                      className={styles.noBottomRightBorder}
                      style={{ width: "10px" }}
                    >
                      {" "}
                      Pakages
                    </th>{" "}
                    {/* Field 1 */}
                    <th
                      className={styles.noBottomRightBorder}
                      style={{ width: "50px" }}
                    >
                      Description(said to contain)
                    </th>{" "}
                    {/* Field 2 */}
                    <th colSpan={2}>Weight</th>{" "}
                    {/* Span two columns for Field 3 */}
                    <th
                      className={styles.noBottomRightBorder}
                      style={{ width: "10px" }}
                    >
                      Rate
                    </th>{" "}
                    {/* Field 4 */}
                    <th colSpan={2}>Amount to pay / paid</th>{" "}
                    {/* Span two columns for Field 5 */}
                  </tr>
                  <tr>
                    <th className={styles.noTopRightBorder}></th>{" "}
                    {/* Empty cell below Field 1 */}
                    <th className={styles.noTopRightBorder}></th>{" "}
                    {/* Empty cell below Field 2 */}
                    <th style={{ width: "10px" }}>Actual</th>{" "}
                    {/* Subfield under Field 3 */}
                    <th style={{ width: "10px" }}>Charged</th>{" "}
                    {/* Subfield under Field 3 */}
                    <th className={styles.noTopRightBorder}></th>{" "}
                    {/* Empty cell below Field 4 */}
                    <th style={{ width: "10px" }}>Rs.</th>{" "}
                    {/* Subfield under Field 5 */}
                    <th style={{ width: "5px" }}>P</th>{" "}
                    {/* Subfield under Field 5 */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.noRightBorder} style={{ padding: 0 }}>
                      {" "}
                      <textarea
                        name="packages"
                        value={formData.packages}
                        onChange={handleChange}
                        className={styles.overAllTextBox3}
                        required
                      />
                    </td>
                    <td className={styles.noRightBorder} style={{ padding: 0 }}>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className={styles.overAllTextBox5}
                        required
                      />
                    </td>
                    <td>
                      {" "}
                      <textarea
                        name="weightActual"
                        value={formData.weightActual}
                        onChange={handleChange}
                        className={styles.overAllTextBox3}
                        required
                      />
                    </td>
                    <td>
                      {" "}
                      <textarea
                        name="weightCharged"
                        value={formData.weightCharged}
                        onChange={handleChange}
                        className={styles.overAllTextBox3}
                        required
                      />
                    </td>
                    <td className={styles.noRightBorder}>
                      {" "}
                      <textarea
                        name="rate"
                        value={formData.rate}
                        onChange={handleChange}
                        className={styles.overAllTextBox3}
                        required
                      />
                    </td>
                    <td>
                      {" "}
                      <textarea
                        name="amountToPayasRs"
                        value={formData.amountToPayasRs}
                        onChange={handleChange}
                        className={styles.overAllTextBox3}
                        required
                      />
                    </td>
                    <td>
                      {" "}
                      <textarea
                        name="amountToPayasP"
                        value={formData.amountToPayasP}
                        onChange={handleChange}
                        style={{
                          width: "40px",
                          height: "150px",
                          border: "1px solid #ccc",
                          fontSize: "12px",
                          resize: "none",
                          overflowWrap: "break-word",
                          boxSizing: "border-box",
                        }}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.noRightBorder}></td>
                    <td className={styles.noRightBorder}></td>
                    <td></td>
                    <td></td>
                    <td className={styles.noRightBorder}>TOTAL</td>
                    <td>
                      {" "}
                      <input
                        name="totalAmountasRs"
                        value={formData.totalAmountasRs}
                        onChange={handleChange}
                        style={{ height: "20px", width: "80px" }}
                        required
                        type="text"
                      />
                    </td>
                    <td>
                      {" "}
                      <input
                        name="totalAmountasP"
                        value={formData.totalAmountasP}
                        onChange={handleChange}
                        style={{ height: "20px", width: "35px" }}
                        required
                        type="text"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.panSection}>
              <div className={styles.formSection1}>
                <h1 style={{ fontSize: "20px" }}>PAN NO : xyzqwer</h1>
                <div
                  style={{ fontSize: "15px" }}
                  className={styles.demurrageSec1}
                >
                  E-Way Bill No
                  <input
                    name="ewayBillNo"
                    value={formData.ewayBillNo}
                    className={styles.overAllInputBox2}
                    onChange={handleChange}
                    style={{ height: "20px", width: "100px" }}
                    required
                    type="text"
                  />
                </div>
                <h1
                  style={{ fontSize: "14px" }}
                  className={styles.demurrageSec1}
                >
                  Valid Upto
                  <input
                    name="validUpto"
                    className={styles.overAllInputBox2}
                    value={formData.validUpto}
                    onChange={handleChange}
                    style={{ height: "20px", width: "130px" }}
                    required
                    type="text"
                  />
                </h1>
              </div>
              <div className={styles.insuranceSec1}>
                <div className={styles.cautionSecWrap}>
                  <div className={styles.cautionSection}>
                    <h1 className={styles.overAllFontSizeText}>
                      Address of issuing office or <br /> name and address of
                      agenta{" "}
                    </h1>
                    <hr className={styles.overAllHr} />

                    <textarea
                      name="addressOfIssuingOffice"
                      value={formData.addressOfIssuingOffice}
                      onChange={handleChange}
                      className={styles.overAllTextBox}
                      required
                    />
                  </div>
                  <div className={styles.cautionSection}>
                    <h1 className={styles.overAllFontSizeText}>Truck No. </h1>
                    <hr className={styles.overAllHr} />

                    <textarea
                      name="truckNo"
                      value={formData.truckNo}
                      onChange={handleChange}
                      className={styles.overAllTextBox}
                      required
                    />
                  </div>
                </div>
                <div className={styles.cautionSecWrap}>
                  <div className={styles.cautionSection}>
                    <h1 className={styles.overAllFontSizeText}>
                      GST No. of Consignor{" "}
                    </h1>
                    <hr className={styles.overAllHr} />

                    <textarea
                      name="gstNoConsignor"
                      value={formData.gstNoConsignor}
                      onChange={handleChange}
                      className={styles.overAllTextBox}
                      required
                    />
                  </div>
                  <div className={styles.cautionSection}>
                    <h1 className={styles.overAllFontSizeText}>
                      GST No. of Consignee{" "}
                    </h1>
                    <hr className={styles.overAllHr} />

                    <textarea
                      name="gstNoConsignee"
                      value={formData.gstNoConsignee}
                      onChange={handleChange}
                      className={styles.overAllTextBox}
                      required
                    />
                  </div>
                  <div className={styles.cautionSection}>
                    <h1 className={styles.overAllFontSizeText}>
                      GST Payable by Consignor / Consignee{" "}
                    </h1>
                    <hr className={styles.overAllHr} />

                    <textarea
                      name="gstPayable"
                      value={formData.gstPayable}
                      onChange={handleChange}
                      className={styles.overAllTextBox}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "10px",
              justifyContent: "center",
              gap: "30px",
              margin: "30px",
            }}
          >
            <div>
              <h1 style={{ display: "flex" }}>
                Value{" "}
                <input
                  name="value"
                  value={formData.value}
                  onChange={handleChange}
                  className={styles.overAllInputBox2}
                  style={{ height: "20px", width: "100px" }}
                  required
                  type="text"
                />{" "}
              </h1>
            </div>
            <div>
              <h1 style={{ display: "flex" }}>
                Signature of issuing officer ___________________________{" "}
              </h1>
            </div>
          </div>

          <div>
            <SubmitButton />
          </div>
        </form>
      </div>
    </>
  );
};

export default ReceiptForm;
