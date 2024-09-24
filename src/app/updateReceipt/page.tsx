"use client"
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Loader from '@/components/loader/loader';

const ViewReceipts = () => {
    const [receipts, setReceipts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [updatedReceipt, setUpdatedReceipt] = useState<any>({});
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
  
    const fetchReceipts = async () => {
      try {
        const res = await fetch('/api/receipts', { method: 'GET' });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setReceipts(data.success ? data.data : []);
        setSearchResults(data.success ? data.data : []); // Initialize searchResults with fetched data
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchReceipts();
    }, []);
  
    const handleEdit = (receipt: any) => {
      setIsEditing(receipt._id);
      setUpdatedReceipt(receipt);
    };
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setUpdatedReceipt((prevState: any) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleUpdate = async (id: string) => {
      try {
        const res = await fetch('/api/receipts', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedReceipt),
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        if (data.success) {
          // Update the specific receipt in the receipts array
          const updatedReceipts = receipts.map((receipt) =>
            receipt._id === id ? { ...receipt, ...updatedReceipt } : receipt
          );
          setReceipts(updatedReceipts);
          setIsEditing(null);
  
          // Update search results if there is a search term
          if (searchTerm.trim()) {
            const filteredReceipts = updatedReceipts.filter((receipt) =>
              receipt?._id && receipt._id.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(filteredReceipts);
          } else {
            setSearchResults(updatedReceipts);
          }
        }
      } catch (error) {
        setError('Error updating data');
        console.error('Error updating data:', error);
      }
    };
  
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    };
  
    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      if (receipts) {
        if (searchTerm.trim() === '') {
          setSearchResults(receipts); // Reset search results to all receipts if search term is empty
        } else {
          const filteredReceipts = receipts.filter((receipt) =>
            receipt?._id && receipt._id.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setSearchResults(filteredReceipts);
        }
      } else {
        console.error("Receipts is null or undefined");
      }
    };
  
    if (loading) return <p><Loader/></p>;
  
    if (error) return <p>{error}</p>;
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
           <div key={receipt._id} className='receipt-form'> {/* Key prop added here */}
           <h3 className='receipt-id'>Receipt id: {receipt._id}</h3>
           <div className='top-div'>
               <h1 className='logo'>VGT</h1>
               <div>
                   <h1 className='name-content'>Vishakha Golden Transport</h1>
                   <h3 className='add-content'>
                       D.No. 8-19-57, Gopal Nagar, Beside Treasury Office Yettu Bridge Road, Vizianagaram-535003 (A.P.) <br />
                       Cell: 9701523640, 8756314575.:: E-mail: visakhagoldentransport@gmail.com
                   </h3>
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
                                               value={isEditing === receipt._id ? updatedReceipt.demurrageChargeable : receipt.demurrageChargeable}
                                               readOnly={isEditing !== receipt._id}
                                               className='overAllInputBox'
                                               required
                                               onChange={handleChange}
                                           />
                                       </div>
                                       <div className="demurrage-sec2" style={{ display: 'flex', margin: "1px" }}>
                                           <h1 className='overAllFontSize'>days from today @Rs</h1>
                                           <input
                                               name='daysFromToday'
                                               value={isEditing === receipt._id ? updatedReceipt.daysFromToday : receipt.daysFromToday}
                                               readOnly={isEditing !== receipt._id}
                                               className='overAllInputBox'
                                               required
                                               onChange={handleChange}

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
                                                   value={isEditing === receipt._id ? updatedReceipt.insuranceCompany : receipt.insuranceCompany}
                                                   readOnly={isEditing !== receipt._id}
                                                   className='overAllInputBox'
                                                   required
                                                   onChange={handleChange}

                                               />
                                           </h1>
                                           <div style={{ display: 'flex', margin: '2px' }}>
                                               <h1 className='overAllFontSize' >Policy No
                                                   <input
                                                       name='policyNo'
                                                       value={isEditing === receipt._id ? updatedReceipt.policyNo : receipt.policyNo}
                                                       readOnly={isEditing !== receipt._id}
                                                       className='overAllInputBox2'
                                                       required
                                                       onChange={handleChange}
                                                   />
                                               </h1>
                                               <h1 className='overAllFontSize' >Date
                                                   <input
                                                       name='date'
                                                       value={isEditing === receipt._id ? updatedReceipt.date : receipt.date}
                                                       readOnly={isEditing !== receipt._id}
                                                       style={{ height: '15px', width: '80px' }}
                                                       className='overAllInputBox2'
                                                       required
                                                       onChange={handleChange}

                                                   />
                                               </h1>
                                           </div>
                                           <div style={{ display: 'flex', margin: '2px' }}>
                                               <h1 className='overAllFontSize' >Amount
                                                   <input
                                                       name='amount'
                                                       value={isEditing === receipt._id ? updatedReceipt.amount : receipt.amount}
                                                       readOnly={isEditing !== receipt._id}
                                                       style={{ height: '15px', width: '90px' }}
                                                       className='overAllInputBox2'
                                                       required
                                                       onChange={handleChange}

                                                   />
                                               </h1>
                                               <h1 className='overAllFontSize' >Risk
                                                   <input
                                                       name='risk'
                                                       value={isEditing === receipt._id ? updatedReceipt.risk : receipt.risk}
                                                       readOnly={isEditing !== receipt._id}
                                                       style={{ height: '15px', width: '90px' }}
                                                       className='overAllInputBox2'

                                                       required
                                                       onChange={handleChange}

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
                                           value={isEditing === receipt._id ? updatedReceipt.addressOfDeliveryOffice : receipt.addressOfDeliveryOffice}
                                           readOnly={isEditing !== receipt._id}
                                           className='overAllTextBox'
                                           required
                                           onChange={handleChange}
                                       />

                                       <h1 className='overAllFontSizeText'>CONSIGNMENT NOTE  </h1>
                                       <hr className='overAllHr' />
                                       <div className="caution-sec1" style={{ margin: "1px" }}>
                                           <h1 style={{ fontSize: '12px', marginBottom: '10px' }} >No.
                                               <input
                                                   name='uniqueNumber'
                                                   value={isEditing === receipt._id ? updatedReceipt.uniqueNumber : receipt.uniqueNumber}
                                                   readOnly={isEditing !== receipt._id}
                                                   className='overAllInputBox2'

                                                   style={{ height: '15px', width: '90px' }}
                                                   required
                                                   onChange={handleChange}

                                               />
                                           </h1>
                                           <h1 className='overAllFontSize' >Date.
                                               <input
                                                   name='uniqueDate'

                                                   value={isEditing === receipt._id ? updatedReceipt.uniqueDate : receipt.uniqueDate}
                                                   readOnly={isEditing !== receipt._id}
                                                   className='overAllInputBox2'

                                                   style={{ height: '15px', width: '90px' }}
                                                   required
                                                   onChange={handleChange}

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
                                       value={isEditing === receipt._id ? updatedReceipt.consignorNameAddress : receipt.consignorNameAddress}
                                       readOnly={isEditing !== receipt._id}
                                       className='overAllTextBox2'
                                       required
                                       onChange={handleChange}
                                   />
                                   <h1 className='h1Inner'>Consignee Name & Address

                                   </h1>
                                   <textarea
                                       name='consigneeNameAddress'
                                       value={isEditing === receipt._id ? updatedReceipt.consigneeNameAddress : receipt.consigneeNameAddress}
                                       readOnly={isEditing !== receipt._id}
                                       className='overAllTextBox2'
                                       required
                                       onChange={handleChange}
                                   />
                               </div>
                               <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
                                   <div >
                                       <h1 className='h1Inner'>From </h1>
                                       <textarea
                                           name='from'
                                           value={isEditing === receipt._id ? updatedReceipt.from : receipt.from}
                                           readOnly={isEditing !== receipt._id}
                                           className='overAllTextBox4'
                                           required
                                           onChange={handleChange}
                                       />
                                   </div>
                                   <div>
                                       <h1 className='h1Inner'>To </h1>
                                       <textarea
                                           name='to'
                                           value={isEditing === receipt._id ? updatedReceipt.to : receipt.to}
                                           readOnly={isEditing !== receipt._id}
                                           className='overAllTextBox4'
                                           required
                                           onChange={handleChange}
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
                                               value={isEditing === receipt._id ? updatedReceipt.packages : receipt.packages}
                                               readOnly={isEditing !== receipt._id}
                                               className='overAllTextBox3'
                                               required
                                               onChange={handleChange}
                                           /></td>
                                           <td className="no-right-border" style={{ padding: 0 }}><textarea
                                               name='description'
                                               value={isEditing === receipt._id ? updatedReceipt.description : receipt.description}
                                               readOnly={isEditing !== receipt._id}
                                               className='overAllTextBox5'
                                               required
                                               onChange={handleChange}
                                           /></td>
                                           <td> <textarea
                                               name='weightActual'
                                               value={isEditing === receipt._id ? updatedReceipt.weightActual : receipt.weightActual}
                                               readOnly={isEditing !== receipt._id}
                                               className='overAllTextBox3'
                                               required
                                               onChange={handleChange}
                                           /></td>
                                           <td> <textarea
                                               name='weightCharged'
                                               value={isEditing === receipt._id ? updatedReceipt.weightCharged : receipt.weightCharged}
                                               readOnly={isEditing !== receipt._id}
                                               className='overAllTextBox3'
                                               required
                                               onChange={handleChange}
                                           /></td>
                                           <td className="no-right-border"> <textarea
                                               name='rate'
                                               value={isEditing === receipt._id ? updatedReceipt.rate : receipt.rate}
                                               readOnly={isEditing !== receipt._id}
                                               className='overAllTextBox3'
                                               required
                                               onChange={handleChange}
                                           /></td>
                                           <td> <textarea
                                               name='amountToPayasRs'
                                               value={isEditing === receipt._id ? updatedReceipt.amountToPayasRs : receipt.amountToPayasRs}
                                               readOnly={isEditing !== receipt._id}
                                               className='overAllTextBox3'
                                               required
                                               onChange={handleChange}
                                           /></td>
                                           <td> <textarea
                                               name='amountToPayasP'
                                               value={isEditing === receipt._id ? updatedReceipt.valamountToPayasPue : receipt.amountToPayasP}
                                               readOnly={isEditing !== receipt._id}
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
                                               onChange={handleChange}
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
                                               value={isEditing === receipt._id ? updatedReceipt.totalAmountasRs : receipt.totalAmountasRs}
                                               readOnly={isEditing !== receipt._id}
                                               style={{ height: '20px', width: '80px' }}
                                               required
                                               onChange={handleChange}

                                           /></td>
                                           <td>   <input
                                               name='totalAmountasP'
                                               value={isEditing === receipt._id ? updatedReceipt.totalAmountasP : receipt.totalAmountasP}
                                               readOnly={isEditing !== receipt._id}
                                               style={{ height: '20px', width: '35px' }}
                                               required
                                               onChange={handleChange}

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
                                       value={isEditing === receipt._id ? updatedReceipt.ewayBillNo : receipt.ewayBillNo}
                                       readOnly={isEditing !== receipt._id}
                                       className='overAllInputBox2'

                                       style={{ height: '20px', width: '100px' }}
                                       required
                                       onChange={handleChange}

                                   />
                               </h1>
                               <h1 style={{ fontSize: '20px' }}>Valid Upto
                                   <input
                                       name='validUpto'
                                       value={isEditing === receipt._id ? updatedReceipt.validUpto : receipt.validUpto}
                                       readOnly={isEditing !== receipt._id}
                                       className='overAllInputBox2'

                                       style={{ height: '20px', width: '130px' }}
                                       required
                                       onChange={handleChange}

                                   />
                               </h1>
                           </div>
                           <div style={{ display: 'flex', flexDirection: 'column' }}>
                               <div className='caution-section' >
                                   <h1 className='overAllFontSizeText'>Address of issuing office or <br /> name and address of agenta  </h1>
                                   <hr className='overAllHr' />

                                   <textarea
                                       name='addressOfIssuingOffice'
                                       value={isEditing === receipt._id ? updatedReceipt.addressOfIssuingOffice : receipt.addressOfIssuingOffice}
                                       readOnly={isEditing !== receipt._id}
                                       className='overAllTextBox'
                                       required
                                       onChange={handleChange}
                                   />
                               </div>
                               <div className='caution-section' >
                                   <h1 className='overAllFontSizeText'>Truck No.  </h1>
                                   <hr className='overAllHr' />

                                   <textarea
                                       name='truckNo'
                                       value={isEditing === receipt._id ? updatedReceipt.truckNo : receipt.truckNo}
                                       readOnly={isEditing !== receipt._id}
                                       className='overAllTextBox'
                                       required
                                       onChange={handleChange}
                                   />
                               </div>
                               <div className='caution-section' >
                                   <h1 className='overAllFontSizeText'>GST No. of Consignor  </h1>
                                   <hr className='overAllHr' />

                                   <textarea
                                       name='gstNoConsignor'
                                       value={isEditing === receipt._id ? updatedReceipt.gstNoConsignor : receipt.gstNoConsignor}
                                       readOnly={isEditing !== receipt._id}
                                       className='overAllTextBox'
                                       required
                                       onChange={handleChange}
                                   />
                               </div>
                               <div className='caution-section' >
                                   <h1 className='overAllFontSizeText'>GST No. of Consignee  </h1>
                                   <hr className='overAllHr' />

                                   <textarea
                                       name='gstNoConsignee'
                                       value={isEditing === receipt._id ? updatedReceipt.gstNoConsignee : receipt.gstNoConsignee}
                                       readOnly={isEditing !== receipt._id}
                                       className='overAllTextBox'
                                       required
                                       onChange={handleChange}
                                   />
                               </div>
                               <div className='caution-section' >
                                   <h1 className='overAllFontSizeText'>GST Payable  by Consignor / Consignee </h1>
                                   <hr className='overAllHr' />

                                   <textarea
                                       name='gstPayable'
                                       value={isEditing === receipt._id ? updatedReceipt.gstPayable : receipt.gstPayable}
                                       readOnly={isEditing !== receipt._id}
                                       className='overAllTextBox'
                                       required
                                       onChange={handleChange}
                                   />
                               </div>

                           </div>
                       </div>

                   </div>
                   <div style={{ display: 'flex', fontSize: "10px", justifyContent: 'center', gap: '30px', margin: "30px" }}>
                       <div>
                           <h1 style={{ display: 'flex' }}>Value  <input
                               name='value'
                               value={isEditing === receipt._id ? updatedReceipt.value : receipt.value}
                               readOnly={isEditing !== receipt._id}
                               className='overAllInputBox2'

                               style={{ height: '20px', width: '100px' }}
                               required
                               onChange={handleChange}

                           /> </h1>
                       </div>
                       <div>
                           <h1 style={{ display: 'flex' }}>Signature of issuing officer ___________________________ </h1>
                       </div>

                   </div>
                   <div className="flex space-x-4">
                       {isEditing === receipt._id ? (
                           <Button variant="outlined" onClick={() => handleUpdate(receipt._id)}>update</Button>
                       ) : (
                           <Button variant="outlined" onClick={() => handleEdit(receipt)}>Edit</Button>
                       )}
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


