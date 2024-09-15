"use client";

import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import './navbar.css';
import Loader from "@/components/loader/loader";
import DashboardLook from "@/components/dashboardLook/dashboardLook";

const Page = () => {
  const { status } = useSession(); // Track session status
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // Initialize the router

  const handleLogout = async () => {
    try {
      if (confirm("Are you sure you want to logout?")) {
        // Use NextAuth's signOut method
        await signOut({ redirect: false }); // Prevent automatic redirect

        // Redirect to the login page
        router.push('/login');
      }
    } catch (error) {
      console.error("Logout failed: ", error);  // Centralized error handling
    }
  };

  const handleNavigation = (url) => {
    setIsLoading(true);
    setTimeout(() => {
      router.push(url); // Use Next.js router to navigate
    }, 300); // Adjust the delay as needed
  };

  if (status === "loading") {
    return <div><Loader/></div>; // Optional: show loading state
  }

  if (status === "unauthenticated") {
    router.push('/login'); // Redirect if not authenticated
  }

  return (
    <div>
      {isLoading && <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}} ><Loader/></div>} {/* Display loader when navigating */}
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <button onClick={() => handleNavigation('/receipt-form')} className="navbar-link">
              Create Receipt
            </button>
          </li>
          <li className="navbar-item">
            <button onClick={() => handleNavigation('/updateReceipt')} className="navbar-link">
              Update Receipt
            </button>
          </li>
          <li className="navbar-item">
            <button onClick={() => handleNavigation('/receiptsData')} className="navbar-link">
              View Receipt
            </button>
          </li>
          <li style={{ marginLeft: 'auto' }}  className="navbar-item">
            <button onClick={handleLogout} className="navbar-link logout-btn">
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <DashboardLook/>
      </div>
    </div>
  );
};

export default Page;
