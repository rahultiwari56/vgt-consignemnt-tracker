"use client"
import React, { useState, useEffect } from 'react';
type Receipt = {
  filter(arg0: (receipt: any) => any): unknown;
  _id: string;
  date: string;
  amount: number;
  demurrageChargeable: string,
  daysFromToday: string,
  insuranceCompany: string,
  policyNo: string,
  risk: string,
  addressOfDeliveryOffice: string,
  uniqueNumber:string,
  uniqueDate:string,
  consignorNameAddress: string,
  consigneeNameAddress: string,
  from: string,
  to: string,
  packages: string,
  description: string,
  weightActual: string,
  weightCharged: string,
  rate: string,
  amountToPayasRs: string,
  amountToPayasP:string,
  totalAmountasRs:string,
  totalAmountasP:string,
  ewayBillNo: string,
  validUpto: string,
  addressOfIssuingOffice: string,
  truckNo: string,
  gstNoConsignor: string,
  gstNoConsignee: string,
  gstPayable: string,
  value: string
  // Add more fields as needed
};

const ViewReceipts = () => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any>([]); // Correct state type for search results is Receipt[]

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const res = await fetch(`/api/receipts`, { method: 'GET' });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json()
        const temp = []
        temp.push(data.data)
        setReceipts(data.success ? temp : []);
      } catch (error) {
        setError("error");
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReceipts();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (receipts) {
      if (searchTerm.trim() === '') {
        setSearchResults([]); 
      } else {
        const filteredReceipts = receipts[0]?.filter((receipt:any) => receipt._id.includes(searchTerm));
        console.log(79,filteredReceipts)
        setSearchResults(filteredReceipts); 
      }
    } else {
      console.error("Receipts is null or undefined");
    }
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='cover-div'>
      <h1 style={{ display: 'flex', justifyContent: 'center' }}>View Receipts</h1>
      <form style={{display:'flex',justifyContent:'center',marginTop:'100px',alignItems:'center'}} onSubmit={handleSearchSubmit}>
        <input
          type='search'
          value={searchTerm}
          onChange={handleSearch}
          placeholder='Search by receipt ID'
          style={{ display: 'flex', justifyContent: 'center' ,height:'50px',width:'200px',borderRadius:'20px',textAlign:'center'}}
        />
        <button type='submit' style={{ marginLeft: 10,height:'20px',width:'60px' }}>
          Search
        </button>
      </form>
      {searchResults.length > 0 ? (
        <div className='receipts-list'>
          {searchResults.map((receipt:any) => (
            <div key={receipt._id} className='receipt-form'>
           <h3 className='receipt-id'>Receipt id :{receipt._id}</h3>
           <div className='top-div'>
             <h1 className='logo'>VGT</h1>
             <div >
               <h1 className='name-content' >Vishakha Golden Transport</h1>
               <h3 className='add-content' >D.No. 8-19-57, Gopal Nagar, Beside Treasury Office Yettu Bridge Road, Vizianagaram-535003 (A.P.) <br />
                 Cell: 9701523640, 8756314575.:: E-mail: visakhagoldentransport@gmail.com </h3>

             </div>
           </div>
           <form >
             <div className='rape-flex'>
               <div className='formDataHandle'>
                 <div className='formInnerDataHandler'>
                   <div className='form-section1' >
                     <div className='demurrage-section' >
                       <h1 className='overAllFontSize'>SCHEDULE OF DEMURRAGE CHARGES  </h1>
                       <hr className='overAllHr' />
                       <div className="demurrage-sec1" style={{ display: 'flex', margin: "1px" }}>
                         <h1 className='overAllFontSize' >Demurrage chargeable agte</h1>
                         <input
                           name='demurrageChargeable'
                           value={receipt.demurrageChargeable}
                           className='overAllInputBox'
                           required
                           readOnly />
                       </div>
                       <div className="demurrage-sec2" style={{ display: 'flex', margin: "1px" }}>
                         <h1 className='overAllFontSize'>days from today @Rs</h1>
                         <input
                           name='daysFromToday'
                           value={receipt.daysFromToday}
                           readOnly className='overAllInputBox'
                           required

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
                         <h1 className='overAllFontSizeText' >AT/CARRIERs RISK/OWNERs RISK <br /> (Delete Whichever is inapplicable) INSURANCE</h1>
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
                             value={receipt.insuranceCompany}
                             readOnly
                             className='overAllInputBox'
                             required

                           />
                         </h1>
                         <div style={{ display: 'flex', margin: '2px' }}>
                           <h1 className='overAllFontSize' >Policy No
                             <input
                               name='policyNo'
                               value={receipt.policyNo}
                               readOnly
                               className='overAllInputBox2'
                               required
                             />
                           </h1>
                           <h1 className='overAllFontSize' >Date
                             <input
                               name='date'
                               value={receipt.date}
                               readOnly
                               className='overAllInputBox2'
                               style={{ height: '1.5em', width: '80px' }}
                               required
                             />
                           </h1>
                         </div>
                         <div style={{ display: 'flex', margin: '2px' }}>
                           <h1 className='overAllFontSize' >Amount
                             <input
                               name='amount'
                               value={receipt.amount}
                               readOnly
                               className='overAllInputBox2'
                               style={{ height: '15px', width: '90px' }}
                               required

                             />
                           </h1>
                           <h1 className='overAllFontSize' >Risk
                             <input
                               name='risk'
                               value={receipt.risk}
                               className='overAllInputBox2'
                               readOnly
                               style={{ height: '15px', width: '90px' }}
                               required

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
                         value={receipt.addressOfDeliveryOffice}
                         readOnly
                         className='overAllTextBox'
                         required
                       />

                       <h1 className='overAllFontSizeText'>CONSIGNMENT NOTE  </h1>
                       <hr className='overAllHr' />
                       <div className="caution-sec1" style={{ margin: "1px" }}>
                         <h1 style={{ fontSize: '12px', marginBottom: '10px' }} >No.
                           <input
                             name='uniqueNumber'
                             value={receipt.uniqueNumber}
                             className='overAllInputBox2'
                             readOnly
                             style={{ height: '15px', width: '90px' }}
                             required

                           />
                         </h1>
                         <h1 className='overAllFontSize' >Date.
                           <input
                             name='uniqueDate'
                             className='overAllInputBox2'
                             value={receipt.uniqueDate}
                             readOnly
                             style={{ height: '15px', width: '90px' }}
                             required

                           />
                         </h1>
                       </div>

                     </div>
                   </div>
                 </div>
                 <div style={{ paddingLeft: "80px", textAlign: 'left', display: "flex" }}>
                   <div>
                     <h1 className='h1Inner'>Consignor Name & Address

                     </h1>
                     <textarea
                       name='consignorNameAddress'
                       value={receipt.consignorNameAddress}
                       readOnly
                       className='overAllTextBox2'
                       required
                     />
                     <h1 className='h1Inner'>Consignee Name & Address

                     </h1>
                     <textarea
                       name='consigneeNameAddress'
                       value={receipt.consigneeNameAddress}
                       readOnly
                       className='overAllTextBox2'
                       required
                     />
                   </div>
                   <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
                     <div >
                       <h1 className='h1Inner'>From </h1>
                       <textarea
                         name='from'
                         value={receipt.from}
                         readOnly
                         className='overAllTextBox4'
                         required
                       />
                     </div>
                     <div>
                       <h1 className='h1Inner'>To </h1>
                       <textarea
                         name='to'
                         value={receipt.to}
                         readOnly
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
                         <th className="no-bottom-right-border" style={{ width: '10px' }}> Pakages</th> {/* Field 1 */}
                         <th className="no-bottom-right-border" style={{ width: '50px' }}>Description(said to contain)</th> {/* Field 2 */}
                         <th colSpan={2}>Weight</th> {/* Span two columns for Field 3 */}
                         <th className="no-bottom-right-border" style={{ width: '10px' }}>Rate</th> {/* Field 4 */}
                         <th colSpan={2}>Amount to pay / paid</th> {/* Span two columns for Field 5 */}
                       </tr>
                       <tr>
                         <th className="no-top-right-border"></th> {/* Empty cell below Field 1 */}
                         <th className="no-top-right-border"></th> {/* Empty cell below Field 2 */}
                         <th style={{ width: '10px' }}>Actual</th> {/* Subfield under Field 3 */}
                         <th style={{ width: '10px' }}>Charged</th> {/* Subfield under Field 3 */}
                         <th className="no-top-right-border"></th> {/* Empty cell below Field 4 */}
                         <th style={{ width: '10px' }}>Rs.</th> {/* Subfield under Field 5 */}
                         <th style={{ width: '5px' }}>P</th> {/* Subfield under Field 5 */}
                       </tr>
                     </thead>
                     <tbody>
                       <tr>
                         <td className="no-right-border" style={{ padding: 0 }}> <textarea
                           name='packages'
                           value={receipt.packages}
                           readOnly
                           className='overAllTextBox3'
                           required
                         /></td>
                         <td className="no-right-border" style={{ padding: 0 }}><textarea
                           name='description'
                           value={receipt.description}
                           readOnly
                           className='overAllTextBox5'
                           required
                         /></td>
                         <td> <textarea
                           name='weightActual'
                           value={receipt.weightActual}
                           readOnly
                           className='overAllTextBox3'
                           required
                         /></td>
                         <td> <textarea
                           name='weightCharged'
                           value={receipt.weightCharged}
                           readOnly
                           className='overAllTextBox3'
                           required
                         /></td>
                         <td className="no-right-border"> <textarea
                           name='rate'
                           value={receipt.rate}
                           readOnly
                           className='overAllTextBox3'
                           required
                         /></td>
                         <td> <textarea
                           name='amountToPayasRs'
                           value={receipt.amountToPayasRs}
                           readOnly
                           className='overAllTextBox3'
                           required
                         /></td>
                         <td> <textarea
                           name='amountToPayasP'
                           value={receipt.amountToPayasP}
                           readOnly
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
                           value={receipt.totalAmountasRs}
                           readOnly
                           style={{ height: '20px', width: '80px' }}
                           required

                         /></td>
                         <td>   <input
                           name='totalAmountasP'
                           value={receipt.totalAmountasP}
                           readOnly
                           style={{ height: '20px', width: '35px' }}
                           required

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
                       value={receipt.ewayBillNo}
                       className='overAllInputBox2'
                       readOnly
                       style={{ height: '20px', width: '100px' }}
                       required

                     />
                   </h1>
                   <h1 style={{ fontSize: '20px' }}>Valid Upto
                     <input
                       name='validUpto'
                       value={receipt.validUpto}
                       className='overAllInputBox2'
                       readOnly
                       style={{ height: '20px', width: '130px' }}
                       required

                     />
                   </h1>
                 </div>
                 <div style={{ display: 'flex', flexDirection: 'column' }}>
                   <div className='caution-section' >
                     <h1 className='overAllFontSizeText'>Address of issuing office or <br /> name and address of agenta  </h1>
                     <hr className='overAllHr' />

                     <textarea
                       name='addressOfIssuingOffice'
                       value={receipt.addressOfIssuingOffice}
                       readOnly
                       className='overAllTextBox'
                       required
                     />
                   </div>
                   <div className='caution-section' >
                     <h1 className='overAllFontSizeText'>Truck No.  </h1>
                     <hr className='overAllHr' />

                     <textarea
                       name='truckNo'
                       value={receipt.truckNo}
                       readOnly
                       className='overAllTextBox'
                       required
                     />
                   </div>
                   <div className='caution-section' >
                     <h1 className='overAllFontSizeText'>GST No. of Consignor  </h1>
                     <hr className='overAllHr' />

                     <textarea
                       name='gstNoConsignor'
                       value={receipt.gstNoConsignor}
                       readOnly
                       className='overAllTextBox'
                       required
                     />
                   </div>
                   <div className='caution-section' >
                     <h1 className='overAllFontSizeText'>GST No. of Consignee  </h1>
                     <hr className='overAllHr' />

                     <textarea
                       name='gstNoConsignee'
                       value={receipt.gstNoConsignee}
                       readOnly
                       className='overAllTextBox'
                       required
                     />
                   </div>
                   <div className='caution-section' >
                     <h1 className='overAllFontSizeText'>GST Payable  by Consignor / Consignee </h1>
                     <hr className='overAllHr' />

                     <textarea
                       name='gstPayable'
                       value={receipt.gstPayable}
                       readOnly
                       className='overAllTextBox'
                       required
                     />
                   </div>

                 </div>
               </div>

             </div>
             <div style={{ display: 'flex', fontSize: "10px", justifyContent: 'center', gap: '30px', margin: "30px" }}>
               <div>
                 <h1 style={{ display: 'flex' }}>Value  <input
                   name='value'
                   value={receipt.value}
                   className='overAllInputBox2'

                   readOnly
                   style={{ height: '20px', width: '100px' }}
                   required

                 /> </h1>
               </div>
               <div>
                 <h1 style={{ display: 'flex' }}>Signature of issuing officer ___________________________ </h1>
               </div>
             </div>


           </form>
         </div>
          ))}
        </div>
      ) : (
        <p style={{marginTop:'10px'}}>Enter Your Receipt Id</p>
      )}
    </div>
  );
};

export default ViewReceipts;