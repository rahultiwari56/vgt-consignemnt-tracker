"use client";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Loader from "@/components/loader/loader";

import styles from "../ReceiptForm/receiptForm.module.css";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Submitbutton from "../buttons/submitbutton";

const UpdateReceipt = () => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(null);
  const [updatedReceipt, setUpdatedReceipt] = useState({});
  const [expandedReceipt, setExpandedReceipt] = useState(null); // Track expanded receipts
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [show, setShow] = useState(false);
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

  const fetchReceipts = async () => {
    try {
      const res = await fetch("/api/receipts", { method: "GET" });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      console.log(data, "data");

      setReceipts(data.success ? data.data : []);
      setSearchResults(data.success ? data.data : []); // Initialize searchResults with fetched data
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReceiptById = async (id) => {
    try {
      const res = await fetch(`/api/getReceipt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify that you're sending JSON
        },
        body: JSON.stringify({ id }), // Convert the id to a JSON string
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const receiptData = await res.json();
      console.log(receiptData.receipt);

      // Update the formData with the fetched receipt data
      if (receiptData.success) {
        setFormData(receiptData.receipt);
      }
    } catch (error) {
      setError("Error fetching receipt data");
      console.error("Error fetching receipt data:", error);
    }
  };
  useEffect(() => {
    fetchReceipts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/receipts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      console.log(data, "data after update");

      if (data.success) {
        // setIsEditing(null);
        setShow(false);
        setExpandedReceipt(null);
        alert("Form updated succesfully");
        // setSearchResults(updatedReceipts);
      }
    } catch (error) {
      //   setError("Error updating data");
      console.error("Error updating data:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (receipts) {
      if (searchTerm.trim() === "") {
        setSearchResults(receipts);
      } else {
        const filteredReceipts = receipts.filter((receipt) =>
          receipt?._id?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredReceipts);
      }
    }
  };

  const toggleExpandReceipt = async (id) => {
    if (expandedReceipt !== id) {
      await fetchReceiptById(id); // Fetch receipt data for the clicked item
    }
    setShow(!show);
    setExpandedReceipt(expandedReceipt === id ? null : id); // Toggle expand/collapse
  };

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.coverDiv}>
      <div className={styles.updateDivWrap}>
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          View Receipts
        </h1>
        <form
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
          onSubmit={handleSearchSubmit}
        >
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by receipt ID"
            className={styles.overAllInputBox}
          />
          <button type="submit" className={styles.btn}>
            Search
          </button>
        </form>
      </div>

      {searchResults.length > 0 ? (
        <div className={styles.receiptsList}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Receipt ID</th>
                <th>Consignment Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((receipt) => (
                <tr key={receipt._id}>
                  <td>{receipt._id}</td>
                  <td>{receipt.uniqueNumber}</td>
                  <td>
                    <Button
                      variant="outlined"
                      onClick={() => toggleExpandReceipt(receipt._id)}
                    >
                      {expandedReceipt === receipt._id
                        ? "View Less"
                        : "View More"}
                    </Button>
                  </td>
                  {expandedReceipt === receipt._id && show && (
                    <div key={receipt._id} className={styles.expandedDetails}>
                      <div className={styles.innerPopup}>
                        <div>
                          <p
                            className={styles.close}
                            onClick={() => {
                              setShow(false);
                              setExpandedReceipt(null);
                            }}
                          >
                            close X
                          </p>
                          <h3>Details for Receipt ID: {receipt._id}</h3>
                          <p>
                            Demurrage Chargeable: {receipt.demurrageChargeable}
                          </p>
                          <p>Days From Today: {receipt.daysFromToday}</p>
                        </div>
                        <div className={styles.coverDiv}>
                          <div className={styles.topDiv}>
                            <h1 className={styles.logo}>VGT</h1>
                            <div>
                              <h1 className={styles.nameContent}>
                                Vishakha Golden Transport
                              </h1>
                              <h3 className={styles.addContent}>
                                D.No. 8-19-57, Gopal Nagar, Beside Treasury
                                Office Yettu Bridge Road, Vizianagaram-535003
                                (A.P.) <br />
                                Cell: 9701523640, 8756314575.:: E-mail:
                                visakhagoldentransport@gmail.com{" "}
                              </h3>
                            </div>
                          </div>
                          <form onSubmit={handleUpdate}>
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
                                      <h1
                                        className={styles.overAllFontSizeText}
                                      >
                                        NOTE{" "}
                                      </h1>
                                      <hr className={styles.overAllHr} />
                                      <div
                                        className={styles.noteSec1}
                                        style={{
                                          display: "flex",
                                          margin: "1px",
                                        }}
                                      >
                                        <h1 className={styles.overAllFontSize}>
                                          The Consignment covered by this Lorry
                                          Receipt shall be stored at the
                                          destination under the control of the
                                          Transport Operator and shall be
                                          delivered to or to the order of the
                                          Consignee Bank whose name is men-
                                          tioned in the Lorry Receipt. It will
                                          under no circum- stances be delivered
                                          to anyone without the written
                                          authority from the Consignee Bank or
                                          its order, en- dorsed on the Consignee
                                          copy or on a separate Letter
                                        </h1>
                                      </div>
                                    </div>
                                  </div>

                                  <div className={styles.formSection2}>
                                    <div className={styles.CONSIGNEESection}>
                                      <h1
                                        className={styles.overAllFontSizeText}
                                      >
                                        CONSIGNEE COPY{" "}
                                      </h1>
                                      <hr className={styles.overAllHr} />
                                      <div className={styles.CONSIGNEESec1}>
                                        <h1
                                          className={styles.overAllFontSizeText}
                                        >
                                          AT/ CARRIERs RISK/OWNERs RISK <br />{" "}
                                          (Delete Whichever is inapplicable)
                                          INSURANCE
                                        </h1>
                                      </div>
                                    </div>

                                    <div className={styles.insuranceSection}>
                                      <h1
                                        className={styles.overAllFontSizeText}
                                      >
                                        INSURANCE{" "}
                                      </h1>
                                      <hr className={styles.overAllHr} />
                                      <div className={styles.insuranceSec1}>
                                        <div className={styles.demurrageSec1}>
                                          <p style={{ fontSize: "12px" }}>
                                            The consignor has stated that he has
                                            not insured the consignment OR he
                                            has insured the consignment Company
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
                                          <div
                                            className={styles.overAllFontSize}
                                          >
                                            <p>Policy No</p>

                                            <input
                                              name="policyNo"
                                              value={formData.policyNo}
                                              onChange={handleChange}
                                              className={
                                                styles.overAllInputBox2
                                              }
                                              required
                                              type="text"
                                            />
                                          </div>
                                          <div className={styles.demurrageSec1}>
                                            Date
                                            <DatePicker
                                              selected={startDate}
                                              onChange={(date) =>
                                                setStartDate(date)
                                              }
                                              className={
                                                styles.overAllInputBox2
                                              }
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
                                          <div
                                            className={styles.overAllFontSize}
                                          >
                                            <p>Amount</p>
                                            <input
                                              name="amount"
                                              value={formData.amount}
                                              onChange={handleChange}
                                              required
                                              className={
                                                styles.overAllInputBox2
                                              }
                                              type="number"
                                            />
                                          </div>
                                          <div
                                            className={styles.overAllFontSize}
                                          >
                                            <p>Risk</p>
                                            <input
                                              name="risk"
                                              value={formData.risk}
                                              className={
                                                styles.overAllInputBox2
                                              }
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
                                      <h1
                                        className={styles.overAllFontSizeText}
                                      >
                                        CAUTION{" "}
                                      </h1>
                                      <hr className={styles.overAllHr} />
                                      <div
                                        className={styles.cautionSec1}
                                        style={{ margin: "1px" }}
                                      >
                                        <h1 style={{ fontSize: "12px" }}>
                                          The Consignment will not be detained,
                                          diverted, to out Commigen Banks Wris-
                                          Sen permission, Will be delivered
                                          at the destination.
                                        </h1>
                                      </div>
                                    </div>

                                    <div
                                      className={styles.cautionAddressSection}
                                    >
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

                                      <h1
                                        className={styles.overAllFontSizeText}
                                      >
                                        CONSIGNMENT NOTE{" "}
                                      </h1>
                                      <hr className={styles.overAllHr} />
                                      <div className={styles.demurrageSec1}>
                                        <div
                                          style={{
                                            fontSize: "12px",
                                            marginBottom: "10px",
                                          }}
                                        >
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
                                            onChange={(date) =>
                                              setuniqueDate(date)
                                            }
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
                                    <h1 className={styles.h1Inner}>
                                      Consignor Name & Address
                                    </h1>
                                    <textarea
                                      name="consignorNameAddress"
                                      value={formData.consignorNameAddress}
                                      onChange={handleChange}
                                      className={styles.overAllTextBox2}
                                      required
                                    />
                                    <h1 className={styles.h1Inner}>
                                      Consignee Name & Address
                                    </h1>
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
                                      <th colSpan={2}>
                                        Amount to pay / paid
                                      </th>{" "}
                                      {/* Span two columns for Field 5 */}
                                    </tr>
                                    <tr>
                                      <th
                                        className={styles.noTopRightBorder}
                                      ></th>{" "}
                                      {/* Empty cell below Field 1 */}
                                      <th
                                        className={styles.noTopRightBorder}
                                      ></th>{" "}
                                      {/* Empty cell below Field 2 */}
                                      <th style={{ width: "10px" }}>
                                        Actual
                                      </th>{" "}
                                      {/* Subfield under Field 3 */}
                                      <th style={{ width: "10px" }}>
                                        Charged
                                      </th>{" "}
                                      {/* Subfield under Field 3 */}
                                      <th
                                        className={styles.noTopRightBorder}
                                      ></th>{" "}
                                      {/* Empty cell below Field 4 */}
                                      <th style={{ width: "10px" }}>
                                        Rs.
                                      </th>{" "}
                                      {/* Subfield under Field 5 */}
                                      <th style={{ width: "5px" }}>P</th>{" "}
                                      {/* Subfield under Field 5 */}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td
                                        className={styles.noRightBorder}
                                        style={{ padding: 0 }}
                                      >
                                        {" "}
                                        <textarea
                                          name="packages"
                                          value={formData.packages}
                                          onChange={handleChange}
                                          className={styles.overAllTextBox3}
                                          required
                                        />
                                      </td>
                                      <td
                                        className={styles.noRightBorder}
                                        style={{ padding: 0 }}
                                      >
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
                                      <td className={styles.noRightBorder}>
                                        TOTAL
                                      </td>
                                      <td>
                                        {" "}
                                        <input
                                          name="totalAmountasRs"
                                          value={formData.totalAmountasRs}
                                          onChange={handleChange}
                                          style={{
                                            height: "20px",
                                            width: "80px",
                                          }}
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
                                          style={{
                                            height: "20px",
                                            width: "35px",
                                          }}
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
                                  <h1 style={{ fontSize: "20px" }}>
                                    PAN NO : xyzqwer
                                  </h1>
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
                                      <h1
                                        className={styles.overAllFontSizeText}
                                      >
                                        Address of issuing office or <br /> name
                                        and address of agenta{" "}
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
                                      <h1
                                        className={styles.overAllFontSizeText}
                                      >
                                        Truck No.{" "}
                                      </h1>
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
                                      <h1
                                        className={styles.overAllFontSizeText}
                                      >
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
                                      <h1
                                        className={styles.overAllFontSizeText}
                                      >
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
                                      <h1
                                        className={styles.overAllFontSizeText}
                                      >
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
                                marginBottom: "90px",
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
                                  Signature of issuing officer
                                  ___________________________{" "}
                                </h1>
                                <Submitbutton />
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      {/* Add more receipt details here */}
                    </div>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ marginTop: "10px" }}>No Receipts Found</p>
      )}
    </div>
  );
};

export default UpdateReceipt;
