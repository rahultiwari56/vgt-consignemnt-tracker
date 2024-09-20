"use client";

import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.css";
import Loader from "@/components/loader/loader";
import ReceiptForm from "../../components/ReceiptForm/ReceiptForm";
import DashboardLook from "@/components/dashboardLook/dashboardLook";
import UpdateReceipt from "../../components/UpdateReceipt/UpdateReceipt";
import ViewReceiptsCom from "../../components/ViewReceipt/ViewReceipt";

const Page = () => {
  const { status } = useSession(); // Track session status
  const [isLoading, setIsLoading] = useState(false);
  const [active, setActive] = useState({
    first: true,
    second: false,
    third: false,
  });
  const router = useRouter(); // Initialize the router

  const handleLogout = async () => {
    try {
      if (confirm("Are you sure you want to logout?")) {
        // Use NextAuth's signOut method
        await signOut({ redirect: false }); // Prevent automatic redirect

        // Redirect to the login page
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout failed: ", error); // Centralized error handling
    }
  };

  if (status === "loading") {
    return (
      <div>
        <Loader />
      </div>
    ); // Optional: show loading state
  }

  if (status === "unauthenticated") {
    router.push("/login"); // Redirect if not authenticated
  }

  return (
    <div>
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Loader />
        </div>
      )}{" "}
      {/* Display loader when navigating */}
      <div className={styles.navWrap}>
        <nav className={styles.navbar}>
          <ul className={styles.navbarList}>
            <li className={styles.navbarItem}>
              <button
                onClick={() =>
                  setActive({ first: true, second: false, third: false })
                }
                className={
                  active.first ? styles.navbarLinkAct : styles.navbarLink
                }
              >
                Create Receipt
              </button>
            </li>
            <li className={styles.navbarItem}>
              <button
                onClick={() =>
                  setActive({ first: false, second: true, third: false })
                }
                className={
                  active.second ? styles.navbarLinkAct : styles.navbarLink
                }
              >
                Update Receipt
              </button>
            </li>
            <li className={styles.navbarItem}>
              <button
                onClick={() =>
                  setActive({ first: false, second: false, third: true })
                }
                className={
                  active.third ? styles.navbarLinkAct : styles.navbarLink
                }
              >
                View Receipt
              </button>
            </li>
          </ul>
        </nav>

        <button onClick={handleLogout} className={styles.logoutBtn}>
          Logout
        </button>
      </div>
      {active.first && <ReceiptForm />}
      {active.second && <UpdateReceipt />}
      {active.third && <ViewReceiptsCom />}
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <DashboardLook />
      </div> */}
    </div>
  );
};

export default Page;
