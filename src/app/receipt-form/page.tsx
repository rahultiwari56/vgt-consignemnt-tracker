"use client";
import { useState,useEffect } from 'react';
import SubmitButton from '@/components/buttons/submitbutton'

import axios from 'axios';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    demurrageChargeable: '',
    daysFromToday: '',
    insuranceCompany: '',
    policyNo: '',
    date: '',
    amount: '',
    risk: '',
    addressOfDeliveryOffice: '',
    uniqueNumber:'',
    uniqueDate:'',
    consignorNameAddress: '',
    consigneeNameAddress: '',
    from: '',
    to: '',
    packages: '',
    description: '',
    weightActual: '',
    weightCharged: '',
    rate: '',
    amountToPayasRs: '',
    amountToPayasP:'',
    totalAmountasRs:'',
    totalAmountasP:'',
    ewayBillNo: '',
    validUpto: '',
    addressOfIssuingOffice: '',
    truckNo: '',
    gstNoConsignor: '',
    gstNoConsignee: '',
    gstPayable: '',
    value: '',
  });

  // value={formData.insuranceCompany}
  //         onChange={handleChange}
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
     const savedData = localStorage.getItem('formData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    const fetchUniqueId = async () => {
      try {
        const response = await fetch("/api/uniqueNumber");
        const data = await response.json();
        setFormData({...data,uniqueNumber:data.uniqueId}); 
      } catch (error) {
        console.error("Error fetching unique ID:", error);
      } 
    };
    fetchUniqueId();
  }, []);

  useEffect(() => {
    // Save form data to localStorage on every change
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("Form submission started");
  
      const response = await axios.post('/api/receipts', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.status === 200 && response.data.success) {
        alert('Form submitted successfully');
      } else {
        alert('Form submission failed');
      }
    } catch (error: any) {
      console.error('Error submitting form:', error.message || error);
      alert('Error submitting form');
    }
  };
  
  return (
    <>
      <div className='cover-div'>
        <div className='top-div'>
          <h1 className='logo'>VGT</h1>
          <div >
            <h1 className='name-content' >Vishakha Golden Transport</h1>
            <h3 className='add-content' >D.No. 8-19-57, Gopal Nagar, Beside Treasury Office Yettu Bridge Road, Vizianagaram-535003 (A.P.) <br />
              Cell: 9701523640, 8756314575.:: E-mail: visakhagoldentransport@gmail.com </h3>

          </div>
        </div>
        <form onSubmit={handleSubmit}>
        <div className='rape-flex'>
        <div className='formDataHandle'>
        <div className='formInnerDataHandler'>
          <div className='form-section1' >
            <div className='demurrage-section' >
              <h1 className='overAllFontSize'>SCHEDULE OF DEMURRAGE CHARGES  </h1>
              <hr className='overAllHr' />
              <div className="demurrage-sec1" style={{ display: 'flex', margin: "1px",alignItems:'center' }}>
                <h1 className='overAllFontSize' >Demurrage chargeable agte</h1>
                <input
                name='demurrageChargeable'
                value={formData.demurrageChargeable}
                onChange={handleChange}
                  className='overAllInputBox'
                  required
                  type="text"
                  autoComplete='off'
                />
               
              </div>
              <div className="demurrage-sec2" style={{ display: 'flex', margin: "1px",alignItems:'center' }}>
                <h1 className='overAllFontSize'>days from today @Rs</h1>
                <input
                  name='daysFromToday'
                  value={formData.daysFromToday}
                  onChange={handleChange}
                  className='overAllInputBox'
                  required
                  type="text"
                />
              </div>
              <h1 className='overAllFontSize'>per day per Qtl, on weight charged. </h1>
            </div>


            <div className='note-section' >
              <h1 className='overAllFontSizeText'>NOTE  </h1>
              <hr className='overAllHr' />
              <div className="note-sec1" style={{ display: 'flex', margin: "1px" }}>
                <h1 className='overAllFontSize' >The Consignment covered by this Lorry Receipt shall be stored at the destination under the control of the Transport Operator and shall be delivered to or to the order of the Consignee Bank whose name is men- tioned in the Lorry Receipt. It will under no circum- stances be delivered to anyone without the written authority from the Consignee Bank or its order, en- dorsed on the Consignee copy or on a separate Letter
                </h1>
              </div>
            </div>
          </div>

          <div className='form-section2' style={{ margin: '2px' }}>
            <div className='CONSIGNEE-section' >
              <h1 className='overAllFontSizeText'>CONSIGNEE COPY </h1>
              <hr className='overAllHr' />
              <div className="CONSIGNEE-sec1" style={{ display: 'flex', margin: "1px" }}>
                <h1 className='overAllFontSizeText' >AT/ CARRIERs RISK/OWNERs RISK <br /> (Delete Whichever is inapplicable) INSURANCE</h1>
              </div>
            </div>


            <div className='insurance-section' >
              <h1 className='overAllFontSizeText'>INSURANCE  </h1>
              <hr className='overAllHr' />
              <div className="insurance-sec1" style={{ margin: "1px" }}>
                <h1 className='overAllFontSize' >The consignor has stated that
                  he has not insured the consignment <br /> OR <br />
                  he has insured the consignment <br /> Company
                  <input
                    name='insuranceCompany'
                    value={formData.insuranceCompany}
                    onChange={handleChange}
                    className='overAllInputBox'
                    required
                    type="text"
                  />
                </h1>
                <div style={{ display: 'flex', margin: '2px' }}>
                  <h1 className='overAllFontSize' >Policy No
                    <input
                      name='policyNo'
                      value={formData.policyNo}
                      onChange={handleChange}
                      className='overAllInputBox2'
                      required
                      type="text"
                    />
                  </h1>
                  <h1 className='overAllFontSize' >Date
                    <input
                      name='date'
                      value={formData.date}
                      onChange={handleChange}
                       className='overAllInputBox2'
                      style={{ height: '1.5em', width: '80px' }}
                      required
                      type="text"
                    />
                  </h1>
                </div>
                <div style={{ display: 'flex', margin: '2px' }}>
                  <h1 className='overAllFontSize' >Amount
                    <input
                      name='amount'
                      value={formData.amount}
                      onChange={handleChange}
                      style={{ height: '1.5em', width: '90px' }}
                      required
                       className='overAllInputBox2'
                      type="text"
                    />
                  </h1>
                  <h1 className='overAllFontSize' >Risk
                    <input
                      name='risk'
                      value={formData.risk}
                       className='overAllInputBox2'
                      onChange={handleChange}
                      style={{ height: '1.5em', width: '80px' }}
                      required
                      type="text"
                    />
                  </h1>
                </div>
              </div>
            </div>
          </div>


          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className='caution-section' >
              <h1 className='overAllFontSizeText'>CAUTION  </h1>
              <hr className='overAllHr' />
              <div className="caution-sec1" style={{ margin: "1px" }}>
                <h1 style={{ fontSize: '12px', marginBottom: '50px' }} >The Consignment will not be detained, diverted, to out Commigen Banks Wris- Sen permission, Will be delivered at the destination.
                </h1>
              </div>
            </div>


            <div className='caution-address-section' >
              <h1 className='overAllFontSize' >Address of delivery office:-
              </h1>
              <textarea
                name='addressOfDeliveryOffice'
                value={formData.addressOfDeliveryOffice}
                onChange={handleChange}
                className='overAllTextBox'
                required
              />

              <h1 className='overAllFontSizeText'>CONSIGNMENT NOTE  </h1>
              <hr className='overAllHr' />
              <div className="caution-sec1" style={{ margin: "1px" }}>
                <h1 style={{ fontSize: '12px', marginBottom: '10px' }} >No.
                  <input
                    name='uniqueNumber'
                    value={formData.uniqueNumber}
                    onChange={handleChange}
                    className='overAllInputBox2'
                    style={{ height: '1.5em', width: '90px' }}
                    required
                    type="text"
                    readOnly
                  />
                </h1>
                <h1 className='overAllFontSize' >Date.
                  <input
                    name='uniqueDate'
                    className='overAllInputBox2'
                    value={formData.uniqueDate}
                    onChange={handleChange}
                    style={{ height: '1.5em', width: '90px' }}
                    required
                    type="text"
                  />
                </h1>
              </div>

            </div>
          </div>
                </div>
<div style={{paddingLeft:"80px",textAlign:'left' ,display:"flex"}}>
  <div>
  <h1 className='h1Inner'>Consignor Name & Address

    </h1>
  <textarea
    name='consignorNameAddress'
    value={formData.consignorNameAddress}
    onChange={handleChange}
                className='overAllTextBox2'
                required
              />
               <h1 className='h1Inner'>Consignee Name & Address

</h1>
<textarea
  name='consigneeNameAddress'
  value={formData.consigneeNameAddress}
  onChange={handleChange}
            className='overAllTextBox2'
            required
          />
          </div>
          <div style={{display:'flex',flexDirection:'column',marginLeft:'20px'}}>
          <div >
            <h1 className='h1Inner'>From </h1>
            <textarea
              name='from'
              value={formData.from}
              onChange={handleChange}
            className='overAllTextBox4'
            required
          />
          </div>
          <div>
            <h1 className='h1Inner'>To </h1>
            <textarea
              name='to'
              value={formData.to}
              onChange={handleChange}
            className='overAllTextBox4'
            required
          />
          </div>
          </div>
</div>

<div className="table-container">
      <table>
        <thead>
          <tr>
            <th className="no-bottom-right-border" style={{width:'10px'}}> Pakages</th> {/* Field 1 */}
            <th className="no-bottom-right-border" style={{width:'50px'}}>Description(said to contain)</th> {/* Field 2 */}
            <th colSpan={2}>Weight</th> {/* Span two columns for Field 3 */}
            <th className="no-bottom-right-border" style={{width:'10px'}}>Rate</th> {/* Field 4 */}
            <th colSpan={2}>Amount to pay / paid</th> {/* Span two columns for Field 5 */}
          </tr>
          <tr>
            <th className="no-top-right-border"></th> {/* Empty cell below Field 1 */}
            <th className="no-top-right-border"></th> {/* Empty cell below Field 2 */}
            <th style={{width:'10px'}}>Actual</th> {/* Subfield under Field 3 */}
            <th style={{width:'10px'}}>Charged</th> {/* Subfield under Field 3 */}
            <th className="no-top-right-border"></th> {/* Empty cell below Field 4 */}
            <th style={{width:'10px'}}>Rs.</th> {/* Subfield under Field 5 */}
            <th style={{width:'5px'}}>P</th> {/* Subfield under Field 5 */}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="no-right-border" style={{padding:0}}> <textarea
              name='packages'
              value={formData.packages}
              onChange={handleChange}
            className='overAllTextBox3'
            required
          /></td>
            <td className="no-right-border" style={{padding:0}}><textarea
              name='description'
              value={formData.description}
              onChange={handleChange}
          className='overAllTextBox5'
            required
          /></td>
            <td> <textarea
              name='weightActual'
              value={formData.weightActual}
              onChange={handleChange}
            className='overAllTextBox3'
            required
          /></td>
            <td> <textarea
              name='weightCharged'
              value={formData.weightCharged}
              onChange={handleChange}
            className='overAllTextBox3'
            required
          /></td>
            <td className="no-right-border"> <textarea
              name='rate'
              value={formData.rate}
              onChange={handleChange}
            className='overAllTextBox3'
            required
          /></td>
            <td> <textarea
              name='amountToPayasRs'
              value={formData.amountToPayasRs}
              onChange={handleChange}
            className='overAllTextBox3'
            required
            /></td>
            <td> <textarea
            name='amountToPayasP'
            value={formData.amountToPayasP}
            onChange={handleChange}
            style={{
              width: '40px',
              height: '150px',
              border: '1px solid #ccc',
              fontSize: '12px',
              resize: 'none',
              overflowWrap: 'break-word',
              boxSizing: 'border-box',
            }}
            required
          /></td>
          </tr>
          <tr>
            <td className="no-right-border"></td>
            <td className="no-right-border"></td>
            <td></td>
            <td></td>
            <td className="no-right-border">TOTAL</td>
            <td>   <input
              name='totalAmountasRs'
              value={formData.totalAmountasRs}
              onChange={handleChange}
                      style={{ height: '20px', width: '80px' }}
                      required
                      type="text"
                      /></td>
            <td>   <input
              name='totalAmountasP'
              value={formData.totalAmountasP}
              onChange={handleChange}
                      style={{ height: '20px', width: '35px' }}
                      required
                      type="text"
                      /></td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
    
           <div className='pan-section'>
            <div>
              <h1 style={{ fontSize: '20px' }}>PAN NO : xyzqwer</h1>
              <h1 style={{ fontSize: '20px' }}>E-Way Bill No
                <input
                  name='ewayBillNo'
                  value={formData.ewayBillNo}
                  className='overAllInputBox2'
                  onChange={handleChange}
                  style={{ height: '20px', width: '100px' }}
                  required
                  type="text"
                />
              </h1>
              <h1 style={{ fontSize: '20px' }}>Valid Upto
              <input
                name='validUpto'
                className='overAllInputBox2'
                value={formData.validUpto}
                onChange={handleChange}
                  style={{ height: '20px', width: '130px' }}
                  required
                  type="text"
                />
              </h1>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className='caution-section' >
              <h1 className='overAllFontSizeText'>Address of issuing office or <br /> name and address of agenta  </h1>
              <hr className='overAllHr' />
              
              <textarea
                name='addressOfIssuingOffice'
                value={formData.addressOfIssuingOffice}
                onChange={handleChange}
                className='overAllTextBox'
                required
              />
            </div>
            <div className='caution-section' >
              <h1 className='overAllFontSizeText'>Truck No.  </h1>
              <hr className='overAllHr' />
              
              <textarea
                name='truckNo'
                value={formData.truckNo}
                onChange={handleChange}
                className='overAllTextBox'
                required
              />
            </div>
            <div className='caution-section' >
              <h1 className='overAllFontSizeText'>GST No. of Consignor  </h1>
              <hr className='overAllHr' />
              
              <textarea
                name='gstNoConsignor'
                value={formData.gstNoConsignor}
                onChange={handleChange}
                className='overAllTextBox'
                required
              />
            </div>
            <div className='caution-section' >
              <h1 className='overAllFontSizeText'>GST No. of Consignee  </h1>
              <hr className='overAllHr' />
              
              <textarea
                name='gstNoConsignee'
                value={formData.gstNoConsignee}
                onChange={handleChange}
                className='overAllTextBox'
                required
              />
            </div>
            <div className='caution-section' >
              <h1 className='overAllFontSizeText'>GST Payable  by Consignor / Consignee </h1>
              <hr className='overAllHr' />
              
              <textarea
                name='gstPayable'
                value={formData.gstPayable}
                onChange={handleChange}
                className='overAllTextBox'
                required
              />
            </div>

          </div>
          </div> 

          </div>
<div style={{display:'flex',fontSize:"10px",justifyContent:'center',gap:'30px',margin:"30px"}}>
      <div>
        <h1 style={{display:'flex'}}>Value  <input
        name='value'
        value={formData.value}
        onChange={handleChange}
        className='overAllInputBox2'

                  style={{ height: '20px', width: '100px' }}
                  required
                  type="text"
                /> </h1>
      </div>
      <div>
        <h1 style={{display:'flex'}}>Signature of issuing officer ___________________________ </h1>
      </div>
      </div>

<div> 
 <SubmitButton />
</div>
</form>
      </div>
      
    </>
  )
}

export default FormComponent