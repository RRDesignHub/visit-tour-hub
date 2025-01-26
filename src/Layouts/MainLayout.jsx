import React from "react";
import { motion } from "motion/react";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Shared/Footer";
import Navbar from "../Components/Shared/Navbar";

export const MainLayout = () => {
  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-chocolate shadow-xl"
      >
        <Navbar></Navbar>
      </motion.header>
      <main className="min-h-[calc(100vh-488px)]">
        <Outlet></Outlet>
      </main>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Footer />
      </motion.div>
    </>
  );
};
