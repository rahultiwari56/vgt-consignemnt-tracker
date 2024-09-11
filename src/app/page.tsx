// src/page.js
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{display:'flex',flexDirection:'column',margin:"20px"}}>
      <h1>Welcome to the Application</h1>
      <Link href="/receipt-form">Go to Receipt Form</Link>
      <Link href="/receiptsData">Go to saved Receipt</Link>
      <Link href="/updateReceipt">Go to update Receipt</Link>


    </div>
  );
}
